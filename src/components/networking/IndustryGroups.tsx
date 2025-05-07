import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ExternalLink } from "lucide-react";
import { industryGroups } from "@/data/networking";

const IndustryGroups = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Industry Groups</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          Professional organizations and online communities relevant to your industry
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {industryGroups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <group.icon size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.memberCount.toLocaleString()} members</p>
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
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Why join:</strong> {group.valueProposition}
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm">Join Group</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryGroups;
