
import React, { useState, useEffect } from "react";
import { useResumeData } from "@/hooks/useResumeData";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LocationConfirmation: React.FC = () => {
  const { fullName, currentPosition } = useResumeData();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [confirmedLocation, setConfirmedLocation] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if location has been confirmed before
    const savedLocation = localStorage.getItem("userNetworkingLocation");
    if (savedLocation) {
      setConfirmedLocation(savedLocation);
    } else {
      // Extract location from resume data or show dialog to confirm
      extractLocationFromResumeData();
    }
  }, []);
  
  const extractLocationFromResumeData = () => {
    // Try to get location from localStorage first (in case user already set it)
    const savedLocation = localStorage.getItem("userNetworkingLocation");
    if (savedLocation) {
      setLocation(savedLocation);
      setConfirmedLocation(savedLocation);
      return;
    }
    
    // If no saved location, show the dialog
    setOpen(true);
    
    // Default to San Francisco if we can't extract a location
    setLocation("San Francisco, CA");
  };
  
  const handleConfirm = () => {
    if (location) {
      localStorage.setItem("userNetworkingLocation", location);
      setConfirmedLocation(location);
      setOpen(false);
    }
  };
  
  const handleSkip = () => {
    // Use default location
    localStorage.setItem("userNetworkingLocation", "San Francisco, CA");
    setConfirmedLocation("San Francisco, CA");
    setOpen(false);
  };
  
  return (
    <>
      {confirmedLocation && (
        <div className="mb-6 flex items-center justify-between bg-muted/50 p-4 rounded-lg">
          <div>
            <h3 className="font-medium">Your Networking Location</h3>
            <p className="text-sm text-muted-foreground">{confirmedLocation}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setOpen(true)}
          >
            Change
          </Button>
        </div>
      )}
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your location</AlertDialogTitle>
            <AlertDialogDescription>
              {fullName ? `Hi ${fullName.split(' ')[0]}! ` : ''}
              We'll use this location to find networking events and groups near you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Input 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="City, State" 
              className="w-full"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkip}>Skip</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm Location</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LocationConfirmation;
