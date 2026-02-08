import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, FileText, Home, PenTool } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    icon: PenTool,
    title: "Freelance Contracts",
    desc: "Scope of work, payment terms, and IP rights for designers & devs.",
    href: "/contracts/independent-contractor-agreement",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Camera,
    title: "Wedding Photography",
    desc: "Model releases, harassment clauses, and meal provisions.",
    href: "/contracts/independent-contractor-agreement/for-wedding-videographer",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: FileText,
    title: "Social Media Mgt",
    desc: "Platform independence and content approval workflows.",
    href: "/contracts/independent-contractor-agreement/for-facebook-ads-manager",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Home,
    title: "House Cleaning",
    desc: "Service agreements with access, liability, and cancellation terms.",
    href: "/contracts/independent-contractor-agreement",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

export function TemplateShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Jumpstart your workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
            Don&apos;t start from scratch.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Boopsign comes with a library of vetted templates. <br className="hidden md:block" />
            Select a document, customize it, and send it for signature in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <Link key={t.title} href={t.href} className="group h-full">
              <div className="h-full p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col relative overflow-hidden">
                {/* Subtle colorful gradient blob background */}
                <div className={`absolute -right-4 -top-4 size-24 rounded-full opacity-10 blur-2xl ${t.bg.replace('bg-', 'bg-')}`} />

                <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${t.bg} ${t.color} group-hover:scale-110 transition-transform duration-300`}>
                  <t.icon className="size-7" />
                </div>

                <h3 className="font-semibold text-lg text-slate-900 mb-3">{t.title}</h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {t.desc}
                </p>

                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  Use Template <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild variant="secondary" size="lg" className="rounded-full px-8 h-12 text-base font-medium border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all">
            <Link href="/contracts">
              View All Free Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
