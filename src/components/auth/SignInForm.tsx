
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SSOOptions from "@/components/auth/SSOOptions";
import { supabase } from "@/integrations/supabase/client";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSuccess: () => void;
}

// Declare window.turnstile for TypeScript
declare global {
  interface Window {
    turnstile: any;
  }
}

const SignInForm: React.FC<SignInFormProps> = ({ 
  email, 
  setEmail, 
  password, 
  setPassword,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Handle OAuth callback error (if present in URL)
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      console.error("OAuth error:", error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was an issue signing in with the provider",
        variant: "destructive",
      });
    }
    
    // Check for access_token in URL fragment (hash) - this is how Supabase returns successful OAuth
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      console.log("Found access token in URL, setting session");
      localStorage.setItem('auth_session_token', accessToken);
      onSuccess();
    }
  }, [searchParams, toast, onSuccess]);

  // Initialize Cloudflare Turnstile
  useEffect(() => {
    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        // Use hCaptcha site key from Supabase secrets
        const siteKey = "0x4AAAAAAABI4S10D2f9gYqA";
        
        console.log("Rendering Turnstile with site key:", siteKey);
        turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          callback: function(token: string) {
            console.log("Turnstile token received:", token.substring(0, 10) + "...");
            setCaptchaToken(token);
          },
          "expired-callback": function() {
            console.log("Turnstile token expired");
            setCaptchaToken(null);
          }
        });
      }
    };

    // Attempt to render initially or wait for Turnstile to load
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

    // Clean up Turnstile widget on unmount
    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    };
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Missing email",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Attempting sign in with email:", email);
      
      if (!captchaToken && window.turnstile && turnstileWidgetId.current) {
        const token = window.turnstile.getResponse(turnstileWidgetId.current);
        if (token) {
          setCaptchaToken(token);
          console.log("Retrieved Turnstile token:", token.substring(0, 10) + "...");
        } else {
          console.log("No Turnstile token available, trying to reset and get a new one");
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
      
      // Use email link authentication with captcha token
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          captchaToken: captchaToken || undefined
        }
      });

      if (error) {
        console.error("Sign-in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        
        // If captcha error, reset the captcha
        if (error.message.includes("captcha")) {
          if (window.turnstile && turnstileWidgetId.current) {
            window.turnstile.reset(turnstileWidgetId.current);
          }
        }
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a login link to your email address",
        });
      }
    } catch (error: any) {
      console.error("Unexpected sign-in error:", error);
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
    onSuccess();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email to receive a login link or use a social provider
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignIn}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Send Login Link
          </Button>
          
          <div className="relative w-full flex items-center gap-4 py-2">
            <div className="flex-grow h-px bg-muted"></div>
            <span className="text-muted-foreground text-sm">or continue with</span>
            <div className="flex-grow h-px bg-muted"></div>
          </div>
          
          <SSOOptions onSuccess={handleSSOSuccess} />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
