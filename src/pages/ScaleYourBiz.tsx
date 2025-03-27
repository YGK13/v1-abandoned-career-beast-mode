import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Cloud, Grid3X3, Landmark, Package, Shield } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ScaleYourBiz = () => {
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "productivity", name: "Productivity" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "legal", name: "Legal" }
  ];
  
  const enterpriseTools = [
    {
      title: "Notion Teams",
      description: "All-in-one workspace for notes, docs, wikis, and project management.",
      icon: Grid3X3,
      category: "Productivity",
      discount: "30% Off",
      url: "https://joinsecret.com/offers/notion"
    },
    {
      title: "Slack Business+",
      description: "Team communication platform that brings people, data, and tools together.",
      icon: Grid3X3,
      category: "Productivity",
      discount: "25% Off",
      url: "https://joinsecret.com/offers/slack"
    },
    {
      title: "Airtable Enterprise",
      description: "Part spreadsheet, part database, and entirely flexible for team collaboration.",
      icon: Grid3X3,
      category: "Productivity",
      discount: "40% Off",
      url: "https://joinsecret.com/offers/airtable"
    },
    {
      title: "Quickbooks Premium",
      description: "Financial management software for small businesses and startups.",
      icon: Landmark,
      category: "Finance",
      discount: "35% Off",
      url: "https://joinsecret.com/offers/quickbooks"
    },
    {
      title: "HubSpot Marketing",
      description: "All-in-one inbound marketing software for managing, automating, and tracking.",
      icon: Package,
      category: "Marketing",
      discount: "50% Off",
      url: "https://joinsecret.com/offers/hubspot"
    },
    {
      title: "Mailchimp Pro",
      description: "Email marketing and automation platform to grow your audience.",
      icon: Package,
      category: "Marketing",
      discount: "30% Off",
      url: "https://joinsecret.com/offers/mailchimp"
    },
    {
      title: "AWS Activate",
      description: "Free credits and support for startups building on AWS.",
      icon: Cloud,
      category: "Productivity",
      discount: "$5,000 Credits",
      url: "https://joinsecret.com/offers/aws"
    },
    {
      title: "DocuSign Business",
      description: "Digital transaction management platform for secure electronic signatures.",
      icon: Shield,
      category: "Legal",
      discount: "40% Off",
      url: "https://joinsecret.com/offers/docusign"
    }
  ];

  const filterTools = (category: string) => {
    if (category === "all") {
      return enterpriseTools;
    }
    return enterpriseTools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Scale Your Biz</h1>
        <p className="text-muted-foreground mb-8">
          Premium tools and resources to accelerate your business growth
        </p>

        <DashboardCard
          title="Enterprise Tools Marketplace"
          subtitle="Exclusive discounts on premium business tools via JoinSecret"
        >
          <div className="p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filterTools(category.id).map((tool, index) => (
                      <EnterpriseToolCard
                        key={index}
                        title={tool.title}
                        description={tool.description}
                        icon={tool.icon}
                        category={tool.category}
                        discount={tool.discount}
                        url={tool.url}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-6 p-4 border border-dashed rounded-lg bg-muted/10 text-center">
              <p className="mb-4 text-muted-foreground">
                All deals are powered by JoinSecret. New offers are added regularly.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('https://joinsecret.com/', '_blank')}
              >
                View All Deals on JoinSecret
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

function EnterpriseToolCard({ 
  title, 
  description, 
  icon: Icon, 
  category,
  discount,
  url 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  category: string;
  discount: string;
  url: string;
}) {
  return (
    <div className="flex flex-col h-full border rounded-lg hover:border-primary/50 transition-all overflow-hidden">
      <div className="flex items-center justify-between bg-muted/30 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">{category}</span>
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
          {discount}
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full gap-1" 
          onClick={() => window.open(url, '_blank')}
        >
          Get Discount
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default ScaleYourBiz;
