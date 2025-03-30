import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: "0x4AAAAAAABI4S10D2f9gYqA",
          callback: function(token: string) {
            console.log("Turnstile token:", token);
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
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let captchaToken = null;
      if (window.turnstile) {
        captchaToken = window.turnstile.getResponse(turnstileWidgetId.current || undefined);
      }

      console.log("Attempting sign in with email:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: captchaToken ? { captchaToken } : undefined
      });

      if (error) {
        console.error("Sign-in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("Sign-in successful, user:", data?.user?.id);
        localStorage.setItem('auth_session_token', data?.session?.access_token || '');
        
        setTimeout(() => {
          navigate("/");
        }, 300);
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
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
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
          Enter your email and password to access your account
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password">Password</Label>
              <Button variant="link" className="p-0 h-auto text-xs">
                Forgot password?
              </Button>
            </div>
            <Input
              id="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Sign In
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
