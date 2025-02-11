
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WatchlistContextType {
  watchlist: string[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
  setPriceAlert: (symbol: string, price: number, type: "above" | "below") => void;
  removePriceAlert: (symbol: string) => void;
  getPriceAlerts: (symbol: string) => PriceAlert[];
}

interface PriceAlert {
  symbol: string;
  price: number;
  type: "above" | "below";
  id: string;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    const saved = localStorage.getItem("priceAlerts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("priceAlerts", JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
      toast.success(`Added ${symbol} to watchlist`);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((s) => s !== symbol));
    toast.success(`Removed ${symbol} from watchlist`);
  };

  const isInWatchlist = (symbol: string) => watchlist.includes(symbol);

  const setPriceAlert = (symbol: string, price: number, type: "above" | "below") => {
    const newAlert: PriceAlert = {
      symbol,
      price,
      type,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPriceAlerts([...priceAlerts, newAlert]);
    toast.success(`Price alert set for ${symbol}`);
  };

  const removePriceAlert = (id: string) => {
    setPriceAlerts(priceAlerts.filter((alert) => alert.id !== id));
    toast.success("Price alert removed");
  };

  const getPriceAlerts = (symbol: string) => 
    priceAlerts.filter((alert) => alert.symbol === symbol);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        setPriceAlert,
        removePriceAlert,
        getPriceAlerts,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
