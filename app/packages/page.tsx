import { packages } from "@/lib/packages";
import PackageSearch from "@/components/PackageSearch";

export default function PackagesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-16 pb-8 border-b border-gray-200">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">All packages</p>
        <h1 className="text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          {packages.length} package{packages.length !== 1 ? "s" : ""} published.
        </h1>
      </section>

      <section className="pb-16">
        <PackageSearch packages={packages} />
      </section>
    </div>
  );
}
