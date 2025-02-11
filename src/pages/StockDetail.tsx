
import { useNavigate, useParams } from "react-router-dom";
import { StockChart } from "@/components/StockChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const mockStockDetails = {
  AAPL: {
    name: "Apple Inc.",
    price: 178.72,
    change: 1.2,
    marketCap: "2.8T",
    volume: "98.45M",
    pe: "29.45",
    dividend: "0.65%",
  },
  MSFT: {
    name: "Microsoft Corporation",
    price: 338.11,
    change: -0.5,
    marketCap: "2.5T",
    volume: "22.16M",
    pe: "35.12",
    dividend: "0.82%",
  },
};

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const stock = mockStockDetails[symbol as keyof typeof mockStockDetails];

  if (!stock) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stock not found</h1>
          <Button onClick={() => navigate("/")}>Return to Market Overview</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fadeIn">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Market Overview
      </Button>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{symbol}</h1>
            <span className="text-xl text-muted-foreground">{stock.name}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-4">
            <span className="text-2xl font-semibold">${stock.price}</span>
            <span className={`text-lg ${stock.change >= 0 ? "text-success" : "text-danger"}`}>
              {stock.change >= 0 ? "+" : ""}{stock.change}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-lg font-semibold">{stock.marketCap}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="text-lg font-semibold">{stock.volume}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">P/E Ratio</div>
            <div className="text-lg font-semibold">{stock.pe}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Dividend Yield</div>
            <div className="text-lg font-semibold">{stock.dividend}</div>
          </Card>
        </div>

        <StockChart symbol={symbol} />
      </div>
    </div>
  );
};

export default StockDetail;
