import { Icon } from "./Icon";
import { Highlighter } from "../ui/highlighter";

interface CardItem {
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

interface WhyUseSectionProps {
  title: string;
  description: string;
  cardItems?: CardItem[];
}

export default function WhyUseSection({ title, description, cardItems }: WhyUseSectionProps) {
  return (
    <section className="bg-white py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            <Highlighter action="underline" color="#3b82f6" strokeWidth={2} iterations={1} isView>
              {title}
            </Highlighter>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {cardItems && cardItems.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {cardItems.map((item, idx) => (
              <div
                key={idx}
                className="group p-10 rounded-[2rem] bg-slate-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 duration-300 ${item.color === 'red' ? 'bg-red-50 text-red-600' :
                  item.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                    item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                      item.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                        'bg-primary/10 text-primary'
                  }`}>
                  <Icon name={item.icon || "FileText"} className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}