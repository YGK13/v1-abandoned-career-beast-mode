
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { localGroups } from "@/data/networkingData";
import { LocalGroup } from "@/data/networkingData";

const LocalGroups = () => {
  const [userLocation, setUserLocation] = useState<string>("San Francisco, CA");
  const [filteredGroups, setFilteredGroups] = useState<LocalGroup[]>(localGroups);
  
  useEffect(() => {
    // Get user's location from localStorage (set by the LocationConfirmation component)
    const savedLocation = localStorage.getItem("userNetworkingLocation");
    if (savedLocation) {
      setUserLocation(savedLocation);
      
      // In a real application, we would fetch groups based on the user's location
      // For now, we'll simulate this by filtering the mock data
      const locationCity = savedLocation.split(',')[0].trim().toLowerCase();
      
      // Filter groups that match the user's city or return all if no match
      const matchingGroups = localGroups.filter(group => 
        group.location.toLowerCase().includes(locationCity)
      );
      
      setFilteredGroups(matchingGroups.length > 0 ? matchingGroups : localGroups);
    }
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Local Networking Groups</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          Nearby communities and events in {userLocation}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{group.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => window.open(group.url, '_blank')}
                  >
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm mt-3">{group.description}</p>
              
              {group.upcomingEvent && (
                <div className="mt-3 bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary" />
                    <p className="text-sm font-medium">Upcoming Event</p>
                  </div>
                  <p className="text-sm mt-1">{group.upcomingEvent.title}</p>
                  <p className="text-xs text-muted-foreground">{group.upcomingEvent.date} • {group.upcomingEvent.time}</p>
                </div>
              )}
              
              <div className="mt-4">
                <Button size="sm">Join Group</Button>
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <p>No groups found in your area. Try changing your location.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalGroups;
