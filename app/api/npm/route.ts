import { NextRequest, NextResponse } from "next/server";

// Proxy npm registry + download stats — avoids CORS in browser
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pkg = searchParams.get("pkg");

  if (!pkg) return NextResponse.json({ error: "pkg param required" }, { status: 400 });

  const [registry, downloads] = await Promise.all([
    fetch(`https://registry.npmjs.org/${pkg}`).then((r) => r.json()),
    fetch(`https://api.npmjs.org/downloads/range/last-month/${pkg}`).then((r) => r.json()),
  ]);

  const versions = Object.keys(registry.versions || {}).map((v) => {
    const ver = registry.versions[v];
    return {
      version: v,
      publishedAt: registry.time?.[v] ?? null,
      description: ver.description ?? null,
      dependencies: Object.keys(ver.dependencies ?? {}),
      devDependencies: Object.keys(ver.devDependencies ?? {}),
      keywords: ver.keywords ?? [],
      bin: ver.bin ?? {},
    };
  });

  return NextResponse.json({
    name: registry.name,
    description: registry["dist-tags"]
      ? registry.versions[registry["dist-tags"].latest]?.description
      : null,
    latest: registry["dist-tags"]?.latest,
    versions,
    downloads: downloads?.downloads ?? [],
    totalDownloads: (downloads?.downloads ?? []).reduce(
      (acc: number, d: { downloads: number }) => acc + d.downloads,
      0
    ),
  });
}
