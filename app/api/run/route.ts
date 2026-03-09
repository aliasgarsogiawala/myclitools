import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const execAsync = promisify(exec);

const ALLOWED_PACKAGES = ["automove", "storemyapi"];
const TIMEOUT_MS = 20000;

// Commands that are safe to run (no side effects, purely output-generating)
const SAFE_COMMANDS: Record<string, string[]> = {
  automove: ["--help", "-h", "--version", "-V"],
  storemyapi: ["--help", "-h", "--version", "-V", "list"],
};

function isSafeCommand(pkg: string, args: string): boolean {
  const safeArgs = SAFE_COMMANDS[pkg] ?? [];
  const trimmed = args.trim();
  return safeArgs.some((safe) => trimmed === safe || trimmed.startsWith(safe + " "));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { pkg, args = "--help" } = body as { pkg: string; args: string };

  if (!ALLOWED_PACKAGES.includes(pkg)) {
    return NextResponse.json({ error: "Package not allowed" }, { status: 403 });
  }

  if (!isSafeCommand(pkg, args)) {
    return NextResponse.json(
      {
        error: `For security, only these commands are allowed in live mode: ${(SAFE_COMMANDS[pkg] ?? []).join(", ")}`,
      },
      { status: 403 }
    );
  }

  let tmpDir: string | null = null;

  try {
    tmpDir = await mkdtemp(join(tmpdir(), "mclitools-"));

    // Install the package locally in the temp dir
    const installCmd = `npm install ${pkg} --prefer-offline 2>&1`;
    await execAsync(installCmd, {
      cwd: tmpDir,
      timeout: TIMEOUT_MS,
      env: { ...process.env, npm_config_cache: "/tmp/npm-cache-runner" },
    });

    // Run the binary
    const binPath = join(tmpDir, "node_modules", ".bin", pkg);
    const { stdout, stderr } = await execAsync(`"${binPath}" ${args}`, {
      cwd: tmpDir,
      timeout: 5000,
    });

    return NextResponse.json({
      output: (stdout + stderr).trim(),
      success: true,
    });
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message?: string };
    const output = ((error.stdout ?? "") + (error.stderr ?? "")).trim();
    return NextResponse.json({
      output: output || error.message || "Command failed",
      success: false,
    });
  } finally {
    if (tmpDir) {
      await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
