
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Event {
  title: string;
  date: string;
  time: string;
}

interface UpcomingEventsSectionProps {
  events: Event[];
}

const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ events }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <span>Calendar</span>
          <Calendar size={16} />
        </Button>
      </div>
      
      <div className="space-y-3">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="p-3 rounded-md border border-border bg-card hover:bg-muted/10 transition-colors cursor-pointer"
          >
            <h4 className="font-medium text-sm">{event.title}</h4>
            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <span>{event.date}</span>
              <span>{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsSection;
