
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download,
  FileText, 
  HelpCircle,
  Info,
  Link, 
  MessageSquare, 
  Settings,
  Users,
  Book,
  Camera,
  Briefcase,
  CreditCard,
} from "lucide-react";

const HelpContent = () => {
  // Function to handle downloading the admin guide as PDF
  const handleDownloadAdminGuide = () => {
    // Create a link to download the PDF file
    const a = document.createElement('a');
    a.href = '/BEAST_MODE_Admin_Guide.pdf';
    a.download = 'BEAST_MODE_Admin_Guide.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-left">Help Center</h1>
      <p className="text-muted-foreground mb-8 text-left">
        Find answers to common questions and learn how to make the most of Career BEAST MODE
      </p>

      <div className="mb-8 text-left">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleDownloadAdminGuide}
        >
          <Download size={16} />
          <span>Download Platform Admin Guide (PDF)</span>
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Setup instructions for developers and backend administrators
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="account">Account & Billing</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-left">
                  <Info className="h-5 w-5 text-primary" />
                  New User Guide
                </CardTitle>
                <CardDescription className="text-left">
                  Everything you need to know to get started with Career BEAST MODE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium flex items-center gap-2">
                    <HelpCircle size={18} />
                    What is Career BEAST MODE?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Career BEAST MODE is an all-in-one platform for mid-career professionals who want to accelerate 
                    their career growth without spending thousands on coaches and courses. We provide tools for job 
                    searching, skill development, personal branding, networking, salary negotiation, and more.
                  </p>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium flex items-center gap-2">
                    <Users size={18} />
                    Creating Your Account
                  </h3>
                  <ol className="list-decimal pl-5 text-sm space-y-1 mt-2">
                    <li>Click the "Sign Up" button in the top-right corner</li>
                    <li>Enter your email address and create a password</li>
                    <li>Verify your email address by clicking the link sent to your inbox</li>
                    <li>Complete your profile with basic information</li>
                    <li>Take the career assessment to personalize your experience</li>
                  </ol>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium flex items-center gap-2">
                    <Book size={18} />
                    Taking the Career Assessment
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    The career assessment helps us personalize your experience. It takes about 10-15 minutes 
                    and asks questions about your:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                    <li>Current career situation</li>
                    <li>Skills and expertise</li>
                    <li>Career goals and aspirations</li>
                    <li>Work preferences and values</li>
                    <li>Challenges you're facing</li>
                  </ul>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium flex items-center gap-2">
                    <Briefcase size={18} />
                    Uploading Your Career Documents
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    To get the most out of Career BEAST MODE, upload your resume, LinkedIn profile, and other career assets:
                  </p>
                  <ol className="list-decimal pl-5 text-sm space-y-1 mt-2">
                    <li>Navigate to the "Career Assets" page</li>
                    <li>Click "Upload Document" or "Connect LinkedIn"</li>
                    <li>Follow the prompts to upload or connect your accounts</li>
                    <li>Our system will analyze your documents and provide personalized recommendations</li>
                  </ol>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings size={18} />
                    Personalizing Your Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Customize your dashboard to focus on what matters most to you:
                  </p>
                  <ol className="list-decimal pl-5 text-sm space-y-1 mt-2">
                    <li>Click the "Customize" button on your dashboard</li>
                    <li>Drag and drop widgets to rearrange them</li>
                    <li>Add or remove sections based on your priorities</li>
                    <li>Set goals for each section</li>
                    <li>Save your preferences</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-left">
                  <Camera className="h-5 w-5 text-primary" />
                  Video Tutorials
                </CardTitle>
                <CardDescription className="text-left">
                  Watch these tutorial videos to quickly learn how to use the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium mb-2">Platform Overview (5:23)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    A comprehensive walkthrough of all the features available in Career BEAST MODE.
                  </p>
                  <Button variant="outline" className="w-full">Watch Video</Button>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium mb-2">Job Search Mastery (7:12)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn how to use our job search tools, including AI matching and application tracking.
                  </p>
                  <Button variant="outline" className="w-full">Watch Video</Button>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium mb-2">Career Document Optimization (6:45)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    See how to upload, analyze, and optimize your resume and LinkedIn profile.
                  </p>
                  <Button variant="outline" className="w-full">Watch Video</Button>
                </div>

                <div className="border rounded-md p-4 bg-background text-left">
                  <h3 className="font-medium mb-2">Networking Tools (4:58)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Discover how to expand your professional network using our intelligent networking tools.
                  </p>
                  <Button variant="outline" className="w-full">Watch Video</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-left">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Job Search Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-left">
                  Our career tools help you find and land your dream job.
                </p>
                <div className="space-y-3 text-left">
                  <div className="border-b pb-2">
                    <h3 className="font-medium">AI Job Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      Our system analyzes your skills and experience to match you with relevant job openings, saving you hours of searching.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Resume Tailoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically customize your resume for each job application to increase your chances of getting an interview.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Application Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep track of all your job applications, interviews, and follow-ups in one organized dashboard.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Off-Market Jobs</h3>
                    <p className="text-sm text-muted-foreground">
                      Access our database of unadvertised job opportunities through our network of partner companies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-left">
                  <FileText className="h-5 w-5 text-primary" />
                  Career Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-left">
                  Tools to optimize your professional documents and online presence.
                </p>
                <div className="space-y-3 text-left">
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Document Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get AI-powered feedback on your resume, cover letter, and other career documents to identify areas for improvement.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">LinkedIn Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect your LinkedIn profile to receive suggestions for boosting your visibility and attracting recruiters.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Content Templates</h3>
                    <p className="text-sm text-muted-foreground">
                      Access professional templates for resumes, cover letters, thank-you notes, and other career documents.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Document Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Securely store and organize all your career documents in one centralized location.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-left">
                  <Users className="h-5 w-5 text-primary" />
                  Networking Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-left">
                  Expand your professional network strategically.
                </p>
                <div className="space-y-3 text-left">
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Connection Suggestions</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized recommendations for people you should connect with based on your career goals.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Networking Scripts</h3>
                    <p className="text-sm text-muted-foreground">
                      Access templates for outreach messages, follow-ups, and informational interview requests.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Group Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover professional groups, communities, and events relevant to your industry and interests.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Relationship Tracker</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep track of your networking activities and follow up at the right times to maintain connections.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-left">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Coaching & Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-left">
                  Get expert advice and personalized career guidance.
                </p>
                <div className="space-y-3 text-left">
                  <div className="border-b pb-2">
                    <h3 className="font-medium">AI Career Coach</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat with our AI career coach to get answers to your career questions 24/7.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Career Development Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive a personalized roadmap for achieving your career goals with actionable steps.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Skill Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify your strengths and skill gaps with our comprehensive assessment tools.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Book one-on-one sessions with career coaches, industry experts, and hiring managers (Premium feature).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-left">
                <CreditCard className="h-5 w-5 text-primary" />
                Account & Billing
              </CardTitle>
              <CardDescription className="text-left">
                Manage your subscription, payment methods, and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I change my subscription plan?</h3>
                <p className="text-sm text-muted-foreground">
                  To change your subscription, go to Settings &gt; Billing &gt; Subscription and click "Change Plan." 
                  From there, you can select a different plan that better suits your needs. Changes to a lower-tier 
                  plan will take effect at the end of your current billing cycle, while upgrades are applied immediately.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I update my payment method?</h3>
                <p className="text-sm text-muted-foreground">
                  To update your payment information, navigate to Settings &gt; Billing &gt; Payment Methods. 
                  Click "Add Payment Method" to add a new card or bank account, or select an existing payment method 
                  and click "Edit" to update its details. You can also select a different default payment method.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I cancel my subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  To cancel your subscription, go to Settings &gt; Billing &gt; Subscription and click "Cancel Subscription." 
                  You'll be asked to provide a reason for canceling and may be offered alternative options. 
                  After confirming cancellation, you'll continue to have access until the end of your current billing period.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Can I get a refund?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee for new subscribers. If you're not satisfied with Career BEAST MODE 
                  within the first 30 days, contact our support team for a full refund. After 30 days, we generally don't 
                  provide refunds for unused subscription time, but we may make exceptions in certain circumstances.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">How do I download my billing history and receipts?</h3>
                <p className="text-sm text-muted-foreground">
                  To access your billing history, go to Settings &gt; Billing &gt; Billing History. 
                  From there, you can view all past transactions and download individual receipts 
                  by clicking the "Download" button next to each transaction.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Is my payment information secure?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes. We use Stripe, a PCI-compliant payment processor, to handle all financial transactions. 
                  Your payment details are never stored on our servers. All payment information is encrypted 
                  and securely transmitted using industry-standard SSL technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-left">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact Support
                </CardTitle>
                <CardDescription className="text-left">
                  Get help from our customer support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Customer Support Hours</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our support team is available Monday through Friday, 9am-5pm ET.
                  </p>
                  <p className="text-sm">Email: support@careerbeastmode.com</p>
                  <p className="text-sm">Average response time: within 24 hours</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Submit a Support Ticket</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    For fastest service, submit a support ticket with details about your issue.
                  </p>
                  <Button className="w-full">Open Support Ticket</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Live Chat Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Premium and Professional plan members have access to live chat support.
                  </p>
                  <Button variant="outline" className="w-full">Start Live Chat</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-left">
                  <Link className="h-5 w-5 text-primary" />
                  Additional Resources
                </CardTitle>
                <CardDescription className="text-left">
                  Find more help with these resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Browse our comprehensive collection of articles, tutorials, and FAQs.
                  </p>
                  <Button variant="outline" className="w-full">Visit Knowledge Base</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with other users, share tips, and get answers from the community.
                  </p>
                  <Button variant="outline" className="w-full">Join Community Forum</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Upcoming Webinars</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join our free training webinars to learn more about using the platform.
                  </p>
                  <Button variant="outline" className="w-full">View Webinar Schedule</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Request a Feature</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Have an idea for improving Career BEAST MODE? Let us know!
                  </p>
                  <Button variant="outline" className="w-full">Submit Feature Request</Button>
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
