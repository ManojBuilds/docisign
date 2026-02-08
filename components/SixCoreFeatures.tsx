import {
  Upload,
  MousePointerClick,
  Mail,
  Palette,
  FileText,
  Smartphone,
} from "lucide-react";
import { Highlighter } from "./ui/highlighter";

const SixCoreFeatures = () => {
  const features = [
    {
      icon: <Upload className="size-6 text-blue-500" />,
      title: "Upload PDF or Word",
      description:
        "No weird format restrictions. No 'converting...' delays. Drag your contract into Boopsign and it's ready to edit instantly.",
    },
    {
      icon: <MousePointerClick className="size-6 text-blue-500" />,
      title: "Beautiful, Fast Editor",
      description:
        "Stupidly simple by design. Drag signature boxes, dates, and text fields. Everything is visual. No complicated menus or hidden settings.",
    },
    {
      icon: <Mail className="size-6 text-blue-500" />,
      title: "Secure Email Links",
      description:
        "No client accounts or app downloads. They click the link, sign, and they're done. Bank-level security, fully encrypted and tracked.",
    },
    {
      icon: <Palette className="size-6 text-blue-500" />,
      title: "Custom Branding",
      description:
        "Every email and signing page shows YOUR brand: your business name and logo. No 'Sent via' footers. Just your professional brand.",
    },
    {
      icon: <FileText className="size-6 text-blue-500" />,
      title: "Template Management",
      description:
        "Create standard contracts once as templates. Next time: Select template, add client name, and send. 10-second turnaround.",
    },
    {
      icon: <Smartphone className="size-6 text-blue-500" />,
      title: "Mobile-Optimized",
      description:
        "Built for 2024. Your client can view and sign clearly with their finger on any device. Average completion time: 90 seconds.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="core-features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            The Essentials Only
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Boopsign: Just the{" "}
            <Highlighter action="box" color="#3b82f6">
              6 Features
            </Highlighter>{" "}
            That Matter
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Every page loads in under 2 seconds. Every feature works the first
            time. Every client signs without friction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </span>
              <h3 className="mb-3 text-xl font-semibold text-slate-900 text-balance">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-500 font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-20 max-w-4xl mx-auto text-center bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
          <p className="text-2xl font-bold text-slate-900 mb-4">
            That&apos;s it. That&apos;s the whole product.
          </p>
          <p className="text-lg text-slate-600 font-medium">
            We focused on what actually matters for solo entrepreneurs. No
            distractions, no bloat, no confusion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SixCoreFeatures;
