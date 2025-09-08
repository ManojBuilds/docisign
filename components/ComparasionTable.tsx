import { cn } from "@/lib/utils";
import React from "react";

const ComparasionTable = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "py-16 md:py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white",
        className,
      )}
    >
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mobile Experience: DocuSign vs BoopSign
        </h2>
        <p className="text-xl mb-12 opacity-90">
          See why businesses switch to BoopSign for better mobile signing
        </p>

        <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 px-4 text-white/80">Feature</th>
                  <th className="py-4 px-4 text-center">BoopSign</th>
                  <th className="py-4 px-4 text-center">DocuSign</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white/80">
                    App Download Required
                  </td>
                  <td className="py-4 px-4 text-center">❌ No</td>
                  <td className="py-4 px-4 text-center">✅ Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white/80">
                    Mobile Signing Time
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-green-300">
                    3 minutes
                  </td>
                  <td className="py-4 px-4 text-center text-red-300">
                    7-9 minutes
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white/80">Account Creation</td>
                  <td className="py-4 px-4 text-center">❌ No</td>
                  <td className="py-4 px-4 text-center">✅ Required</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white/80">
                    Mobile-First Design
                  </td>
                  <td className="py-4 px-4 text-center">✅ Yes</td>
                  <td className="py-4 px-4 text-center">❌ Adapted</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white/80">Cost per Month</td>
                  <td className="py-4 px-4 text-center font-semibold text-green-300">
                    $12
                  </td>
                  <td className="py-4 px-4 text-center text-red-300">$25+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
            Start Your 7-Day Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparasionTable;
