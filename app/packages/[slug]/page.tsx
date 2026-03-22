import { notFound } from "next/navigation";
import Link from "next/link";
import { packages, getPackage } from "@/lib/packages";
import Playground from "@/components/Playground";
import CopyButton from "@/components/CopyButton";
import InstallTabs from "@/components/InstallTabs";
import LiveRunner from "@/components/LiveRunner";
import DownloadStats from "@/components/DownloadStats";

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} — aliasgarsogiawala`,
    description: pkg.description,
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const latestVer = pkg.versionHistory[0];

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Breadcrumb */}
      <div className="pt-10 pb-6">
        <Link
          href="/packages"
          className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
        >
          &larr; packages
        </Link>
      </div>

      {/* ── HEADER ── */}
      <section className="pb-12 border-b border-gray-200">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1
                className="text-6xl font-bold tracking-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                {pkg.name}
              </h1>
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-mono text-sm text-gray-400">v{pkg.version}</span>
                <span className="font-mono text-xs border border-gray-200 text-gray-500 px-2 py-0.5 text-center">
                  {pkg.category}
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {pkg.longDescription}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2 shrink-0">
            <a
              href={pkg.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs border border-gray-300 px-4 py-2 hover:border-black transition-colors text-center"
            >
              view on npm
            </a>
            {pkg.githubUrl && (
              <a
                href={pkg.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs border border-gray-300 px-4 py-2 hover:border-black transition-colors text-center"
              >
                view on github
              </a>
            )}
            {pkg.githubUrl && (
              <span className="font-mono text-xs border border-black bg-black text-white px-4 py-2 text-center">
                open source
              </span>
            )}
            <Link
              href={`/packages/${pkg.slug}/versions`}
              className="font-mono text-xs border border-gray-300 px-4 py-2 hover:border-black transition-colors text-center"
            >
              version history
            </Link>
            <Link
              href={`/packages/${pkg.slug}/compare`}
              className="font-mono text-xs border border-gray-300 px-4 py-2 hover:border-black transition-colors text-center"
            >
              compare versions
            </Link>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-6">
          {pkg.keywords.map((kw) => (
            <span
              key={kw}
              className="font-mono text-xs bg-gray-100 text-gray-500 px-2 py-1"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* ── INSTALL ── */}
      <section className="py-14 border-b border-gray-200">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          Install
        </h2>
        <InstallTabs pkgName={pkg.name} />
      </section>

      {/* ── SIMULATED PLAYGROUND ── */}
      <section className="py-14 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400">
            Simulated playground
          </h2>
          <span className="font-mono text-xs border border-gray-200 text-gray-400 px-2 py-0.5">
            no install needed
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          Commands are simulated locally. Use the quick buttons or type any command — arrow keys navigate history.
        </p>
        <Playground pkg={pkg} />
      </section>

      {/* ── LIVE RUNNER ── */}
      {pkg.liveRunnable && (
        <section className="py-14 border-b border-gray-200">
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Live runner
            </h2>
            <span className="font-mono text-xs border border-black text-black px-2 py-0.5">
              real execution
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-8">
            Installs <span className="font-mono">{pkg.name}</span> in a sandboxed temp directory on the server and runs your command for real. Read-only commands only.
          </p>
          <LiveRunner pkg={pkg} />
        </section>
      )}

      {/* ── DOWNLOAD STATS ── */}
      <section className="py-14 border-b border-gray-200">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          Download stats
        </h2>
        <DownloadStats pkgName={pkg.name} />
      </section>

      {/* ── USAGE EXAMPLES ── */}
      <section className="py-14 border-b border-gray-200">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          Usage examples
        </h2>
        <div className="divide-y divide-gray-100">
          {pkg.usageExamples.map((ex) => (
            <div
              key={ex.command}
              className="py-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">{ex.label}</p>
                <p className="text-sm text-gray-500">{ex.description}</p>
              </div>
              <div className="shrink-0 flex items-center gap-3 font-mono text-sm bg-gray-50 border border-gray-200 px-4 py-3">
                <span className="text-gray-400">$</span>
                <span>{ex.command}</span>
                <CopyButton text={ex.command} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FLAGS TABLE ── */}
      <section className="py-14 border-b border-gray-200">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          Flags & commands
        </h2>
        <div className="border border-gray-200">
          <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
            <p className="font-mono text-xs text-gray-400 uppercase">Flag</p>
            <p className="font-mono text-xs text-gray-400 uppercase">Default</p>
            <p className="font-mono text-xs text-gray-400 uppercase">Description</p>
          </div>
          {pkg.flags.map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 items-start"
            >
              <div>
                <p className="font-mono text-sm">{f.flag}</p>
                {f.short && (
                  <p className="font-mono text-xs text-gray-400 mt-0.5">{f.short}</p>
                )}
              </div>
              <p className="font-mono text-sm text-gray-500">{f.default}</p>
              <p className="text-sm text-gray-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VERSION SNAPSHOT ── */}
      <section className="py-14 border-b border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400">
            Latest release
          </h2>
          <div className="flex gap-3">
            <Link
              href={`/packages/${pkg.slug}/versions`}
              className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              all versions &rarr;
            </Link>
            <Link
              href={`/packages/${pkg.slug}/compare`}
              className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              compare &rarr;
            </Link>
          </div>
        </div>

        {latestVer && (
          <div className="border border-gray-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold">v{latestVer.version}</span>
                <span className="font-mono text-xs border border-black px-2 py-0.5">latest</span>
              </div>
              <span className="font-mono text-xs text-gray-400">
                {new Date(latestVer.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {latestVer.changes.length > 0 && (
              <div className="mb-5">
                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">
                  What changed
                </p>
                <ul className="space-y-1.5">
                  {latestVer.changes.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="font-mono text-gray-300 shrink-0">+</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {latestVer.dependencies.length > 0 && (
              <div>
                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">
                  Dependencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {latestVer.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="font-mono text-xs border border-gray-200 px-2 py-1 text-gray-600"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── OTHER PACKAGES ── */}
      <section className="py-14">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          Other packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages
            .filter((p) => p.slug !== pkg.slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/packages/${p.slug}`}
                className="group border border-gray-200 p-6 hover:border-black transition-colors block"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold tracking-tight group-hover:underline">
                    {p.name}
                  </h3>
                  <span className="font-mono text-xs text-gray-400">v{p.version}</span>
                </div>
                <p className="text-sm text-gray-500">{p.description}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
