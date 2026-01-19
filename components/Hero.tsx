import { DragAndClickUpload } from "./DragAndClickUpload";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
      {/* Background glow - Modern Gradient mesh effect */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
          Built for Freelancers & Solo Pros
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl mb-6 bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Get Paid Faster — <span className="text-blue-600">No Signer Accounts Required</span>
        </h1>

        <p className="mt-2 text-lg sm:text-2xl text-slate-600 max-w-3xl font-medium leading-relaxed">
          Upload any PDF, add fields, and send a secure link. <span className="text-slate-900 font-semibold underline decoration-blue-500/30">Clients sign instantly from email</span> — no account required.
        </p>

        {/* Upload Box (PRIMARY CTA) */}
        <div className="mt-12 w-full max-w-3xl">
          <div className="relative group/upload">
            {/* Subtle ambient glow - visible by default */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-3xl blur-3xl opacity-50 group-hover/upload:opacity-100 transition-opacity duration-700" />

            {/* Main container with ring depth */}
            <div className="relative bg-white rounded-2xl p-2.5
                          ring-2 ring-white/80
                          ring-offset-2 ring-offset-slate-100/50
                          group-hover/upload:ring-4 group-hover/upload:ring-white/80
                          group-hover/upload:ring-offset-2 group-hover/upload:ring-offset-slate-200/40
                          group-hover/upload:-translate-y-0.5
                          transition-all duration-500 overflow-hidden
                          shadow-sm shadow-slate-100/50">
              <DragAndClickUpload />
            </div>
          </div>

          <p className="mt-6 text-sm font-medium text-slate-400 text-center">
            ⚡ Takes less than 60 seconds
          </p>
        </div>

        {/* Trust bullets */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm font-medium text-slate-500">
          {[
            { text: "Signers never create accounts", icon: "✨" },
            { text: "Works 100% on Mobile", icon: "📱" },
            { text: "Legally Binding & Secure", icon: "⚖️" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-slate-100 w-full max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Trusted by 3,000+ professionals</p>
          {/* <div className="flex justify-center items-center gap-12 grayscale opacity-50 contrast-125">
            <span className="font-bold text-xl tracking-tighter">CONSULTANTS</span>
            <span className="font-bold text-xl tracking-tighter">AGENCIES</span>
            <span className="font-bold text-xl tracking-tighter">WRITERS</span>
            <span className="font-bold text-xl tracking-tighter">DESIGNERS</span>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
