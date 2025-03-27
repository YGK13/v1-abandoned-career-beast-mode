
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalaryCalculator from "@/components/salary/SalaryCalculator";
import PerformanceReviewGuide from "@/components/salary/PerformanceReviewGuide";
import NegotiationGuide from "@/components/salary/NegotiationGuide";
import CareerTimeline from "@/components/salary/CareerTimeline";
import LateralMoveAnalysis from "@/components/salary/LateralMoveAnalysis";
import { Separator } from "@/components/ui/separator";

const SalaryTitle = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Salary & Title Growth</h1>
          <p className="text-muted-foreground mb-8">
            Strategic tools and guidance to accelerate your compensation and career progression
          </p>

          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="calculator">Salary Calculator</TabsTrigger>
              <TabsTrigger value="timeline">Growth Timeline</TabsTrigger>
              <TabsTrigger value="performance">Performance Reviews</TabsTrigger>
              <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
              <TabsTrigger value="lateral">Lateral Moves</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="py-4">
              <SalaryCalculator />
            </TabsContent>
            
            <TabsContent value="timeline" className="py-4">
              <CareerTimeline />
            </TabsContent>
            
            <TabsContent value="performance" className="py-4">
              <PerformanceReviewGuide />
            </TabsContent>
            
            <TabsContent value="negotiation" className="py-4">
              <NegotiationGuide />
            </TabsContent>
            
            <TabsContent value="lateral" className="py-4">
              <LateralMoveAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SalaryTitle;
