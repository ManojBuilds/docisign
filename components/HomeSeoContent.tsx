import Image from "next/image";
import Link from "next/link";

const HomeSeoContent = () => {
  return (
    <section className="border-t border-slate-200 bg-[#faf7f5]">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              A fast, focused e-signature platform built for solo entrepreneurs
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Boopsign helps you send agreements, collect signatures, and close work faster
              without asking clients to create accounts. If you want the simplest way to get
              contracts signed, start with our
              {" "}
              <Link className="text-slate-900 underline underline-offset-4" href="/pricing" prefetch={false}>
                straightforward pricing
              </Link>
              {" "}
              and see why solo pros switch from bloated tools.
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Need documents ready to send? Browse our
              {" "}
              <Link className="text-slate-900 underline underline-offset-4" href="/contracts" prefetch={false}>
                free contract templates
              </Link>
              {" "}
              or create a simple signature image using the
              {" "}
              <Link className="text-slate-900 underline underline-offset-4" href="/online-signature-maker" prefetch={false}>
                online signature maker
              </Link>
              {" "}
              to get started in minutes.
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              If you're comparing platforms, the
              {" "}
              <Link className="text-slate-900 underline underline-offset-4" href="/alternatives/docusign-alternative" prefetch={false}>
                DocuSign alternative
              </Link>
              {" "}
              page breaks down pricing, features, and workflow differences for solo
              entrepreneurs who just want signatures without friction.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image
              src="/logo.png"
              alt="Boopsign logo"
              width={180}
              height={180}
              className="h-auto w-40 sm:w-44"
              priority={false}
            />
            <p className="mt-5 text-center text-sm text-slate-500 leading-relaxed">
              Send, sign, and store contracts with a clean workflow that keeps clients in the
              flow and keeps you paid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSeoContent;
