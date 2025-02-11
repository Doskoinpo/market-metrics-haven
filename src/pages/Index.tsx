
import { StockTable } from "@/components/StockTable";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart2, Briefcase } from "lucide-react";

const marketStats = [
  {
    title: "Top Gainer",
    value: "META +2.1%",
    change: "+$5.89",
    icon: TrendingUp,
    color: "text-success",
  },
  {
    title: "Top Loser",
    value: "MSFT -0.5%",
    change: "-$1.69",
    icon: TrendingDown,
    color: "text-danger",
  },
  {
    title: "Trading Volume",
    value: "208.7M",
    change: "+12.3%",
    icon: BarChart2,
    color: "text-primary",
  },
  {
    title: "Market Cap",
    value: "$12.4T",
    change: "+0.8%",
    icon: Briefcase,
    color: "text-primary",
  },
];

const Index = () => {
  return (
    <div className="container py-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
          <p className="text-muted-foreground">
            Track real-time stock prices and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketStats.map((stat) => (
            <Card key={stat.title} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <StockTable />
      </div>
    </div>
  );
};

export default Index;
