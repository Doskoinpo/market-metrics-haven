
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          StockTracker
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className={cn(
              "text-muted-foreground",
              location.pathname === "/" && "text-foreground"
            )}
          >
            <Link to="/">Market</Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn(
              "text-muted-foreground",
              location.pathname === "/watchlist" && "text-foreground"
            )}
          >
            <Link to="/watchlist">Watchlist</Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn(
              "text-muted-foreground",
              location.pathname === "/admin" && "text-foreground"
            )}
          >
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
