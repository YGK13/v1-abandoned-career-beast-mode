
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import WaitlistForm from "@/components/WaitlistForm";
import { 
  Award, 
  Briefcase, 
  ChevronRight, 
  Zap 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section with Clean, Modern Design */}
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

      {/* Features Preview */}
      <section className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Designed for Your Career Growth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Comprehensive tools that work together to accelerate your professional development.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <Briefcase className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Job Matching
              </h3>
              <p className="text-gray-600">
                AI-powered job recommendations tailored to your skills and career goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <Award className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Skill Development
              </h3>
              <p className="text-gray-600">
                Personalized learning paths to boost your professional marketability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <ChevronRight className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Career Insights
              </h3>
              <p className="text-gray-600">
                Data-driven insights to help you make informed career decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
