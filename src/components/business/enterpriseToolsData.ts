
import { Cloud, Grid3X3, Landmark, Package, Shield } from "lucide-react";

export const enterpriseToolsData = {
  categories: [
    { id: "all", name: "All Tools" },
    { id: "productivity", name: "Productivity" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "legal", name: "Legal" }
  ],
  
  enterpriseTools: [
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
  ]
};
