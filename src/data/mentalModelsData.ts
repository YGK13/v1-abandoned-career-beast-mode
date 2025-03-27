
import { Target, Brain, GitCommit, Map, Filter, CheckCircle, BarChart } from "lucide-react";

export interface MentalModel {
  id: number;
  title: string;
  description: string;
  application: string;
  category: string;
  icon: React.ElementType;
}

export const mentalModels: MentalModel[] = [
  {
    id: 1,
    title: "Second-Order Thinking",
    description: "Consider not just the immediate effects of a decision, but the subsequent effects as well.",
    application: "When making a career decision, don't just consider its immediate impact but also how it will position you 3-5 years from now.",
    category: "Decision Making",
    icon: GitCommit
  },
  {
    id: 2,
    title: "Inversion",
    description: "Think backwards - instead of focusing on success, consider what would cause failure and avoid those things.",
    application: "Instead of asking 'How do I get promoted?', ask 'What behaviors would guarantee I don't get promoted?'",
    category: "Problem Solving",
    icon: Map
  },
  {
    id: 3,
    title: "Occam's Razor",
    description: "Among competing explanations, the simplest is usually correct.",
    application: "When diagnosing a workplace problem, start with the simplest explanation before exploring more complex possibilities.",
    category: "Problem Solving",
    icon: Target
  },
  {
    id: 4,
    title: "Circle of Competence",
    description: "Focus on areas where you have legitimate expertise and recognize the boundaries of your knowledge.",
    application: "In meetings, speak confidently on topics you know well, and be honest about areas where you have less expertise.",
    category: "Self-Awareness",
    icon: CheckCircle
  },
  {
    id: 5,
    title: "Hanlon's Razor",
    description: "Never attribute to malice what can be adequately explained by neglect or incompetence.",
    application: "When a colleague doesn't respond to your email, assume they're busy rather than ignoring you intentionally.",
    category: "Communication",
    icon: Filter
  },
  {
    id: 6,
    title: "Confirmation Bias",
    description: "We tend to search for and interpret information that confirms our pre-existing beliefs.",
    application: "When researching a business decision, actively seek out contradictory information to challenge your initial assumptions.",
    category: "Cognitive Bias",
    icon: Brain
  },
  {
    id: 7,
    title: "Opportunity Cost",
    description: "Every decision carries the cost of what you could have done instead.",
    application: "When considering a new project, calculate not just its return but what you're giving up by not pursuing alternatives.",
    category: "Decision Making",
    icon: BarChart
  }
];
