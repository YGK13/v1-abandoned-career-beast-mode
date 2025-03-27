
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { mentalModels, MentalModel } from "@/data/mentalModelsData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MentalModels = () => {
  const [dailyModel, setDailyModel] = useState<MentalModel | null>(null);
  
  useEffect(() => {
    // Get deterministic "random" model based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const modelIndex = dayOfYear % mentalModels.length;
    setDailyModel(mentalModels[modelIndex]);
  }, []);
  
  const ModelOfTheDay = () => {
    if (!dailyModel) return null;
    
    const Icon = dailyModel.icon;
    
    return (
      <Card className="mb-8 overflow-hidden border-primary/20">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">Mental Model of the Day</h3>
                  <Badge variant="secondary" className="mt-1">
                    {dailyModel.category}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div>
            <h4 className="text-lg font-medium mb-2">{dailyModel.title}</h4>
            <p className="text-muted-foreground mb-4">{dailyModel.description}</p>
            <div className="bg-muted/50 p-4 rounded-md">
              <h5 className="font-medium mb-1">How to Apply This Today:</h5>
              <p>{dailyModel.application}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Mental Models</h1>
          <p className="text-muted-foreground mt-1">
            Powerful thinking frameworks to improve your decision-making and problem-solving
          </p>
        </header>
        
        <ModelOfTheDay />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard title="What are Mental Models?">
            <div className="prose dark:prose-invert">
              <p>
                Mental models are frameworks for thinking that help you understand the world
                and make better decisions. They are like tools for your mind.
              </p>
              <p>
                By learning and applying different mental models, you can:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Make better decisions with less bias</li>
                <li>Solve problems more effectively</li>
                <li>Better understand complex situations</li>
                <li>Communicate your thoughts more clearly</li>
              </ul>
              <p>
                Each day, we'll provide a different mental model for you to learn and apply
                in your professional and personal life.
              </p>
            </div>
          </DashboardCard>
          
          <DashboardCard title="How to Use Mental Models">
            <div className="prose dark:prose-invert">
              <p>
                To get the most value from mental models:
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>
                  <strong>Understand the concept</strong> - Read the description and make sure you grasp the core idea
                </li>
                <li>
                  <strong>Identify applications</strong> - Think about situations in your life where this model might apply
                </li>
                <li>
                  <strong>Practice deliberately</strong> - Use the suggested application or create your own practice exercise
                </li>
                <li>
                  <strong>Reflect on results</strong> - Notice how applying the model changes your thinking or outcomes
                </li>
                <li>
                  <strong>Build your collection</strong> - Over time, develop a diverse toolkit of models you can apply
                </li>
              </ol>
            </div>
          </DashboardCard>
        </div>
        
        <h2 className="text-2xl font-bold mt-12 mb-6">All Mental Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentalModels.map(model => {
            const Icon = model.icon;
            return (
              <Card key={model.id} className="overflow-hidden">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium">{model.title}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {model.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MentalModels;
