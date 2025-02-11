
import { StockTable } from "@/components/StockTable";

const Index = () => {
  return (
    <div className="container py-8 animate-fadeIn">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
          <p className="text-muted-foreground">
            Track real-time stock prices and market trends
          </p>
        </div>
        <StockTable />
      </div>
    </div>
  );
};

export default Index;
