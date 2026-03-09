import Link from "next/link";
import { packages } from "@/lib/packages";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-24 pb-20 border-b border-gray-200">
        <p className="font-mono text-sm text-gray-500 mb-6 tracking-wide uppercase">
          npm / aliasgarsogiawala
        </p>
        <h1 className="text-6xl font-bold tracking-tight leading-none mb-6" style={{ letterSpacing: "-0.03em" }}>
          CLI Tools<br />Playground.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
          Install, explore, and try out every CLI package published to npm by aliasgarsogiawala — right here, no setup needed.
        </p>
        <div className="flex gap-4 mt-10">
          <Link
            href="/packages"
            className="inline-flex items-center px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Browse packages
          </Link>
          <a
            href="https://www.npmjs.com/~aliasgarsogiawala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium hover:border-gray-800 transition-colors"
          >
            npm profile
          </a>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-12 border-b border-gray-200 grid grid-cols-3 gap-8">
        <div>
          <p className="text-5xl font-bold tracking-tight">{packages.length}</p>
          <p className="text-sm text-gray-500 mt-2">Published packages</p>
        </div>
        <div>
          <p className="text-5xl font-bold tracking-tight">
            {packages.reduce((acc, p) => acc + p.usageExamples.length, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Usage examples</p>
        </div>
        <div>
          <p className="text-5xl font-bold tracking-tight">0</p>
          <p className="text-sm text-gray-500 mt-2">Config files needed</p>
        </div>
      </section>

      {/* Package cards */}
      <section className="py-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-10">
          All packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="group border border-gray-200 p-8 hover:border-black transition-colors block"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold tracking-tight group-hover:underline">
                  {pkg.name}
                </h3>
                <span className="font-mono text-xs text-gray-400 mt-1">v{pkg.version}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {pkg.description}
              </p>
              <div className="font-mono text-xs bg-gray-50 border border-gray-100 px-4 py-3 text-gray-600">
                $ {pkg.install}
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {pkg.keywords.slice(0, 4).map((kw) => (
                  <span
                    key={kw}
                    className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-gray-200">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-10">
          How to use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Install globally",
              body: "Run the install command from any package page. All tools are global CLI commands.",
            },
            {
              step: "02",
              title: "Run in terminal",
              body: "Call the command name from any directory. No project setup or config file required.",
            },
            {
              step: "03",
              title: "Stop when done",
              body: "Most tools run until you stop them. Ctrl+C exits cleanly every time.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="font-mono text-4xl font-bold text-gray-200 mb-4">{item.step}</p>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
