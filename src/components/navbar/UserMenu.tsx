
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

interface UserMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="rounded-full bg-muted/50">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
    </div>
  );
};

export default UserMenu;
