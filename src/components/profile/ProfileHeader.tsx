
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Share } from "lucide-react";
import { getInitials } from "@/utils/textUtils";

interface ProfileHeaderProps {
  name: string;
  title: string;
  company: string;
  profileImage?: string;
  profileScore: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  title,
  company,
  profileImage,
  profileScore
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      <div className="flex gap-4 items-center">
        <Avatar className="h-20 w-20 border-2 border-primary/20">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback className="text-lg font-medium">{getInitials(name)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{title} at {company}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="font-normal">
              {profileScore >= 80 ? "Expert" : profileScore >= 60 ? "Advanced" : profileScore >= 40 ? "Intermediate" : "Beginner"}
            </Badge>
            <span className="text-sm text-muted-foreground">Profile strength: {profileScore}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full sm:w-auto gap-3">
        <Progress value={profileScore} className="w-full sm:w-[180px] h-2" />
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex gap-2 items-center">
            <Edit size={14} />
            <span>Edit Profile</span>
          </Button>
          <Button size="sm" variant="ghost" className="flex gap-2 items-center">
            <Share size={14} />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
