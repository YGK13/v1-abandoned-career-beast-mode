
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SSOOptions from "@/components/auth/SSOOptions";
import { supabase } from "@/integrations/supabase/client";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  onSignUpComplete: () => void;
}

// Declare window.turnstile for TypeScript
declare global {
  interface Window {
    turnstile: any;
  }
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  fullName,
  setFullName,
  onSignUpComplete
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        console.log("Rendering Turnstile on Sign Up form");
        turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: "0x4AAAAAAABI4S10D2f9gYqA",
          callback: function(token: string) {
            console.log("Turnstile token received in signup:", token.substring(0, 10) + "...");
            setCaptchaToken(token);
          },
          "expired-callback": function() {
            console.log("Turnstile token expired in signup");
            setCaptchaToken(null);
          }
        });
      }
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      const checkTurnstileLoaded = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstileLoaded);
          renderTurnstile();
        }
      }, 100);
      
      return () => clearInterval(checkTurnstileLoaded);
    }

    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    };
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get the captcha token if not already set
      if (!captchaToken && window.turnstile && turnstileWidgetId.current) {
        const token = window.turnstile.getResponse(turnstileWidgetId.current);
        if (token) {
          setCaptchaToken(token);
          console.log("Retrieved Turnstile token for signup:", token.substring(0, 10) + "...");
        } else {
          console.log("No Turnstile token available for signup, trying to reset");
          window.turnstile.reset(turnstileWidgetId.current);
          
          toast({
            title: "Captcha verification required",
            description: "Please complete the captcha verification",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      console.log("Attempting signup with captcha token:", captchaToken?.substring(0, 10) + "...");

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          captchaToken: captchaToken || undefined,
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (!error) {
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
        onSignUpComplete();
      } else {
        console.error("Sign up error:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        
        // Reset captcha if there was an error related to captcha
        if (error.message.includes("captcha")) {
          if (window.turnstile && turnstileWidgetId.current) {
            window.turnstile.reset(turnstileWidgetId.current);
          }
        }
      }
    } catch (error: any) {
      console.error("Sign up unexpected error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSSOSuccess = () => {
    // No need to do anything special here, just let the auth context handle it
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Sign up to access all features and resources
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignUp}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name (Optional)</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div ref={turnstileContainerRef} className="flex justify-center"></div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Create Account
          </Button>
          
          <div className="relative w-full flex items-center gap-4 py-2">
            <div className="flex-grow h-px bg-muted"></div>
            <span className="text-muted-foreground text-sm">or sign up with</span>
            <div className="flex-grow h-px bg-muted"></div>
          </div>
          
          <SSOOptions onSuccess={handleSSOSuccess} />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
