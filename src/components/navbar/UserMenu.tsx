
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SSOOptions from "../auth/SSOOptions";

interface UserMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginDialog(false);
  };
  
  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <Button variant="ghost" size="icon" className="rounded-full bg-muted/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </Button>
      ) : (
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setShowLoginDialog(true)}
        >
          <LogIn size={16} />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      )}
      
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to your account</DialogTitle>
            <DialogDescription>
              Choose your preferred sign-in method to access all features
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <SSOOptions onSuccess={handleLoginSuccess} />
          </div>
        </DialogContent>
      </Dialog>
      
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
