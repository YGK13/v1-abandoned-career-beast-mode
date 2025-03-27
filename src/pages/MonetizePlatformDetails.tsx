
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPlatformById } from "@/data/expertPlatformsData";

const MonetizePlatformDetails = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();
  
  const platform = getPlatformById(platformId || "");
  
  if (!platform) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
            <p className="mb-6">The expert platform you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/monetize-expertise">Back to Monetize Expertise</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { name, description, icon: Icon, payRange, requirements, applicationProcess, benefits, industries, link } = platform;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Platforms
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <Badge variant="outline" className="mt-1">
                {payRange}
              </Badge>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-lg">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Application Process</h2>
                <p className="text-muted-foreground">{applicationProcess}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Industries</h2>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <Badge key={index} variant="secondary">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                Apply on {name} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonetizePlatformDetails;
