
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { mockStocks } from "@/components/StockTable";
import { TrendingUp, TrendingDown } from "lucide-react";

const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const watchlistStocks = mockStocks.filter((stock) => 
    watchlist.includes(stock.symbol)
  );

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Watchlist</h1>
          <p className="text-muted-foreground">
            Track your favorite stocks and set price alerts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistStocks.map((stock) => (
            <Card
              key={stock.symbol}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/stock/${stock.symbol}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                    <span className="text-sm text-muted-foreground">
                      ${stock.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`flex items-center gap-1 ${
                        stock.change >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {watchlistStocks.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              Your watchlist is empty. Add stocks from the market view to track them here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
