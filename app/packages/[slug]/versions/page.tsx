import { notFound } from "next/navigation";
import Link from "next/link";
import { packages, getPackage } from "@/lib/packages";

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export default async function VersionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="pt-10 pb-6 flex items-center gap-3">
        <Link
          href={`/packages/${pkg.slug}`}
          className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
        >
          &larr; {pkg.name}
        </Link>
        <span className="text-gray-200">/</span>
        <span className="font-mono text-xs text-gray-400">versions</span>
      </div>

      <section className="pb-12 border-b border-gray-200">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">
          {pkg.name} / version history
        </p>
        <h1
          className="text-5xl font-bold tracking-tight mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          {pkg.versionHistory.length} version{pkg.versionHistory.length !== 1 ? "s" : ""} published.
        </h1>
        <div className="flex gap-4 mt-6">
          <Link
            href={`/packages/${pkg.slug}/compare`}
            className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-medium hover:border-black transition-colors"
          >
            Compare versions
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

          <div className="space-y-10">
            {pkg.versionHistory.map((ver, i) => {
              const isLatest = ver.version === pkg.version;
              const date = new Date(ver.publishedAt);
              const formatted = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div key={ver.version} className="flex gap-6 pl-8 relative">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                      isLatest
                        ? "bg-black border-black"
                        : "bg-white border-gray-400"
                    }`}
                  />

                  <div className="flex-1 border border-gray-200 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-bold">v{ver.version}</span>
                        {isLatest && (
                          <span className="font-mono text-xs border border-black px-2 py-0.5">
                            latest
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-gray-400">{formatted}</span>
                    </div>

                    {ver.description && (
                      <p className="text-sm text-gray-500 mb-5">{ver.description}</p>
                    )}

                    {/* Changes */}
                    {ver.changes.length > 0 && (
                      <div className="mb-5">
                        <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">
                          Changes
                        </p>
                        <ul className="space-y-1.5">
                          {ver.changes.map((change, j) => (
                            <li key={j} className="flex gap-2 text-sm text-gray-700">
                              <span className="text-gray-300 shrink-0 font-mono">+</span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Deps */}
                    {ver.dependencies.length > 0 && (
                      <div>
                        <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-3">
                          Dependencies ({ver.dependencies.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {ver.dependencies.map((dep) => (
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

                    {i < pkg.versionHistory.length - 1 && (
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <Link
                          href={`/packages/${pkg.slug}/compare?from=${pkg.versionHistory[i + 1].version}&to=${ver.version}`}
                          className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
                        >
                          Compare with v{pkg.versionHistory[i + 1].version} &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
