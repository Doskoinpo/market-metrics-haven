
import { Card } from "@/components/ui/card";
import { AdminCharts } from "@/components/AdminCharts";

const Admin = () => {
  return (
    <div className="container py-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor market performance and key metrics
          </p>
        </div>
        <AdminCharts />
      </div>
    </div>
  );
};

export default Admin;
