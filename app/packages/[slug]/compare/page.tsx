import { notFound } from "next/navigation";
import Link from "next/link";
import { packages, getPackage } from "@/lib/packages";
import VersionComparePicker from "@/components/VersionComparePicker";

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
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
        <span className="font-mono text-xs text-gray-400">compare</span>
      </div>

      <section className="pb-12 border-b border-gray-200">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">
          {pkg.name} / version comparison
        </p>
        <h1
          className="text-5xl font-bold tracking-tight mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          Compare versions.
        </h1>
        <p className="text-gray-500 text-base">
          Select any two versions to diff their dependencies, description, and changelog side by side.
        </p>
      </section>

      <VersionComparePicker pkg={pkg} />
    </div>
  );
}
