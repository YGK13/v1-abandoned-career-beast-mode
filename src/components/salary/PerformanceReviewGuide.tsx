
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, ArrowRight, Lightbulb, AlertCircle, BookOpen } from "lucide-react";

const PerformanceReviewGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Performance Review Success Guide</span>
          </CardTitle>
          <CardDescription>
            Master your performance review to maximize your chances of promotion and salary increases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="before">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="before">Before the Review</TabsTrigger>
              <TabsTrigger value="during">During the Review</TabsTrigger>
              <TabsTrigger value="after">After the Review</TabsTrigger>
            </TabsList>
            <TabsContent value="before" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Preparation Checklist</span>
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Document Your Achievements
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Create a comprehensive list of accomplishments since your last review</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Quantify your impact using metrics whenever possible (revenue generated, time saved, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Include examples of how you've demonstrated company values</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base">
                    Research Compensation Trends
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Research current market rates for your role using our Salary Calculator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Gather data from industry salary surveys and job postings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Network with peers to understand typical compensation ranges</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base">
                    Understand Promotion Criteria
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Review your company's documented promotion criteria for your target level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Identify any skill gaps you need to address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Speak with recently promoted colleagues to understand the process</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base">
                    Gather Feedback from Others
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Ask peers, cross-functional partners, and direct reports (if applicable) for specific feedback</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Collect testimonials that highlight your strengths and contributions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Identify common themes in the feedback to address during your review</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="p-4 bg-muted/50 rounded-lg mt-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule a pre-review meeting with your manager 2-3 weeks before your formal review to discuss your 
                      accomplishments and get early feedback. This gives them time to advocate for you in calibration meetings.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="during" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>During the Review Strategies</span>
              </h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Present Your Achievements Effectively</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Start with your biggest accomplishments that had measurable impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Use the STAR method (Situation, Task, Action, Result) for clarity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Connect your achievements to company goals and values</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Active Listening and Response</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Take notes during feedback to show you value the input</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Ask clarifying questions about ambiguous feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Acknowledge constructive criticism professionally</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Discuss Compensation and Growth</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Present your market research to support your compensation request</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Be specific about the salary increase or promotion you're seeking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Express enthusiasm about taking on additional responsibilities</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Common Pitfalls to Avoid</h4>
                    <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                      <li>Being defensive when receiving constructive feedback</li>
                      <li>Focusing only on recent achievements (recency bias)</li>
                      <li>Making compensation the primary focus of the conversation</li>
                      <li>Not having specific examples ready to support your points</li>
                      <li>Comparing yourself directly to colleagues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="after" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Follow-Up Strategies</span>
              </h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Create an Action Plan</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Document the feedback and create specific improvement goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Set SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Identify resources or support needed to achieve your goals</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Follow Up on Compensation Discussions</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Send a thank-you email summarizing key points from the review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Schedule a follow-up meeting if decisions were deferred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Ask for specific milestones required for your desired compensation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Request Regular Check-Ins</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Establish quarterly progress discussions with your manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Use these meetings to highlight ongoing achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Seek feedback on your progress toward promotion criteria</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg mt-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Continuous Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      The best performance reviews are built over time, not just prepared for once a year. 
                      Maintain a "success journal" to track your achievements, feedback received, and skills developed 
                      throughout the year. This makes preparation for your next review significantly easier.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Download Template
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

export default PerformanceReviewGuide;
