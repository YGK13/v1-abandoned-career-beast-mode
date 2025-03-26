
import React from "react";
import { Button } from "@/components/ui/button";

const DashboardHeader: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold">Career Dashboard</h1>
          <p className="text-muted-foreground mt-1">Get insights and manage your career growth</p>
        </div>
        <Button variant="default" className="self-start md:self-auto">
          Sync with LinkedIn
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
