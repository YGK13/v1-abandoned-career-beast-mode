
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, PieChart } from "lucide-react";

const SalaryCalculator: React.FC = () => {
  const [industry, setIndustry] = useState("tech");
  const [role, setRole] = useState("product");
  const [experience, setExperience] = useState([5]);
  const [location, setLocation] = useState("sf");
  const [education, setEducation] = useState("bachelors");
  const [currentSalary, setCurrentSalary] = useState("");
  const [calculatedSalary, setCalculatedSalary] = useState<number | null>(null);
  const [salaryRange, setSalaryRange] = useState<{min: number, max: number} | null>(null);

  const calculateSalary = () => {
    // This is a simplified calculation - in a real implementation, this would
    // use more complex algorithms or API calls to salary databases
    let baseSalary = 0;
    
    // Base salary by industry
    switch(industry) {
      case "tech": baseSalary = 120000; break;
      case "finance": baseSalary = 110000; break;
      case "healthcare": baseSalary = 95000; break;
      case "retail": baseSalary = 85000; break;
      default: baseSalary = 100000;
    }
    
    // Role adjustments
    let roleMultiplier = 1.0;
    switch(role) {
      case "engineering": roleMultiplier = 1.2; break;
      case "product": roleMultiplier = 1.1; break;
      case "marketing": roleMultiplier = 0.9; break;
      case "sales": roleMultiplier = 1.05; break;
      case "operations": roleMultiplier = 0.85; break;
      default: roleMultiplier = 1.0;
    }
    
    // Experience adjustment (3-6% per year)
    const expMultiplier = 1 + (experience[0] * 0.045);
    
    // Location adjustment
    let locationMultiplier = 1.0;
    switch(location) {
      case "sf": locationMultiplier = 1.5; break;
      case "nyc": locationMultiplier = 1.45; break;
      case "chicago": locationMultiplier = 1.2; break;
      case "austin": locationMultiplier = 1.15; break;
      case "remote": locationMultiplier = 1.1; break;
      default: locationMultiplier = 1.0;
    }
    
    // Education adjustment
    let educationMultiplier = 1.0;
    switch(education) {
      case "phd": educationMultiplier = 1.2; break;
      case "masters": educationMultiplier = 1.1; break;
      case "bachelors": educationMultiplier = 1.0; break;
      case "associate": educationMultiplier = 0.9; break;
      case "highschool": educationMultiplier = 0.8; break;
      default: educationMultiplier = 1.0;
    }
    
    // Calculate projected market salary
    const marketSalary = Math.round(baseSalary * roleMultiplier * expMultiplier * locationMultiplier * educationMultiplier);
    
    // Set range (±10%)
    const min = Math.round(marketSalary * 0.9);
    const max = Math.round(marketSalary * 1.1);
    
    setCalculatedSalary(marketSalary);
    setSalaryRange({min, max});
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            <span>Salary Calculator</span>
          </CardTitle>
          <CardDescription>
            Get an estimate of your market value based on your skills, experience, and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role Category</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product Management</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Years of Experience: {experience[0]}</Label>
                <Slider
                  value={experience}
                  min={0}
                  max={25}
                  step={1}
                  onValueChange={setExperience}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sf">San Francisco Bay Area</SelectItem>
                    <SelectItem value="nyc">New York City</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="austin">Austin</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select value={education} onValueChange={setEducation}>
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select Education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="highschool">High School</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-salary">Current Salary (Optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-salary"
                    type="text"
                    placeholder="Enter current salary"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" onClick={calculateSalary}>
            Calculate Market Salary
          </Button>

          {calculatedSalary && salaryRange && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Market Salary Estimate</span>
                </h3>
                <span className="text-xl font-bold">${calculatedSalary.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Typical salary range: ${salaryRange.min.toLocaleString()} - ${salaryRange.max.toLocaleString()}
              </p>
              {currentSalary && (
                <div className="flex items-center gap-2 text-sm">
                  <PieChart className="h-4 w-4" />
                  <span>Your current salary {Number(currentSalary.replace(/\D/g, '')) < calculatedSalary ? 'is below' : 'matches or exceeds'} the market rate.</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps for Salary Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Based on your profile, consider these steps to maximize your compensation:</p>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>Update your resume with quantifiable achievements</li>
              <li>Prepare for your next performance review using our guides</li>
              <li>Consider upskilling in high-demand areas for your industry</li>
              <li>Research comparable salaries at competing companies</li>
              <li>Practice negotiation tactics with our interactive tools</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button variant="outline" className="flex-1">View Timeline</Button>
              <Button variant="outline" className="flex-1">Negotiation Guide</Button>
              <Button variant="outline" className="flex-1">Performance Review Tips</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
