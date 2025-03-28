
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CreditCard, 
  FileText, 
  Link, 
  Megaphone, 
  PenTool, 
  Server, 
  Settings2, 
  Wallet, 
  Wrench 
} from "lucide-react";

const HelpContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Help Center</h1>
      <p className="text-muted-foreground mb-8">
        Guides, tutorials, and FAQs to help you make the most of Beast Mode Career
      </p>

      <Tabs defaultValue="launch-guide" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="launch-guide">Launch Guide</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="launch-guide">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  Comprehensive Launch Guide
                </CardTitle>
                <CardDescription>
                  Everything you need to know to prepare for launching your Beast Mode Career platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">Platform Selection for Backend Management</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">1. Supabase for Database & Backend</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Supabase provides a complete solution for your backend needs including database, authentication, storage, and serverless functions.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Visit <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase.com</a> to create an account</li>
                        <li>Create a new project (free tier available)</li>
                        <li>Use the UI to create tables for users, content, and other data</li>
                        <li>Connect to your Lovable app using the provided connection strings</li>
                        <li>Makes backend management possible without coding</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">2. Stripe for Payments</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Stripe handles all your payment processing, subscription management, and invoicing.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Sign up at <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe.com</a></li>
                        <li>Set up your account with business details</li>
                        <li>Create products and pricing plans in the Stripe dashboard</li>
                        <li>Connect Stripe to Supabase using webhook functions</li>
                        <li>Test payments using Stripe's test mode before going live</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">3. Zapier for Integrations & Automation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Zapier connects your app with 5,000+ other services without requiring any code.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Create an account at <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Zapier.com</a></li>
                        <li>Connect your email service (Gmail, Outlook, etc.)</li>
                        <li>Set up "Zaps" to automate workflows like:</li>
                        <li>Sending welcome emails when users sign up</li>
                        <li>Adding subscribers to your email marketing list</li>
                        <li>Notifying your team of new sales</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">4. Vercel/Netlify for Hosting & Deployment</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        These platforms provide easy deployment, hosting, and domain management.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Create an account at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel.com</a> or <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Netlify.com</a></li>
                        <li>Connect to your code repository (GitHub, GitLab, etc.)</li>
                        <li>Configure your domain and SSL certificate</li>
                        <li>Set up environment variables for API keys</li>
                        <li>Enjoy automatic deployments when you update your code</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Launch Preparation Checklist</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Branding & Design</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Finalize logo and brand colors</li>
                        <li>Prepare brand assets (icons, images, illustrations)</li>
                        <li>Create style guide for consistent visual identity</li>
                        <li>Design marketing materials (social graphics, banners)</li>
                        <li>Optimize all images for web performance</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Content & Copywriting</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Write compelling headlines and page copy</li>
                        <li>Develop clear value propositions</li>
                        <li>Create FAQs and help documentation</li>
                        <li>Prepare email templates (welcome, confirmation, etc.)</li>
                        <li>Draft privacy policy and terms of service</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Technical Setup</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Set up domain name and SSL certificate</li>
                        <li>Configure Supabase database and authentication</li>
                        <li>Integrate Stripe payment processing</li>
                        <li>Set up analytics (Google Analytics, Plausible, etc.)</li>
                        <li>Configure proper redirects and error pages</li>
                        <li>Implement basic SEO (meta tags, sitemaps)</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Testing & Quality Assurance</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Test all forms and user flows</li>
                        <li>Verify payment processing works (test transactions)</li>
                        <li>Check responsiveness on mobile devices</li>
                        <li>Test load times and performance</li>
                        <li>Conduct user testing with your target audience</li>
                        <li>Check for broken links and accessibility issues</li>
                      </ul>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Launch & Marketing</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Prepare launch announcement emails</li>
                        <li>Set up social media campaigns</li>
                        <li>Create content calendar for post-launch</li>
                        <li>Configure email marketing automation</li>
                        <li>Prepare press releases or media outreach</li>
                        <li>Set up referral or affiliate programs</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Recommended API Integration Approach</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">LinkedIn API Integration</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        LinkedIn has strict API access requirements for marketing and data access.
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>Apply for LinkedIn Developer Program at <a href="https://developer.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">developer.linkedin.com</a></li>
                        <li>Create a LinkedIn app in their developer portal</li>
                        <li>Request specific permissions (r_liteprofile, r_emailaddress)</li>
                        <li>Implement OAuth flow using Supabase Edge Functions</li>
                        <li>Store tokens securely in Supabase</li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Non-coder alternative:</strong> Use Zapier's LinkedIn integrations to connect with LinkedIn without direct API access
                      </p>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">File Upload Functionality</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Implement file uploads using Supabase Storage.
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>Create a Supabase Storage bucket for user uploads</li>
                        <li>Set appropriate permissions (authenticated users can upload)</li>
                        <li>Use the provided UI components to create upload forms</li>
                        <li>Configure file type restrictions and size limits</li>
                        <li>Set up proper error handling and progress indicators</li>
                      </ol>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Email Integration</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Set up reliable email delivery for notifications and marketing.
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>Create an account with an email service provider like:</li>
                        <li><a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Resend</a> - Developer-friendly email API</li>
                        <li><a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mailchimp</a> - Full email marketing platform</li>
                        <li>Integrate with your app via Supabase Edge Functions</li>
                        <li>Create email templates for various notifications</li>
                        <li>Set up automated emails for user onboarding and engagement</li>
                      </ol>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">Waitlist Management</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Implement a waitlist system for early access.
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>Use Supabase to store waitlist sign-ups</li>
                        <li>Create a simple form to collect email and name</li>
                        <li>Set up automated confirmation emails</li>
                        <li>Implement a mechanism to track referrals</li>
                        <li>Create a dashboard to manage and invite users</li>
                      </ol>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  API Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with third-party services to enhance your platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">LinkedIn API Setup Guide</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Google APIs Integration</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Email Service Providers</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up and manage payment systems for your platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Stripe Integration Guide</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Subscription Management</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Payment Gateway Comparison</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage and organize your content efficiently.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Supabase Content Management</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">File Upload Configuration</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Content Delivery Networks</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Branding & Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Customize your platform's appearance and branding.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Brand Asset Management</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Theme Customization</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <a href="#" className="text-sm hover:underline">Landing Page Optimization</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about using and managing the Beast Mode Career platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I connect my domain to the platform?</h3>
                <p className="text-sm text-muted-foreground">
                  Purchase a domain from a registrar like Namecheap or GoDaddy, then connect it to your hosting provider 
                  (Vercel/Netlify) by updating your DNS settings. Detailed instructions are provided by each hosting provider.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I set up user authentication?</h3>
                <p className="text-sm text-muted-foreground">
                  Use Supabase Authentication to set up email/password login, social logins (Google, GitHub, etc.), 
                  and magic link authentication. The Supabase dashboard provides a simple interface for configuring these options.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I process payments and set up subscriptions?</h3>
                <p className="text-sm text-muted-foreground">
                  Create a Stripe account, set up your products and pricing plans in the Stripe dashboard, then integrate 
                  Stripe with your application using Supabase Edge Functions or Zapier. We recommend using Stripe Checkout 
                  for a secure, pre-built checkout experience.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I backup my data?</h3>
                <p className="text-sm text-muted-foreground">
                  Supabase provides automated backups of your database. You can also manually export your data from the 
                  Supabase dashboard at any time. For additional peace of mind, set up a scheduled backup using a Supabase 
                  Edge Function or a third-party service.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I update content on my site?</h3>
                <p className="text-sm text-muted-foreground">
                  We recommend using the Supabase dashboard to directly edit content in your database tables. For more complex 
                  content management, consider using a headless CMS like Contentful or Sanity that can be integrated with your application.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">How do I monitor site performance and user activity?</h3>
                <p className="text-sm text-muted-foreground">
                  Integrate Google Analytics or Plausible Analytics for website traffic and user behavior. For application 
                  performance, use Vercel or Netlify's built-in analytics. For more detailed insights, consider tools like 
                  LogRocket or Sentry.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Technical Support
                </CardTitle>
                <CardDescription>
                  Get help with technical issues and platform management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Contact Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our technical support team is available Monday through Friday, 9am-5pm ET.
                  </p>
                  <p className="text-sm">Email: support@beastmodecareer.com</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Documentation Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">Platform Documentation</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">API Reference</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">Tutorials & Guides</a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage your account settings and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Billing Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    For questions about billing, subscriptions, or payments.
                  </p>
                  <p className="text-sm">Email: billing@beastmodecareer.com</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Account Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">Manage Subscription</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">Billing History</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-primary" />
                      <a href="#" className="text-sm hover:underline">Update Payment Method</a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpContent;
