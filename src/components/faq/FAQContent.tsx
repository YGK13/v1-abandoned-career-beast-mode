import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, FileUp, Mail, Users, Database, Globe, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FAQContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="border-b pb-6 mb-6">
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about setting up Career BEAST MODE
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-amber-800">Production Setup Notice</h2>
            <p className="text-lg text-amber-700">
              The following guide is intended for setting up a production version of Career BEAST MODE. 
              For demo and testing purposes, you can showcase the UI with simulated data.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-amber-400 text-amber-700 hover:bg-amber-100"
              onClick={() => navigate("/help")}
            >
              See Help Center
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="mb-8 w-full md:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="integrations">Third-Party Integrations</TabsTrigger>
          <TabsTrigger value="uploads">File Uploads</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist Setup</TabsTrigger>
          <TabsTrigger value="testing">Testing & Launch</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations">
          <h2 className="text-2xl font-bold mb-6">Setting Up Third-Party Integrations</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="linkedin">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Linkedin className="text-[#0A66C2]" />
                  <span>LinkedIn API Integration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step 1: Create a LinkedIn Developer Account</h3>
                  <p>Go to <a href="https://developer.linkedin.com/" className="text-primary underline" target="_blank" rel="noreferrer">LinkedIn Developers</a> and sign in with your LinkedIn account.</p>
                  
                  <h3 className="font-semibold text-lg">Step 2: Create a New App</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Click on "Create App"</li>
                    <li>Fill in the required information about your application</li>
                    <li>Add the redirect URL (this will be your website URL + "/linkedin-callback")</li>
                    <li>Request the following permissions:
                      <ul className="list-disc pl-6">
                        <li>r_emailaddress</li>
                        <li>r_liteprofile</li>
                        <li>w_member_social</li>
                      </ul>
                    </li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg">Step 3: Get API Credentials</h3>
                  <p>After approval, you'll receive:</p>
                  <ul className="list-disc pl-6">
                    <li>Client ID</li>
                    <li>Client Secret</li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg">Step 4: Configure Your App</h3>
                  <p>Open the `src/utils/linkedInUtils.ts` file and replace the placeholder values with your actual credentials:</p>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                    {`// Replace these values with your actual LinkedIn API credentials
export const LINKEDIN_CONFIG = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://your-domain.com/linkedin-callback',
};`}
                  </pre>
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-blue-800">
                    <p className="font-medium">Important Note:</p>
                    <p>LinkedIn API for importing profiles requires Business Developer approval. For testing, you can use the simulated import experience.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="twitter">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Globe />
                  <span>Twitter/X API Integration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step 1: Apply for Twitter API Access</h3>
                  <p>Go to <a href="https://developer.twitter.com/en/portal/dashboard" className="text-primary underline" target="_blank" rel="noreferrer">Twitter Developer Portal</a> and apply for developer access.</p>
                  
                  <h3 className="font-semibold text-lg">Step 2: Create a Project and App</h3>
                  <p>Once approved, create a project and app to get your API credentials.</p>
                  
                  <h3 className="font-semibold text-lg">Step 3: Configure Authentication</h3>
                  <p>Setup OAuth 2.0 and add your callback URL.</p>
                  
                  <h3 className="font-semibold text-lg">Step 4: Update Your Config</h3>
                  <p>Add your Twitter API credentials to your application configuration.</p>
                  
                  <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 text-amber-800">
                    <p className="font-medium">Important Note:</p>
                    <p>Twitter API v2 now requires a paid subscription. Basic tier starts at $100/month.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="jobs">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Database />
                  <span>Job Board API Integration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Setup Job Board Integration</h3>
                  <p>For real job listings, you can integrate with one of these services:</p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <a href="https://www.reed.co.uk/developers/jobseeker" className="font-medium text-primary">Reed API</a>
                      <p>Free to use, offers UK job listings.</p>
                    </li>
                    <li>
                      <a href="https://developer.adzuna.com/" className="font-medium text-primary">Adzuna API</a>
                      <p>1,000 free API calls per month.</p>
                    </li>
                    <li>
                      <a href="https://www.indeed.com/publisher" className="font-medium text-primary">Indeed API</a>
                      <p>Requires application and approval.</p>
                    </li>
                  </ol>
                  
                  <p>After obtaining API keys, update the job data source in the `src/components/jobs/data/jobsAPI.ts` file:</p>
                  
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                    {`// Replace with your actual API configuration
export const JOB_API_CONFIG = {
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'API_BASE_URL',
  partnerId: 'YOUR_PARTNER_ID'
};`}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="uploads">
          <h2 className="text-2xl font-bold mb-6">Setting Up File Uploads</h2>
          
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileUp className="text-primary" />
                File Upload Configuration
              </h3>
              
              <div className="space-y-4">
                <p>Career BEAST MODE supports document uploads through several methods:</p>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Option 1: Local Storage (Demo Only)</h4>
                  <p className="text-sm text-muted-foreground mb-2">For demonstration purposes, upload functionality will store files in browser storage. This is already implemented in the demo version.</p>
                  <p className="text-sm text-muted-foreground"><strong>Limitation:</strong> Files will be lost when browser data is cleared.</p>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Option 2: Cloud Storage (Production)</h4>
                  <p className="text-sm text-muted-foreground mb-2">For a production environment, you'll need cloud storage like AWS S3, Google Cloud Storage, or Supabase Storage.</p>
                  
                  <div className="border-t border-border mt-3 pt-3">
                    <h5 className="text-sm font-medium mb-1">AWS S3 Setup:</h5>
                    <ol className="list-decimal text-sm pl-5 space-y-1">
                      <li>Create an AWS account</li>
                      <li>Create an S3 bucket with appropriate permissions</li>
                      <li>Create IAM credentials for accessing the bucket</li>
                      <li>Update the configuration in your app</li>
                    </ol>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 text-green-800">
                  <p className="font-medium">Recommended Solution:</p>
                  <p>We recommend using <a href="https://supabase.com/storage" className="underline" target="_blank" rel="noreferrer">Supabase Storage</a> for the easiest setup. They offer a generous free tier and simple integration.</p>
                </div>
                
                <h4 className="font-medium mt-6">To activate uploads in your demo:</h4>
                <p>For demonstration purposes, use the built-in simulated file upload functionality:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Go to the Career Assets page</li>
                  <li>Click "Upload Files" button</li>
                  <li>Select any file under 2MB</li>
                  <li>The file will be processed and shown in the documents list</li>
                </ol>
              </div>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 text-amber-800">
              <p className="font-medium">File Upload Size Limits:</p>
              <p>For free hosting plans, file uploads are typically limited to 50MB total storage and 12MB per file. For production use, consider a paid storage solution.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="waitlist">
          <h2 className="text-2xl font-bold mb-6">Setting Up a Waitlist</h2>
          
          <div className="space-y-6">
            <p className="text-lg">To set up a waitlist that collects user information and shows their position in line, you'll need these components:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">1. Waitlist Form</h3>
                <p className="mb-4">The waitlist form needs to collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Optional: Professional role/title</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">The form is already created and can be added to your landing page. See implementation steps below.</p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">2. Queue Position System</h3>
                <p className="mb-4">To show users their position in line, you'll need:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>A database to store waitlist entries</li>
                  <li>A unique identifier for each signup</li>
                  <li>A method to calculate position</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">This requires a backend system. For a simple solution, you can use services like ConvertKit, MailChimp, or a specialized waitlist service.</p>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Setup Options</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 text-green-800">
                  <p className="font-medium">Option 1: Quick Setup (Recommended)</p>
                  <p className="mb-2">Use a specialized waitlist service:</p>
                  <ul className="list-disc pl-6">
                    <li><a href="https://getwaitlist.com/" className="underline" target="_blank" rel="noreferrer">GetWaitlist.com</a> - Easy setup, free tier available</li>
                    <li><a href="https://www.waitlistr.co/" className="underline" target="_blank" rel="noreferrer">Waitlistr</a> - Includes referral system to help people move up the list</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-blue-800">
                  <p className="font-medium">Option 2: Email Marketing Integration</p>
                  <p className="mb-2">Use an email marketing service to collect waitlist signups:</p>
                  <ul className="list-disc pl-6">
                    <li><a href="https://mailchimp.com/" className="underline" target="_blank" rel="noreferrer">Mailchimp</a> - Has a form builder, automation, and free tier</li>
                    <li><a href="https://convertkit.com/" className="underline" target="_blank" rel="noreferrer">ConvertKit</a> - Great for content creators, easy to set up</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 text-purple-800">
                  <p className="font-medium">Option 3: Custom Implementation</p>
                  <p>To implement a waitlist with the existing waitlist component:</p>
                  <ol className="list-decimal pl-6 mt-2">
                    <li>Add the `<WaitlistForm />` component to the Index.tsx page</li>
                    <li>Connect it to your backend service of choice</li>
                    <li>The component will handle the rest</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Implementation Instructions</h3>
                  <p className="mb-2">To add the waitlist to your landing page:</p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Navigate to the implementation guide below</li>
                    <li>Choose which waitlist integration you prefer</li>
                    <li>Follow the simple implementation steps</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="testing">
          <h2 className="text-2xl font-bold mb-6">Testing & Launch Preparation</h2>
          
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Getting Ready for Testers</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg">1. Configure Demo Mode</h4>
                <p>Career BEAST MODE has a built-in demo mode that simulates all functionality without requiring real API connections. This is perfect for testing with your initial audience.</p>
                
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium">Demo Mode Features:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Simulated LinkedIn profile imports</li>
                    <li>Mock file uploads and document management</li>
                    <li>Pre-populated job listings and skills data</li>
                    <li>AI coaching chat simulation</li>
                  </ul>
                </div>
                
                <h4 className="font-medium text-lg">2. Set Up Analytics</h4>
                <p>Before sending to testers, add analytics to understand how users interact with your platform:</p>
                
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Create a Google Analytics account</li>
                  <li>Add your GA Measurement ID to the site configuration</li>
                  <li>Set up event tracking for key user actions</li>
                </ol>
                
                <h4 className="font-medium text-lg">3. Prepare Feedback Collection</h4>
                <p>Create a feedback form to collect structured user input:</p>
                
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use a tool like Google Forms or Typeform</li>
                  <li>Ask about specific features and the overall experience</li>
                  <li>Include both rating scales and open-ended questions</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Launching Your Test Version</h3>
              
              <div className="space-y-4">
                <p>To launch a test version of Career BEAST MODE:</p>
                
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Deploy to a hosting platform</span>
                    <p className="text-sm text-muted-foreground">Services like Netlify, Vercel, or GitHub Pages work well for React applications.</p>
                  </li>
                  <li>
                    <span className="font-medium">Configure a custom domain (optional)</span>
                    <p className="text-sm text-muted-foreground">A custom domain adds professionalism to your test site.</p>
                  </li>
                  <li>
                    <span className="font-medium">Set up password protection (recommended)</span>
                    <p className="text-sm text-muted-foreground">Limit access to invited testers only.</p>
                  </li>
                  <li>
                    <span className="font-medium">Create test accounts</span>
                    <p className="text-sm text-muted-foreground">Prepare login credentials for your testers.</p>
                  </li>
                </ol>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 text-green-800 mt-4">
                  <p className="font-medium">Quick Launch Recommendation:</p>
                  <p>For the fastest path to testing, use the built-in demo mode and deploy on Netlify or Vercel. Both platforms offer continuous deployment from GitHub and free hosting for projects like this.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Tester Onboarding Guide</h3>
              
              <div className="space-y-4">
                <p>Create a simple onboarding guide for your testers:</p>
                
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Welcome message and testing purpose</li>
                  <li>Login instructions</li>
                  <li>Key features to test</li>
                  <li>How to provide feedback</li>
                  <li>Known limitations (be upfront about what's simulated)</li>
                </ol>
                
                <div className="bg-muted p-4 rounded-md mt-2">
                  <p className="font-medium">Sample Tester Email:</p>
                  <pre className="text-sm mt-2">
                    {`Subject: You're invited to test Career BEAST MODE!

Hi [Name],

Thank you for agreeing to test Career BEAST MODE, our new career acceleration platform for mid-career professionals.

Access Details:
- URL: https://your-test-site.com
- Username: tester123
- Password: CareerTest2023

Key Features to Explore:
1. LinkedIn Profile Import (demo simulation)
2. Career Document Management
3. Job Matching
4. AI Career Coach

Please note this is a test version with simulated functionality.

Your feedback is invaluable! Please complete this short survey after testing: [Feedback Form Link]

If you encounter any issues, please email support@example.com.

Thank you!
[Your Name]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t mt-8 pt-8">
        <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>
        
        <div className="space-y-4">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Adding a Waitlist to Your Landing Page</h3>
            
            <p className="mb-4">Let's create a waitlist form that you can add to your landing page. We'll first need to create the waitlist component:</p>
            
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto mb-4">
              {`// src/components/WaitlistForm.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
        description: \`You're number \${randomPosition} in line. We'll notify you when it's your turn.\`,
      });
    }, 1500);
    
    // In production, replace with actual API call:
    // fetch('https://your-waitlist-api.com/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setPosition(data.position);
    //   setIsSubmitting(false);
    //   toast({ title: "Success!", description: data.message });
    // })
    // .catch(error => {
    //   setIsSubmitting(false);
    //   toast({ 
    //     title: "Error", 
    //     description: "There was a problem adding you to the waitlist.", 
    //     variant: "destructive" 
    //   });
    // });
  };

  return (
    <div className="border rounded-xl p-6 bg-card shadow-sm">
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
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
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

export default WaitlistForm;`}
            </pre>
            
            <p>To add this waitlist form to your landing page, update your Index.tsx file to include it in the Hero section:</p>
            
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
              {`// In your Index.tsx file, add this import:
import WaitlistForm from "@/components/WaitlistForm";

// Then in the Hero section, add the WaitlistForm component:
<section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="max-w-3xl">
        <div className="inline-block bg-primary/20 text-primary font-medium rounded-full px-4 py-1.5 mb-6">
          Your Career. Unleashed.
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Break Free From Career <span className="text-primary">Stagnation</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          All-in-one platform for professionals who want to accelerate their career growth without spending thousands on coaches and courses.
        </p>
        
        {/* Keep your existing buttons here */}
      </div>
      
      <div>
        <WaitlistForm />
      </div>
    </div>
    
    {/* Keep your existing stats section */}
  </div>
  
  {/* Background decoration */}
  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
</section>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
