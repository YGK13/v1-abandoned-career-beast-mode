
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp, Briefcase, Building, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const LateralMoveAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("when");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Strategic Lateral Moves</span>
          </CardTitle>
          <CardDescription>
            When and how to make lateral career moves to accelerate your salary and title growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="when">When to Move</TabsTrigger>
              <TabsTrigger value="how">How to Move</TabsTrigger>
              <TabsTrigger value="benefits">Growth Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="when" className="pt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Key Indicators It's Time for a Move</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Compensation Stagnation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>You've received minimal raises (less than 3-5%) for 2+ years despite strong performance.</p>
                      <div className="pt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Typical Internal Growth</span>
                          <span>3-5% yearly</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="pt-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Typical External Move</span>
                          <span>15-30% increase</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Limited Growth Opportunity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>Your path to promotion is blocked by organizational structure or slow growth.</p>
                      <ul className="space-y-1 pt-1">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Next level position rarely opens up</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Multiple peers competing for the same promotion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>You've outgrown your current role's challenges</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Skill Development Plateau</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>You're no longer learning new skills or being challenged in your current role.</p>
                      <ul className="space-y-1 pt-1">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Work has become routine with few new challenges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Limited exposure to new technologies or methodologies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                          <span>Lack of mentorship from more experienced professionals</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Market Value Mismatch</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                      <p>Your skills are worth significantly more in the current job market than your compensation reflects.</p>
                      <div className="border p-2 rounded-md mt-2 space-y-1">
                        <p className="text-xs font-medium">Signs of Market Value Mismatch:</p>
                        <ul className="space-y-1 text-xs">
                          <li className="flex items-start gap-1">
                            <ArrowRight className="h-3 w-3 shrink-0 mt-0.5 text-green-600" />
                            <span>You're regularly contacted by recruiters</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <ArrowRight className="h-3 w-3 shrink-0 mt-0.5 text-green-600" />
                            <span>New hires with similar qualifications are paid more</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <ArrowRight className="h-3 w-3 shrink-0 mt-0.5 text-green-600" />
                            <span>Your skills are in high demand in job postings</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Optimal Timing for Job Changes</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="h-7 w-7 rounded-full flex items-center justify-center p-0">1</Badge>
                      <div>
                        <p className="font-medium">Stay 1.5-3 years in each position</p>
                        <p className="text-muted-foreground">This shows stability while maximizing growth opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="h-7 w-7 rounded-full flex items-center justify-center p-0">2</Badge>
                      <div>
                        <p className="font-medium">After completing major projects or milestones</p>
                        <p className="text-muted-foreground">This provides concrete achievements for your resume</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="h-7 w-7 rounded-full flex items-center justify-center p-0">3</Badge>
                      <div>
                        <p className="font-medium">During industry growth periods</p>
                        <p className="text-muted-foreground">When your skills are in highest demand and companies compete for talent</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="h-7 w-7 rounded-full flex items-center justify-center p-0">4</Badge>
                      <div>
                        <p className="font-medium">After developing specialized or emerging skills</p>
                        <p className="text-muted-foreground">Newly acquired in-demand skills command higher compensation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="how" className="pt-4 space-y-4">
              <h3 className="text-lg font-medium">Strategic Approach to Lateral Moves</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span>Prepare While Employed</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Start your job search while still employed to negotiate from a position of strength.</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Actions:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Update your resume to highlight quantifiable achievements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Refresh your LinkedIn profile with current accomplishments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Network strategically with contacts at target companies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Research market rates and desired companies thoroughly</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md text-muted-foreground">
                      <p className="font-medium">Pro Tip:</p>
                      <p>Schedule interviews during lunch hours, early mornings, or late afternoons to minimize disruption to your current job.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      <span>Target High-Growth Companies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Choose companies where you can grow faster than in your current role.</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Look for:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Companies growing 20%+ annually (more opportunities open up)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Organizations with recent funding or expansion plans</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Flat hierarchies where impact is more visible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Companies with clear promotion paths and growth frameworks</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="border rounded-md p-2">
                        <p className="font-medium text-xs">Research Points:</p>
                        <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                          <li>Promotion timelines</li>
                          <li>Employee retention rates</li>
                          <li>Glassdoor reviews</li>
                        </ul>
                      </div>
                      <div className="border rounded-md p-2">
                        <p className="font-medium text-xs">Interview Questions:</p>
                        <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                          <li>"How do you measure performance?"</li>
                          <li>"What's the typical career path?"</li>
                          <li>"How often do you promote from within?"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span>Negotiate for Growth</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Focus on both immediate gains and future growth potential in your negotiations.</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Negotiation Points:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Request a 15-30% salary increase over your current compensation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Negotiate for a title that reflects where you want to be, not just where you are</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Establish clear expectations about performance review timelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                          <span>Secure commitments for professional development opportunities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md text-muted-foreground">
                      <p className="font-medium">Sample Script:</p>
                      <p className="italic">"Based on my experience and the value I'll bring to this role, I'm looking for a base salary in the range of [X-Y]. I'm also interested in understanding the typical timeline for performance reviews and advancement opportunities."</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="pt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">The Growth Impact of Strategic Moves</h3>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Compensation Growth Comparison</CardTitle>
                    <CardDescription>Strategic job changes vs. staying at one company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end space-x-2">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex flex-col space-y-1">
                          <div className="bg-primary/20 w-16 h-8"></div>
                          <div className="bg-primary/30 w-16 h-12"></div>
                          <div className="bg-primary/40 w-16 h-16"></div>
                          <div className="bg-primary/50 w-16 h-20"></div>
                          <div className="bg-primary/60 w-16 h-28"></div>
                        </div>
                        <span className="text-sm font-medium">Internal Path</span>
                        <span className="text-xs text-muted-foreground">+35-45% over 5 years</span>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex flex-col space-y-1">
                          <div className="bg-primary/20 w-16 h-8"></div>
                          <div className="bg-primary/40 w-16 h-24"></div>
                          <div className="bg-primary/60 w-16 h-32"></div>
                          <div className="bg-primary/80 w-16 h-42"></div>
                        </div>
                        <span className="text-sm font-medium">Strategic Moves</span>
                        <span className="text-xs text-muted-foreground">+60-100% over 5 years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Title Progression Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Internal Path:</p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Typically 3-5 years between major promotions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Must wait for positions to open up</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Often limited by existing organization structure</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium">Strategic Moves:</p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Can leap to higher titles with each move</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Potential to skip entire levels in hierarchy</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Average of 1.5-2 years per significant title change</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Skill Development Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Internal Path:</p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Deep expertise in one company's systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Limited exposure to different methods/technologies</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Risk of developing company-specific skills only</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium">Strategic Moves:</p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Broader skill set from diverse environments</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Exposure to different methodologies and technologies</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>More adaptable to industry changes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>Broader professional network</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Finding the Right Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-3">
                      While strategic moves accelerate growth, excessive job-hopping (less than 1 year per role) can raise red flags.
                      The optimal approach combines periods of strategic movement with periods of stability.
                    </p>
                    
                    <div className="p-3 bg-muted rounded-md text-muted-foreground">
                      <p className="font-medium">Recommended Pattern:</p>
                      <ul className="mt-1 space-y-1">
                        <li>Early Career (0-5 years): 1.5-2 years per role to build foundational skills</li>
                        <li>Mid-Career (5-10 years): 2-3 years per role with strategic moves for advancement</li>
                        <li>Senior Level (10+ years): 3-5 years per role with highly selective moves for maximum impact</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => setActiveTab("when")}>
              When to Move
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setActiveTab("how")}>
              How to Move
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setActiveTab("benefits")}>
              Growth Impact
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LateralMoveAnalysis;
