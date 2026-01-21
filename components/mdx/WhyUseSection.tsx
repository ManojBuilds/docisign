import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "./Icon";

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
    <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {cardItems && cardItems.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {cardItems.map((item, idx) => (
              <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color === 'red' ? 'bg-red-100 text-red-600' :
                      item.color === 'green' ? 'bg-green-100 text-green-600' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                          'bg-blue-100 text-blue-600'
                    }`}>
                    <Icon name={item.icon || "FileText"} className="w-6 h-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}