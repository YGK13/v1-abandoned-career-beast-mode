
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTurnstile, TurnstileVerifyResponse } from "@/utils/turnstileUtils";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSuccess: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ 
  email, 
  setEmail, 
  password, 
  setPassword,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  // Initialize Turnstile
  const turnstile = useTurnstile({
    containerId: "turnstile-container",
    onTokenChange: (token) => {
      console.log("Turnstile token changed:", token);
      setCaptchaToken(token);
    }
  });

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
      
      // Verify captcha token first
      if (captchaToken) {
        console.log("Verifying captcha token");
        const verification: TurnstileVerifyResponse = await turnstile.verifyToken();
        
        if (!verification.success) {
          console.error("Captcha verification failed:", verification);
          toast({
            title: "Captcha verification failed",
            description: "Please refresh the page and try again",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        console.log("Captcha verified successfully");
      } else {
        console.log("No captcha token, proceeding without verification");
      }
      
      // Use email link authentication with captcha token
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          captchaToken
        }
      });

      if (error) {
        console.error("Sign-in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email to receive a login link
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
          
          {/* Turnstile container */}
          <div id="turnstile-container" className="flex justify-center mt-4"></div>
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
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
