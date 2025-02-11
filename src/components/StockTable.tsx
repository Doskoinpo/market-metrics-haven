
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
import { ArrowUpDown, Search } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

const mockStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 1.2, volume: 98450000 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 338.11, change: -0.5, volume: 22160000 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 131.86, change: 0.8, volume: 23950000 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 127.12, change: -0.3, volume: 44230000 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 297.89, change: 2.1, volume: 19870000 },
];

export function StockTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Stock>("symbol");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Stock) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("symbol")} className="cursor-pointer">
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
              <TableHead onClick={() => handleSort("volume")} className="cursor-pointer text-right">
                Volume <ArrowUpDown className="ml-1 h-4 w-4 inline" />
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
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">
                  ${stock.price.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    stock.change >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  {(stock.volume / 1000000).toFixed(2)}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
