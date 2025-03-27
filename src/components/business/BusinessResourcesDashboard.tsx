
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for the charts
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16500 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 22800 },
];

const acquisitionData = [
  { channel: "Organic", cost: 120 },
  { channel: "Social", cost: 230 },
  { channel: "Ads", cost: 450 },
  { channel: "Referral", cost: 80 },
  { channel: "Email", cost: 140 },
];

const marketData = [
  { name: "Addressed", value: 35 },
  { name: "Opportunity", value: 65 },
];

const COLORS = ["#9b87f5", "#d6bcfa"];

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      {trend && (
        <div className="flex items-center mt-1">
          {trend.direction === "up" ? (
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={`text-xs ${trend.direction === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend.value}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

const BusinessResourcesDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Business Resources Dashboard</h2>
        <Button variant="outline" size="sm" className="gap-1">
          <Info className="h-4 w-4" />
          What's this?
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Monthly Revenue"
          value="$21,800"
          subtitle="Last month: $18,500"
          icon={DollarSign}
          trend={{ direction: "up", value: "17.8%" }}
        />
        <MetricCard 
          title="Customer Acquisition Cost"
          value="$230"
          subtitle="Industry avg: $350"
          icon={TrendingDown}
          trend={{ direction: "down", value: "12.3%" }}
        />
        <MetricCard 
          title="Market Opportunity"
          value="$4.2M"
          subtitle="Total addressable market: $12M"
          icon={TrendingUp}
          trend={{ direction: "up", value: "8.5%" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  revenue: { theme: { light: "#9b87f5", dark: "#9b87f5" } },
                }}
              >
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis 
                    fontSize={12} 
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent labelFormatter={(value) => `${value}`} />}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Acquisition Cost by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  cost: { theme: { light: "#9b87f5", dark: "#9b87f5" } },
                }}
              >
                <BarChart data={acquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar 
                    dataKey="cost" 
                    fill="#9b87f5" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Market Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center">
              <ChartContainer
                config={{
                  Addressed: { theme: { light: COLORS[0], dark: COLORS[0] } },
                  Opportunity: { theme: { light: COLORS[1], dark: COLORS[1] } },
                }}
              >
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {marketData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  {entry.name}: {entry.value}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessResourcesDashboard;
