
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Milestone, TrendingUp, Award, BarChart, Target } from "lucide-react";

const CareerTimeline: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            <span>Career Growth Timeline</span>
          </CardTitle>
          <CardDescription>
            Strategic milestones to accelerate your compensation and title progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="relative pl-8 pb-1">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary"></div>
              <div className="absolute left-2 top-6 h-full w-0.5 bg-border"></div>
              <div className="mb-2">
                <h3 className="text-lg font-medium">First 90 Days</h3>
                <p className="text-muted-foreground text-sm">Building a strong foundation</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Set clear expectations with manager on performance metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Document all achievements and contributions in your role</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Identify key stakeholders and build relationships</span>
                </li>
              </ul>
            </div>

            <div className="relative pl-8 pb-1">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary/80"></div>
              <div className="absolute left-2 top-6 h-full w-0.5 bg-border"></div>
              <div className="mb-2">
                <h3 className="text-lg font-medium">Months 3-6</h3>
                <p className="text-muted-foreground text-sm">Demonstrating value and impact</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Look for high-visibility projects that showcase your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Request a performance check-in to ensure alignment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Begin building a case for promotion with concrete metrics</span>
                </li>
              </ul>
            </div>

            <div className="relative pl-8 pb-1">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary/60"></div>
              <div className="absolute left-2 top-6 h-full w-0.5 bg-border"></div>
              <div className="mb-2">
                <h3 className="text-lg font-medium">Months 6-9</h3>
                <p className="text-muted-foreground text-sm">Strategic positioning</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Research industry compensation standards for your role and level</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Seek additional responsibilities that align with the next level</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Gather feedback from peers and other managers to support your case</span>
                </li>
              </ul>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary/40"></div>
              <div className="mb-2">
                <h3 className="text-lg font-medium">Annual Review (9-12 Months)</h3>
                <p className="text-muted-foreground text-sm">Negotiation and advancement</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Prepare a detailed self-assessment highlighting achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Present your promotion and salary increase request with market data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>Outline your growth plan for the next year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>If necessary, begin exploring lateral moves for faster growth</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Customize Timeline</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Add to Calendar</span>
            </Button>
            <Button className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>See Next Level Requirements</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expected Title Progression</CardTitle>
          <CardDescription>
            Typical advancement path based on industry standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1/3 font-medium">Entry Level</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="w-1/3 font-medium">Mid-Level</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="w-1/3 font-medium">Senior Level</div>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-1/3">Associate</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">Specialist/Manager</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">Senior Manager/Director</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-1/3">1-2 years</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">2-5 years</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">5+ years</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-1/3">15-25% increase</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">20-30% increase</div>
                <ArrowRight className="h-4 w-4 opacity-0" />
                <div className="w-1/3">25-40% increase</div>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p className="font-medium">Accelerating Your Timeline:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li>Consistently exceed performance expectations</li>
                <li>Take on responsibilities of the next level before promotion</li>
                <li>Build cross-functional influence and visibility</li>
                <li>Develop specialized expertise that's in high demand</li>
                <li>Consider strategic lateral moves for faster advancement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerTimeline;
