
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, CheckCircle } from "lucide-react";

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
    <div className="border rounded-xl p-6 bg-background/80 backdrop-blur shadow-sm">
      <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
      <p className="text-muted-foreground mb-6">
        Be among the first to access Career BEAST MODE when we launch.
      </p>
      
      {position ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-4">
            #{position}
          </div>
          <h4 className="text-xl font-bold mb-2">You're on the list!</h4>
          <p className="text-muted-foreground">
            You're number {position} in line. We'll notify you by email when it's your turn.
          </p>
          <CheckCircle className="mx-auto mt-4 text-green-500" size={32} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Current Role (Optional)
            </label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Product Manager, Software Engineer, etc."
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Join the Waitlist"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            We'll never share your information with third parties.
          </p>
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
