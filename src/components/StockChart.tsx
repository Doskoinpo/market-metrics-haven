
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const generateMockData = (days: number) => {
  const data = [];
  let price = 150;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    price += (Math.random() - 0.5) * 5;
    data.push({
      date: date.toLocaleDateString(),
      price: parseFloat(price.toFixed(2)),
    });
  }
  return data;
};

interface StockChartProps {
  symbol: string;
}

export function StockChart({ symbol }: StockChartProps) {
  const [timeframe, setTimeframe] = useState<"1W" | "1M" | "3M" | "1Y">("1M");
  const timeframes = {
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "1Y": 365,
  };

  const data = generateMockData(timeframes[timeframe]);

  return (
    <Card className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{symbol} Stock Price</h3>
        <div className="flex gap-2">
          {(Object.keys(timeframes) as Array<keyof typeof timeframes>).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [`$${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
