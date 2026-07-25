import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { POLICIES, getPolicy } from "@/lib/policies";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ policy: string }> }): Promise<Metadata> {
  const { policy } = await params;
  const p = getPolicy(policy);
  if (!p) return { title: "Policy" };
  return { title: p.title, description: p.summary, alternates: { canonical: `/policies/${p.slug}` } };
}

export default async function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy: policySlug } = await params;
  const policy = getPolicy(policySlug);
  if (!policy) notFound();

  return (
    <>
      <PageHero title={policy.title} description={policy.summary} breadcrumbs={[{ label: "Policies" }, { label: policy.title }]} />
      <article className="container-px py-12">
        <div className="mb-8 rounded-card border border-amber/40 bg-amber/10 p-4 text-sm text-slate">
          <strong className="text-navy">Draft for review.</strong> This policy is written in Air Refrigerant&apos;s
          voice and contains placeholders marked &ldquo;TODO: confirm.&rdquo; Please have the owner and legal counsel
          review and finalize all business specifics before launch.
        </div>

        <div className="max-w-3xl">
          {policy.sections.map((s) => (
            <section key={s.heading} className="mb-8">
              <h2 className="mb-3 font-heading text-xl font-bold text-navy">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mb-3 leading-relaxed text-slate-soft">{para}</p>
              ))}
            </section>
          ))}
          <p className="mt-10 border-t border-line pt-6 text-sm text-slate-soft">
            Last updated: {/* TODO: set effective date */} pending review. Questions? Email support@airrefrigerant.shop.
          </p>
        </div>
      </article>
    </>
  );
}
