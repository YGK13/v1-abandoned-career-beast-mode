
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WaitlistForm from "@/components/WaitlistForm";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-block bg-blue-50 text-blue-600 font-medium rounded-full px-4 py-1.5">
            Your Career Accelerator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Unlock Your <span className="text-blue-600">Career Potential</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl">
            AI-powered platform to transform your professional journey with personalized career growth tools.
          </p>
          
          <div className="flex space-x-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => {
                const waitlistElement = document.getElementById('waitlist');
                if (waitlistElement) {
                  waitlistElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started <Zap size={18} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-blue-600 border-blue-200 hover:bg-blue-50" 
              onClick={() => navigate("/help")}
            >
              Learn More <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Right Waitlist Form */}
        <div id="waitlist" className="w-full">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
