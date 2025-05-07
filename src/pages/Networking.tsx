import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import NetworkingSuggestions from "@/components/networking/NetworkingSuggestions";
import IndustryGroups from "@/components/networking/IndustryGroups";
import LocalGroups from "@/components/networking/LocalGroups";
import FractionalExecutivePlatforms from "@/components/networking/FractionalExecutivePlatforms";
import CommunityGroups from "@/components/networking/CommunityGroups";
import LocationConfirmation from "@/components/networking/LocationConfirmation";
import PersonalizedRecommendations from "@/components/networking/PersonalizedRecommendations";
import IndustryConnections from "@/components/networking/IndustryConnections";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useResumeData } from "@/hooks/useResumeData";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Networking = () => {
  const { fullName, currentPosition, isLoading } = useResumeData();
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast when resume data is loaded
    if (!isLoading && fullName && currentPosition) {
      toast({
        title: "Welcome to Strategic Networking",
        description: `We've personalized networking recommendations based on your profile as a ${currentPosition}.`,
      });
    }
  }, [isLoading, fullName, currentPosition, toast]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Strategic Networking</h1>
        <p className="text-muted-foreground mb-8">
          Build valuable connections based on your profile, documents, and career goals
        </p>

        <LocationConfirmation />
        
        <PersonalizedRecommendations />
        
        <Tabs defaultValue="people">
          <TabsList className="mb-6">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="groups">Groups & Communities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="people">
            <IndustryConnections />
            <NetworkingSuggestions />
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <IndustryGroups />
              <LocalGroups />
            </div>
            
            <FractionalExecutivePlatforms />
            
            <Separator className="my-8" />
            
            <CommunityGroups />
          </TabsContent>
          
          <TabsContent value="events">
            <div className="space-y-6">
              <UpcomingEvents />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Placeholder component for upcoming events
// In a real application, this would fetch events based on user's location and interests
const UpcomingEvents = () => {
  const events = [
    {
      title: "Tech Innovators Meetup",
      date: "June 15, 2023",
      location: "San Francisco",
      description: "Network with tech leaders and innovators in a casual setting."
    },
    {
      title: "Women in Leadership Forum",
      date: "June 22, 2023",
      location: "Online",
      description: "Virtual event focused on challenges and opportunities for women in leadership roles."
    },
    {
      title: "Industry Insights Conference",
      date: "July 8-10, 2023",
      location: "Chicago",
      description: "Annual conference bringing together experts from across the industry."
    }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Networking Events</h2>
      {events.map((event, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h3 className="font-medium">{event.title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{event.date}</span>
            </div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{event.location}</span>
            </div>
          </div>
          <p className="text-sm mt-3">{event.description}</p>
          <div className="mt-4 flex gap-2">
            <Button size="sm">Register</Button>
            <Button size="sm" variant="outline">Add to Calendar</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Networking;
