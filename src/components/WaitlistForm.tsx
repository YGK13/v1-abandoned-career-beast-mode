
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const randomPosition = Math.floor(Math.random() * 100) + 1;
      setPosition(randomPosition);
      setIsSubmitting(false);
      
      toast({
        title: "You're on the waitlist!",
        description: `You're number ${randomPosition} in line. We'll notify you when it's your turn.`,
      });
    }, 1500);
    
    // In production, replace with actual API call
  };

  return (
    <Card className="border rounded-xl overflow-hidden bg-white shadow-featured">
      <div className="p-8">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
        <p className="text-muted-foreground mb-8">
          Be among the first to access Career BEAST MODE when we launch.
        </p>
        
        {position ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary font-bold text-3xl mb-6 animate-pulse">
              #{position}
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="text-xl font-bold mb-3">You're on the list!</h4>
              <p className="text-muted-foreground mb-4">
                You're number {position} in line. We'll notify you by email when it's your turn.
              </p>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 h-12 shadow-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10 h-12 shadow-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1.5">
                Current Role (Optional)
              </label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Product Manager, Software Engineer, etc."
                className="h-12 shadow-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium shadow-sm flex items-center justify-center group transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : (
                <>
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              We'll never share your information with third parties.
            </p>
          </form>
        )}
      </div>
    </Card>
  );
};

export default WaitlistForm;
