
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SSOOptions from "@/components/auth/SSOOptions";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, session, isLoading } = useAuth();
  const [tab, setTab] = useState("signin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    if (session) {
      navigate("/");
    }

    // Load the hCaptcha script
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(script);
    };
  }, [session, navigate]);

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
      // Get the captcha token if the hCaptcha object exists
      let captchaToken = null;
      if (window.hcaptcha) {
        captchaToken = window.hcaptcha.getResponse();
        if (!captchaToken) {
          toast({
            title: "Captcha verification required",
            description: "Please complete the captcha verification",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Add captcha token to the sign in request
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken
        }
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      // Reset captcha
      if (window.hcaptcha) {
        window.hcaptcha.reset();
      }
    }
  };

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
      // Get the captcha token if the hCaptcha object exists
      let captchaToken = null;
      if (window.hcaptcha) {
        captchaToken = window.hcaptcha.getResponse();
        if (!captchaToken) {
          toast({
            title: "Captcha verification required",
            description: "Please complete the captcha verification",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Add captcha token to the sign up request
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          captchaToken
        }
      });
      
      if (!error) {
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
        setTab("signin");
      } else {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      // Reset captcha
      if (window.hcaptcha) {
        window.hcaptcha.reset();
      }
    }
  };

  const handleSSOSuccess = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 flex flex-col items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome to Career Beast Mode</h1>
          
          <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
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
                    <div className="h-captcha" data-sitekey="84a9a43c-ea3a-4a2a-bc18-b6f5bfb13b1f"></div>
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
            </TabsContent>

            <TabsContent value="signup">
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
                    <div className="h-captcha" data-sitekey="84a9a43c-ea3a-4a2a-bc18-b6f5bfb13b1f"></div>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// Add TypeScript definitions for the hCaptcha
declare global {
  interface Window {
    hcaptcha: {
      render: (container: string, options: any) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

export default Auth;
