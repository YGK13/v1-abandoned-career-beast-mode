
import React from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  Building,
  Briefcase,
  Landmark,
  Mailbox,
  Link,
  ExternalLink
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BusinessOption = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText = "Learn More", 
  url 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  buttonText?: string; 
  url: string 
}) => (
  <div className="p-4 border rounded-lg hover:border-primary/50 transition-all">
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1" 
          onClick={() => window.open(url, '_blank')}
        >
          {buttonText}
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  </div>
);

const BuildBusiness = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Build Your Business</h1>
        <p className="text-muted-foreground mb-8">
          Essential resources to establish and grow your business
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <DashboardCard
            title="Form Your LLC"
            subtitle="Set up your business entity quickly and easily"
          >
            <div className="space-y-4 p-4">
              <BusinessOption
                title="TailorBrands"
                description="Complete LLC formation service with branding resources"
                icon={Building}
                url="https://www.tailorbrands.com/"
              />
              <BusinessOption
                title="ZenBusiness"
                description="Affordable LLC formation with ongoing compliance support"
                icon={Briefcase}
                url="https://www.zenbusiness.com/"
              />
              <BusinessOption
                title="Incfile"
                description="Free LLC formation with registered agent services"
                icon={Building}
                url="https://www.incfile.com/"
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Business Banking"
            subtitle="Banking solutions tailored for businesses"
          >
            <div className="space-y-4 p-4">
              <BusinessOption
                title="Mercury"
                description="Fee-free digital banking built for startups and businesses"
                icon={Landmark}
                url="https://mercury.com/"
              />
              <BusinessOption
                title="Novo"
                description="Small business banking with powerful integrations"
                icon={Landmark}
                url="https://www.novo.co/"
              />
              <BusinessOption
                title="Brex"
                description="All-in-one finance for growing businesses"
                icon={Landmark}
                url="https://www.brex.com/"
              />
            </div>
          </DashboardCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard
            title="Business Address"
            subtitle="Professional address solutions for your business"
          >
            <div className="space-y-4 p-4">
              <BusinessOption
                title="Stable"
                description="Physical addresses with mail scanning and forwarding"
                icon={Mailbox}
                url="https://www.stable.app/"
              />
              <BusinessOption
                title="iPostal1"
                description="Digital mailbox services with real street addresses"
                icon={Mailbox}
                url="https://ipostal1.com/"
              />
              <BusinessOption
                title="Earth Class Mail"
                description="Virtual mailbox and mail scanning services"
                icon={Mailbox}
                url="https://www.earthclassmail.com/"
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Premium Resources"
            subtitle="Exclusive resources for business growth"
          >
            <div className="p-4">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">JoinSecret.com</h3>
                <p className="mb-4">
                  Access to exclusive deals, resources, and a community of entrepreneurs to help grow your business.
                </p>
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.open('https://joinsecret.com/', '_blank')}
                >
                  <Link className="w-5 h-5" />
                  Access JoinSecret
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
};

export default BuildBusiness;
