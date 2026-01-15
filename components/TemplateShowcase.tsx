import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, FileText, Home, PenTool } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    icon: PenTool,
    title: "Freelance Contracts",
    desc: "Scope of work, payment terms, and IP rights for designers & devs.",
    href: "/freelance-contract-template",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Camera,
    title: "Wedding Photography",
    desc: "Model releases, harassment clauses, and meal provisions.",
    href: "/wedding-photography-contract-template",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: FileText,
    title: "Social Media Mgt",
    desc: "Platform independence and content approval workflows.",
    href: "/social-media-management-contract-template",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Home,
    title: "House Cleaning",
    desc: "Service agreements with access, liability, and cancellation terms.",
    href: "/house-cleaning-service-agreement-template",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

export function TemplateShowcase() {
  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Don&apos;t start from scratch.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            BoopSign comes with a library of lawyer-vetted templates. <br className="hidden md:block" />
            Select a document, customize it, and send it for signature in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <Link key={t.title} href={t.href} className="group">
              <div className="h-full p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${t.bg} ${t.color} group-hover:scale-110 transition-transform`}>
                  <t.icon className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.title}</h3>
                <p className="text-sm text-slate-500 hover:text-slate-600 mb-4 flex-grow leading-relaxed">
                  {t.desc}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                  Use Template <ArrowRight className="ml-1 size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-slate-300 text-slate-600 hover:text-blue-600 hover:border-blue-600">
            <Link href="/templates">
              View All Free Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
