import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Star,
  Bell,
} from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  week52High: number;
  week52Low: number;
}

const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.72,
    change: 1.2,
    volume: 98450000,
    marketCap: 2800000000000,
    pe: 29.45,
    dividend: 0.65,
    week52High: 190.07,
    week52Low: 124.17,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 338.11,
    change: -0.5,
    volume: 22160000,
    marketCap: 2500000000000,
    pe: 35.12,
    dividend: 0.82,
    week52High: 366.78,
    week52Low: 219.35,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 131.86,
    change: 0.8,
    volume: 23950000,
    marketCap: 1800000000000,
    pe: 27.89,
    dividend: 0,
    week52High: 142.38,
    week52Low: 83.34,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 127.12,
    change: -0.3,
    volume: 44230000,
    marketCap: 1300000000000,
    pe: 98.76,
    dividend: 0,
    week52High: 146.57,
    week52Low: 81.43,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 297.89,
    change: 2.1,
    volume: 19870000,
    marketCap: 900000000000,
    pe: 33.45,
    dividend: 0,
    week52High: 318.68,
    week52Low: 88.09,
  },
];

export function StockTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Stock>("symbol");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [alertPrice, setAlertPrice] = useState<string>("");
  const [alertType, setAlertType] = useState<"above" | "below">("above");
  const { 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    isInWatchlist,
    setPriceAlert,
    getPriceAlerts,
  } = useWatchlist();

  const handleSort = (field: keyof Stock) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    return value.toString();
  };

  const filteredAndSortedStocks = mockStocks
    .filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

  const handleWatchlistClick = (e: React.MouseEvent, stock: Stock) => {
    e.stopPropagation();
    if (isInWatchlist(stock.symbol)) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  const handleSetAlert = (stock: Stock) => {
    const price = parseFloat(alertPrice);
    if (!isNaN(price)) {
      setPriceAlert(stock.symbol, price, alertType);
      setSelectedStock(null);
      setAlertPrice("");
    }
  };

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/watchlist")}
          className="whitespace-nowrap"
        >
          View Watchlist ({watchlist.length})
        </Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("symbol")} className="cursor-pointer w-[100px]">
                Symbol <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                Name <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("price")} className="cursor-pointer text-right">
                Price <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("change")} className="cursor-pointer text-right">
                Change <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("marketCap")} className="cursor-pointer text-right hidden md:table-cell">
                Market Cap <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("pe")} className="cursor-pointer text-right hidden lg:table-cell">
                P/E <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("dividend")} className="cursor-pointer text-right hidden lg:table-cell">
                Div Yield <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right hidden xl:table-cell">
                52W Range
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedStocks.map((stock) => (
              <TableRow
                key={stock.symbol}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/stock/${stock.symbol}`)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {stock.symbol}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleWatchlistClick(e, stock)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          isInWatchlist(stock.symbol)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStock(stock);
                          }}
                        >
                          <Bell className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Set Price Alert for {stock.symbol}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-4">
                            <Select
                              value={alertType}
                              onValueChange={(value) => setAlertType(value as "above" | "below")}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="above">Above</SelectItem>
                                <SelectItem value="below">Below</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number"
                              placeholder="Price"
                              value={alertPrice}
                              onChange={(e) => setAlertPrice(e.target.value)}
                            />
                          </div>
                          <Button onClick={() => handleSetAlert(stock)}>Set Alert</Button>
                          {getPriceAlerts(stock.symbol).length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">Current Alerts:</h4>
                              {getPriceAlerts(stock.symbol).map((alert) => (
                                <div key={alert.id} className="text-sm text-muted-foreground">
                                  Alert when price goes {alert.type} ${alert.price}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right font-medium">
                  ${stock.price.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right flex items-center justify-end gap-1 ${
                    stock.change >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  {formatMarketCap(stock.marketCap)}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  {stock.pe.toFixed(2)}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  {stock.dividend.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right hidden xl:table-cell">
                  <span className="text-danger">${stock.week52Low.toFixed(2)}</span>
                  {" - "}
                  <span className="text-success">${stock.week52High.toFixed(2)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
