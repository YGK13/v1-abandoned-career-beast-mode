
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WaitlistForm from "@/components/WaitlistForm";
import { FileText, Upload, Linkedin, AlertCircle, CheckCircle, Code, Settings, Server } from "lucide-react";

const FAQContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">FAQ & Setup Guide</h1>
      <p className="text-muted-foreground mb-8">
        Frequently asked questions and setup instructions for integration features.
      </p>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General FAQ</TabsTrigger>
          <TabsTrigger value="setup">Setup & Integration</TabsTrigger>
          <TabsTrigger value="waitlist">Join Waitlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about using Career BEAST MODE</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is">
                  <AccordionTrigger>What is Career BEAST MODE?</AccordionTrigger>
                  <AccordionContent>
                    Career BEAST MODE is an all-in-one platform for mid-career professionals who want to accelerate their career growth without spending thousands on coaches and courses. We provide tools for job searching, skill development, personal branding, networking, salary negotiation, and more.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="features">
                  <AccordionTrigger>What features does Career BEAST MODE offer?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AI-powered job matching and application tools</li>
                      <li>Career document and asset management</li>
                      <li>Skills development pathways</li>
                      <li>Networking support and strategies</li>
                      <li>Personal brand building</li>
                      <li>Salary negotiation guidance</li>
                      <li>Career coaching</li>
                      <li>Life design resources</li>
                      <li>Business building tools</li>
                      <li>Expertise monetization strategies</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="pricing">
                  <AccordionTrigger>How much does Career BEAST MODE cost?</AccordionTrigger>
                  <AccordionContent>
                    Career BEAST MODE offers multiple pricing tiers to fit different needs and budgets. We offer a free tier with limited features, as well as Premium ($19/month) and Professional ($49/month) plans with more advanced features. All paid plans come with a 7-day free trial. See the Pricing page for more details.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="compared">
                  <AccordionTrigger>How does Career BEAST MODE compare to hiring a career coach?</AccordionTrigger>
                  <AccordionContent>
                    Career BEAST MODE provides many of the benefits of working with a career coach at a fraction of the cost. While a good career coach can charge $150-$300 per hour (often requiring a package of 10+ sessions for $1,500-$3,000+), Career BEAST MODE gives you access to expert guidance, tools, and resources for as little as $19 per month. We also offer the option to connect with human coaches for those who want personalized 1:1 guidance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="time">
                  <AccordionTrigger>How much time do I need to invest to see results?</AccordionTrigger>
                  <AccordionContent>
                    Career BEAST MODE is designed for busy professionals. You can start seeing results with as little as 15-30 minutes per day, 2-3 days per week. The platform is designed to help you focus on high-impact activities that will move your career forward without overwhelming you.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cancel">
                  <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="support">
                  <AccordionTrigger>How can I get support if I have questions?</AccordionTrigger>
                  <AccordionContent>
                    We offer multiple support channels. You can access our knowledge base, submit a support ticket, or join our community forum to get answers from our team and other members. Premium and Professional subscribers also have access to priority support.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="setup">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="text-blue-600" /> LinkedIn Integration
                </CardTitle>
                <CardDescription>How to connect your LinkedIn account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Integration Status</AlertTitle>
                  <AlertDescription>
                    The LinkedIn API integration is in developer preview. Follow these steps to test the feature:
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4 mt-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <Settings size={18} /> Developer Setup
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Go to <a href="https://www.linkedin.com/developers/apps/new" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Developer Portal</a> and create a new app</li>
                      <li>Set the redirect URL to: <code className="bg-background p-1 rounded text-sm">{window.location.origin}/auth/linkedin/callback</code></li>
                      <li>Under "Products", request access to "Sign In with LinkedIn" and "Marketing Developer Platform"</li>
                      <li>Copy your Client ID and Client Secret</li>
                      <li>In your environment settings, set <code className="bg-background p-1 rounded text-sm">LINKEDIN_CLIENT_ID</code> and <code className="bg-background p-1 rounded text-sm">LINKEDIN_CLIENT_SECRET</code></li>
                    </ol>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <Code size={18} /> Integration Code Snippet
                    </h3>
                    <pre className="bg-background p-3 rounded-md overflow-x-auto text-sm">
                      {`// Server-side code (Node.js example)
const express = require('express');
const { LinkedInClient } = require('linkedin-api-client');

const app = express();
const linkedInClient = new LinkedInClient({
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUrl: '${window.location.origin}/auth/linkedin/callback'
});

app.get('/auth/linkedin', (req, res) => {
  const authUrl = linkedInClient.getAuthorizationUrl([
    'r_liteprofile',
    'r_emailaddress',
    'w_member_social'
  ]);
  res.redirect(authUrl);
});

app.get('/auth/linkedin/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await linkedInClient.getAccessToken(code);
    // Store token and redirect to application
    res.redirect('/career-docs?linkedin=connected');
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.redirect('/career-docs?linkedin=error');
  }
});`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="text-green-600" /> Document Upload
                </CardTitle>
                <CardDescription>Configure the document upload functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Integration Status</AlertTitle>
                  <AlertDescription>
                    The document upload functionality requires storage configuration. Follow these steps to enable it:
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4 mt-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <Server size={18} /> Storage Setup
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Create an AWS S3 bucket or similar storage solution</li>
                      <li>Configure CORS settings to allow uploads from your domain</li>
                      <li>Set the following environment variables:
                        <ul className="list-disc pl-6 mt-2">
                          <li><code className="bg-background p-1 rounded text-sm">STORAGE_TYPE=s3</code></li>
                          <li><code className="bg-background p-1 rounded text-sm">S3_BUCKET_NAME=your-bucket-name</code></li>
                          <li><code className="bg-background p-1 rounded text-sm">S3_REGION=your-bucket-region</code></li>
                          <li><code className="bg-background p-1 rounded text-sm">AWS_ACCESS_KEY_ID=your-access-key</code></li>
                          <li><code className="bg-background p-1 rounded text-sm">AWS_SECRET_ACCESS_KEY=your-secret-key</code></li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <FileText size={18} /> Document Processing
                    </h3>
                    <p className="mb-3">
                      To enable PDF parsing and document analysis, you'll need to set up the following:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Install PDF processing libraries on your server:
                        <pre className="bg-background p-2 rounded-md mt-1 overflow-x-auto text-sm">
                          npm install pdf-parse @azure/ai-form-recognizer
                        </pre>
                      </li>
                      <li>For advanced document analysis, set up Azure Form Recognizer:
                        <ul className="list-disc pl-6 mt-2">
                          <li>Create an Azure Form Recognizer resource</li>
                          <li>Set environment variables:
                            <pre className="bg-background p-2 rounded-md mt-1 overflow-x-auto text-sm">
                              FORM_RECOGNIZER_ENDPOINT=your-endpoint
                              FORM_RECOGNIZER_API_KEY=your-api-key
                            </pre>
                          </li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-primary" /> Testing Integration
                </CardTitle>
                <CardDescription>Verify your integrations are working properly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    After configuring the integrations, use these steps to verify they're working correctly:
                  </p>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">LinkedIn Integration Test</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Navigate to the Career Assets page</li>
                      <li>Click "Connect with LinkedIn"</li>
                      <li>Complete the OAuth flow</li>
                      <li>You should be redirected back with your profile information displayed</li>
                      <li>Try posting an update to test the social sharing functionality</li>
                    </ol>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Document Upload Test</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Go to the Documents page</li>
                      <li>Click "Upload Document"</li>
                      <li>Select a PDF or Word document</li>
                      <li>The document should upload and generate a preview</li>
                      <li>Check the console logs for any errors during processing</li>
                    </ol>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Need Help?</AlertTitle>
                    <AlertDescription>
                      If you encounter issues, check the browser console for errors and verify your environment variables are set correctly. For more assistance, contact our support team.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="default">
                      Run Integration Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="waitlist">
          <Card>
            <CardHeader>
              <CardTitle>Join the Waitlist</CardTitle>
              <CardDescription>Be among the first to access Career BEAST MODE when we launch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <WaitlistForm />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FAQContent;
