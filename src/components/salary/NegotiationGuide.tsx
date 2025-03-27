
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, MessageSquare, ArrowRight, Lightbulb, Award } from "lucide-react";

const NegotiationGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Salary & Title Negotiation Guide</span>
          </CardTitle>
          <CardDescription>
            Master the art of negotiation to maximize your compensation and advance your career
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="internal">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="internal">Internal Negotiation</TabsTrigger>
              <TabsTrigger value="external">New Job Negotiation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="internal" className="pt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preparation Strategies</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>Effective Approaches</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Document specific achievements with measurable impact</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Research market rates for your role and experience level</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Understand your company's promotion and raise cycles</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Identify how your work aligns with company priorities</span>
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-red-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-red-600">
                          <XCircle className="h-5 w-5" />
                          <span>Approaches to Avoid</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                          <span>Making demands based solely on personal financial needs</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                          <span>Comparing yourself directly to specific colleagues</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                          <span>Threatening to leave without a legitimate alternative</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                          <span>Negotiating at inappropriate times (company struggles)</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">The Conversation Framework</h3>
                  
                  <div className="space-y-4">
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">1. Opening the Conversation</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p className="italic">"I'd like to discuss my compensation and career progression based on my contributions over the past [time period]."</p>
                        <ul className="space-y-1 list-disc list-inside pl-1">
                          <li>Schedule a dedicated meeting for this discussion</li>
                          <li>Start with appreciation for the opportunity to discuss your growth</li>
                          <li>Frame the conversation around mutual benefit and value</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">2. Presenting Your Value</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p className="italic">"In the past year, I've [specific achievement] which resulted in [measurable outcome]. I've also taken on responsibilities beyond my current role, including [examples]."</p>
                        <ul className="space-y-1 list-disc list-inside pl-1">
                          <li>Present 3-5 concrete achievements with metrics</li>
                          <li>Highlight how you've exceeded expectations</li>
                          <li>Demonstrate growth in skills and responsibilities</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">3. Making Your Request</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p className="italic">"Based on my contributions and market research, I believe a [percentage/amount] increase in compensation would reflect my value. Additionally, I'd like to discuss advancing to [specific title]."</p>
                        <ul className="space-y-1 list-disc list-inside pl-1">
                          <li>Be specific about the salary increase you want</li>
                          <li>Provide context with market data</li>
                          <li>Clearly state your desired title change if applicable</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">4. Handling Responses</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p className="font-medium">If the answer is no:</p>
                        <p className="italic">"I understand there are constraints. What specific goals would I need to meet to receive this increase/promotion in the future? Can we create a development plan with clear milestones?"</p>
                        <p className="font-medium mt-2">If the answer is "maybe later":</p>
                        <p className="italic">"I appreciate your consideration. Could we set a specific time to revisit this discussion? What metrics would demonstrate I'm ready for this advancement?"</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pro Tip: Timing Is Everything</h4>
                      <p className="text-sm text-muted-foreground">
                        The best time to negotiate internally is after completing a significant project, 
                        exceeding targets, or taking on new responsibilities — not just at annual review time. 
                        Managers often have more flexibility with off-cycle adjustments when you've recently 
                        demonstrated exceptional value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="external" className="pt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">New Job Negotiation Strategy</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Pre-Offer Strategy</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Delay salary discussions</strong> until they're interested in hiring you ("I'd like to learn more about the role first")</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Research thoroughly</strong> - company pay bands, industry standards, and location factors</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>If asked for salary expectations</strong>, provide a range based on research, starting 10-15% above your target</span>
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Receiving the Offer</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Express enthusiasm</strong> but don't accept immediately ("I'm excited about this opportunity and appreciate the offer")</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Ask for time</strong> to review the complete package (2-3 days is reasonable)</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Request the offer in writing</strong> with all details (base salary, bonus, equity, benefits, etc.)</span>
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Negotiation Approach</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Negotiate the complete package</strong>, not just base salary (consider title, benefits, flexibility, bonus, equity)</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>Use a collaborative tone</strong>: "I'm excited to join the team. Based on my research and the value I'll bring, I was hoping for [X]."</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span><strong>If they can't meet salary requirements</strong>, explore alternatives like a signing bonus, performance review in 6 months, additional PTO, etc.</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">The Power of Multiple Offers</h4>
                      <p className="text-sm text-muted-foreground">
                        Having multiple job offers significantly strengthens your negotiating position. 
                        Even if you have a preferred employer, continue interviewing until you've secured 
                        at least one additional offer. You can then leverage these offers without being 
                        confrontational: "I've received another offer at [X] compensation, but I'm more 
                        excited about joining your team. Would you be able to match this figure?"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">What to Negotiate Beyond Salary</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border p-3 rounded-lg">
                      <h4 className="font-medium">Compensation Elements</h4>
                      <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                        <li>Signing bonus</li>
                        <li>Performance bonus structure</li>
                        <li>Equity/stock options</li>
                        <li>Relocation assistance</li>
                        <li>Student loan repayment</li>
                      </ul>
                    </div>
                    
                    <div className="border p-3 rounded-lg">
                      <h4 className="font-medium">Work-Life Balance</h4>
                      <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                        <li>Remote work flexibility</li>
                        <li>Additional paid time off</li>
                        <li>Flexible schedule</li>
                        <li>Sabbatical options</li>
                        <li>Wellness benefits</li>
                      </ul>
                    </div>
                    
                    <div className="border p-3 rounded-lg">
                      <h4 className="font-medium">Growth Opportunities</h4>
                      <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                        <li>Clear timeline for promotion</li>
                        <li>Professional development budget</li>
                        <li>Conference attendance</li>
                        <li>Training and certification</li>
                        <li>Mentorship program access</li>
                      </ul>
                    </div>
                    
                    <div className="border p-3 rounded-lg">
                      <h4 className="font-medium">Title & Responsibilities</h4>
                      <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                        <li>More senior title</li>
                        <li>Scope of responsibilities</li>
                        <li>Team leadership opportunities</li>
                        <li>Strategic project access</li>
                        <li>Reporting structure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Download Scripts
            </Button>
            <Button className="flex-1">
              Practice with AI Coach
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NegotiationGuide;
