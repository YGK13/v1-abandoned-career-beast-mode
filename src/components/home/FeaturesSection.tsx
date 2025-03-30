
import React from "react";
import { Briefcase, Award, ChevronRight } from "lucide-react";
import FeatureItem from "./FeatureItem";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "AI-powered job recommendations tailored to your skills and career goals."
    },
    {
      icon: Award,
      title: "Skill Development",
      description: "Personalized learning paths to boost your professional marketability."
    },
    {
      icon: ChevronRight,
      title: "Career Insights",
      description: "Data-driven insights to help you make informed career decisions."
    }
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Designed for Your Career Growth
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Comprehensive tools that work together to accelerate your professional development.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
