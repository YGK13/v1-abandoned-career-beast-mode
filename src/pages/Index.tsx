
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Briefcase, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  FileText,
  GraduationCap, 
  LineChart, 
  Rocket, 
  Sparkles, 
  Target, 
  Zap 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-primary/20 text-primary font-medium rounded-full px-4 py-1.5 mb-6">
              Your Career. Unleashed.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Break Free From Career <span className="text-primary">Stagnation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All-in-one platform for professionals who want to accelerate their career growth without spending thousands on coaches and courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8" 
                onClick={() => navigate("/pricing")}
              >
                Get Started <Zap size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 text-lg" 
                onClick={() => navigate("/help")}
              >
                How It Works <ChevronRight size={18} />
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            <div className="bg-background/80 backdrop-blur border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">87%</p>
              <p className="text-sm text-muted-foreground">Career Advancement</p>
            </div>
            <div className="bg-background/80 backdrop-blur border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">3.2x</p>
              <p className="text-sm text-muted-foreground">Salary Growth</p>
            </div>
            <div className="bg-background/80 backdrop-blur border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">15K+</p>
              <p className="text-sm text-muted-foreground">Professionals</p>
            </div>
            <div className="bg-background/80 backdrop-blur border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">97%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Feeling Stuck in Your Career?
            </h2>
            <p className="text-xl text-muted-foreground">
              You're not alone. Mid-career professionals face unique challenges that traditional career advice doesn't address.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="bg-red-100 dark:bg-red-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Time for Development</h3>
              <p className="text-muted-foreground">
                Between your current job, family responsibilities, and everyday life, finding time to invest in career growth feels impossible.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="bg-amber-100 dark:bg-amber-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expensive Solutions</h3>
              <p className="text-muted-foreground">
                Career coaches charge thousands. Courses add up quickly. Premium career tools cost more than they're worth.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Information Overload</h3>
              <p className="text-muted-foreground">
                Conflicting advice everywhere. Too many options. No clear path forward that's tailored to your specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-primary/20 text-primary font-medium rounded-full px-4 py-1.5 mb-6">
              Why Career BEAST MODE Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              All the Tools You Need in One Place
            </h2>
            <p className="text-xl text-muted-foreground">
              We've built the ultimate career growth platform so you don't have to piece together solutions yourself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <Briefcase className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">High-Impact Job Matching</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered job recommendations that match your skills and career goals. No more wasting time filtering through irrelevant postings.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </Button>
            </div>
            
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <Award className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Skills Development</h3>
              <p className="text-muted-foreground mb-4">
                Identify skill gaps and get personalized learning paths to boost your marketability with in-demand professional skills.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/skills")}
              >
                Enhance Skills
              </Button>
            </div>
            
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <FileText className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Career Assets</h3>
              <p className="text-muted-foreground mb-4">
                Generate polished resumes, cover letters, and professional bios that get noticed by hiring managers and recruiters.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/career-docs")}
              >
                Craft Documents
              </Button>
            </div>
            
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <Rocket className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Personal Brand Builder</h3>
              <p className="text-muted-foreground mb-4">
                Build a strong personal brand with LinkedIn optimization, content strategies, and visibility boosters that attract opportunities.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/personal-brand")}
              >
                Build Your Brand
              </Button>
            </div>
            
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <GraduationCap className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Career Coaching</h3>
              <p className="text-muted-foreground mb-4">
                Get advice from AI and human coaches that's practical, actionable, and tailored to your specific career situation.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/coaching")}
              >
                Get Guidance
              </Button>
            </div>
            
            <div className="relative p-6 border rounded-xl bg-background hover:shadow-md transition-all group">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} />
              </div>
              <LineChart className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Salary Negotiation</h3>
              <p className="text-muted-foreground mb-4">
                Learn proven negotiation strategies to maximize your compensation. Access industry salary data to know your true market value.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => navigate("/salary-title")}
              >
                Maximize Income
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-primary/20 text-primary font-medium rounded-full px-4 py-1.5 mb-6">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Career Transformations
            </h2>
            <p className="text-xl text-muted-foreground">
              See how mid-career professionals like you have achieved breakthrough results with Career BEAST MODE.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="text-yellow-400" size={16} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "After 8 years in the same role, I was feeling stuck. Career BEAST MODE helped me identify transferable skills and negotiate a 32% salary increase at a new company."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-medium">JM</span>
                </div>
                <div>
                  <p className="font-medium">Jennifer M.</p>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="text-yellow-400" size={16} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "The LinkedIn optimization alone was worth it. My profile views increased by 400% in just 3 weeks, and I started getting recruiter messages for senior positions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-medium">DT</span>
                </div>
                <div>
                  <p className="font-medium">David T.</p>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="text-yellow-400" size={16} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "I considered hiring a career coach for $3,000 but decided to try Career BEAST MODE first. Six months later, I've made more progress than I did in the previous 5 years."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-medium">SM</span>
                </div>
                <div>
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-muted-foreground">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are accelerating their career growth without expensive coaches or time-consuming courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8" 
                onClick={() => navigate("/pricing")}
              >
                Get Started Now <Zap size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 text-lg" 
                onClick={() => navigate("/help")}
              >
                Learn More <ChevronRight size={18} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required to get started. 7-day free trial on all plans.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
