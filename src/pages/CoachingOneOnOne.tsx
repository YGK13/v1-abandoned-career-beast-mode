
import React from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Star,
  Award,
  Check,
  User,
} from "lucide-react";

const CoachingOneOnOne = () => {
  const handleBookSession = (duration: string) => {
    // In a real app, this would open a calendar booking widget
    console.log(`Booking a ${duration} session`);
    // This would integrate with a scheduling API like Calendly
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">1:1 Coaching with Yuri Kruman</h1>
          <p className="text-muted-foreground mb-8">
            Personalized career and business coaching to accelerate your growth
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="col-span-full md:col-span-1">
              <DashboardCard className="sticky top-24">
                <div className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">Yuri Kruman</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    CEO & Career/Business Coach
                  </p>
                  
                  <div className="flex justify-center items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">5.0</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-left mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>10+ years coaching experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Former Fortune 500 HR Leader</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Startup Founder & Advisor</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mb-2"
                    onClick={() => handleBookSession("60min")}
                  >
                    Book a Session
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("/help", "_self")}
                  >
                    Have Questions?
                  </Button>
                </div>
              </DashboardCard>
            </div>

            <div className="col-span-full md:col-span-2">
              <Tabs defaultValue="sessions">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="sessions">Coaching Sessions</TabsTrigger>
                  <TabsTrigger value="expertise">Areas of Expertise</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="space-y-4">
                  <DashboardCard>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">60-Minute Strategy Session</h3>
                          <p className="text-muted-foreground text-sm">$299</p>
                        </div>
                      </div>
                      
                      <p className="mb-4">
                        A focused one-hour session to address specific career or business challenges. 
                        Perfect for tackling pressing issues that require expert guidance.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <Video className="w-3 h-3" />
                          <span>Zoom Meeting</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>Flexible Scheduling</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <MessageCircle className="w-3 h-3" />
                          <span>Follow-up Support</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleBookSession("60min")}
                      >
                        Book This Session
                      </Button>
                    </div>
                  </DashboardCard>
                  
                  <DashboardCard>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">90-Minute Deep Dive</h3>
                          <p className="text-muted-foreground text-sm">$449</p>
                        </div>
                      </div>
                      
                      <p className="mb-4">
                        A comprehensive session that allows time to explore complex challenges
                        in depth and develop detailed action plans for career or business growth.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <Video className="w-3 h-3" />
                          <span>Zoom Meeting</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>Flexible Scheduling</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/5 px-2 py-1 rounded-full">
                          <MessageCircle className="w-3 h-3" />
                          <span>Priority Support</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleBookSession("90min")}
                      >
                        Book This Session
                      </Button>
                    </div>
                  </DashboardCard>
                  
                  <DashboardCard>
                    <div className="p-6 bg-gradient-to-r from-primary/10 to-background">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Monthly Coaching Package</h3>
                          <p className="text-muted-foreground text-sm">$999/month</p>
                        </div>
                      </div>
                      
                      <p className="mb-4">
                        Ongoing support with weekly 45-minute sessions to ensure continuous 
                        progress towards your goals with structured accountability.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 text-xs bg-primary/10 px-2 py-1 rounded-full">
                          <Video className="w-3 h-3" />
                          <span>Weekly Sessions</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/10 px-2 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>Consistent Schedule</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-primary/10 px-2 py-1 rounded-full">
                          <MessageCircle className="w-3 h-3" />
                          <span>Unlimited Email Support</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleBookSession("monthly")}
                      >
                        Start Monthly Coaching
                      </Button>
                    </div>
                  </DashboardCard>
                </TabsContent>
                
                <TabsContent value="expertise">
                  <DashboardCard>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Career Development</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Career transitions and pivots</li>
                            <li>Leadership development</li>
                            <li>Salary negotiation strategies</li>
                            <li>Personal branding and networking</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Business Growth</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Business model development</li>
                            <li>Startup strategy and scaling</li>
                            <li>Product-market fit optimization</li>
                            <li>Team building and leadership</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Work-Life Integration</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Life design methodology</li>
                            <li>Stress management and burnout prevention</li>
                            <li>Productivity systems and habits</li>
                            <li>Purpose-driven career planning</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-6" 
                        onClick={() => handleBookSession("60min")}
                      >
                        Book a Session
                      </Button>
                    </div>
                  </DashboardCard>
                </TabsContent>
                
                <TabsContent value="testimonials">
                  <DashboardCard>
                    <div className="p-6 space-y-6">
                      <h3 className="text-xl font-bold mb-4">Client Testimonials</h3>
                      
                      <div className="border-l-4 border-primary/30 pl-4 py-1">
                        <p className="italic mb-2">
                          "Yuri's coaching transformed my approach to business leadership. 
                          His strategic insights helped me double my company's revenue in just 8 months."
                        </p>
                        <p className="text-sm font-semibold">- Sarah K., CEO & Founder</p>
                      </div>
                      
                      <div className="border-l-4 border-primary/30 pl-4 py-1">
                        <p className="italic mb-2">
                          "After feeling stuck in my career for years, one session with Yuri 
                          gave me the clarity I needed to make a successful transition to a new industry."
                        </p>
                        <p className="text-sm font-semibold">- Michael R., Marketing Director</p>
                      </div>
                      
                      <div className="border-l-4 border-primary/30 pl-4 py-1">
                        <p className="italic mb-2">
                          "The life design techniques Yuri taught me have completely changed 
                          how I balance my work and personal life. I'm more productive and happier than ever."
                        </p>
                        <p className="text-sm font-semibold">- Jennifer T., Software Engineer</p>
                      </div>
                      
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleBookSession("60min")}
                      >
                        Experience It Yourself
                      </Button>
                    </div>
                  </DashboardCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoachingOneOnOne;
