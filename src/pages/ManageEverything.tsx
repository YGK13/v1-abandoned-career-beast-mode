
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyUpdatesAlert from "@/components/management/DailyUpdatesAlert";
import ManagementCategoryContent from "@/components/management/ManagementCategoryContent";
import { managementTips } from "@/data/managementTipsData";

const ManageEverything = () => {
  const [date] = useState(() => new Date().toLocaleDateString());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Manage Everything</h1>
            <p className="text-muted-foreground">
              Daily rotating tips and resources for effective management across all dimensions
            </p>
          </header>

          <DailyUpdatesAlert date={date} />

          <Tabs defaultValue="people" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
            </TabsList>

            {Object.entries(managementTips).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <ManagementCategoryContent category={category} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ManageEverything;
