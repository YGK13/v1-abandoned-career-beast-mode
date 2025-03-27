
import { 
  Target, 
  Brain, 
  GitCommit, 
  Map, 
  Filter, 
  CheckCircle, 
  BarChart, 
  Lightbulb, 
  Scale, 
  Gauge, 
  Search, 
  ArrowLeftRight, 
  Divide, 
  CandlestickChart,
  Eye,
  Axe,
  Hammer,
  Network,
  FileSearch,
  Workflow,
  UsersRound,
  TimerReset,
  PieChart,
  DollarSign
} from "lucide-react";

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
  },
  {
    id: 8,
    title: "First Principles Thinking",
    description: "Breaking down complex problems into basic elements and reassembling from the ground up.",
    application: "When redesigning a team process, ignore 'how it's always been done' and start from scratch with what outcomes you're really trying to achieve.",
    category: "Problem Solving",
    icon: Divide
  },
  {
    id: 9,
    title: "Probabilistic Thinking",
    description: "Considering problems in terms of likelihood and probability distributions rather than absolutes.",
    application: "Instead of asking 'Will this project succeed?' ask 'What's the probability of success, and what factors would increase that probability?'",
    category: "Decision Making",
    icon: PieChart
  },
  {
    id: 10,
    title: "Pareto Principle (80/20 Rule)",
    description: "Roughly 80% of outcomes come from 20% of causes or inputs.",
    application: "Identify the 20% of your tasks that produce 80% of your results, and focus your energy on those high-leverage activities.",
    category: "Productivity",
    icon: CandlestickChart
  },
  {
    id: 11,
    title: "Availability Heuristic",
    description: "We overestimate the likelihood of events that come easily to mind, especially if they're recent or emotionally charged.",
    application: "When assessing project risks, be aware that you might overemphasize problems that happened recently while overlooking other important risks.",
    category: "Cognitive Bias",
    icon: Eye
  },
  {
    id: 12,
    title: "Fundamental Attribution Error",
    description: "The tendency to attribute others' behaviors to their character rather than situational factors.",
    application: "When a teammate underperforms, consider what environmental or contextual factors might be affecting them before assuming it's a lack of ability or effort.",
    category: "Communication",
    icon: UsersRound
  },
  {
    id: 13,
    title: "Law of Diminishing Returns",
    description: "As you invest more in something, the incremental benefit decreases over time.",
    application: "Recognize when extra hours on a project are yielding minimal improvements and redirect your energy to areas where you can have greater impact.",
    category: "Productivity",
    icon: TimerReset
  },
  {
    id: 14,
    title: "Leverage",
    description: "Small forces can create large outputs when applied at the right point in a system.",
    application: "Identify the leverage points in your projects or career where minimal effort can create outsized results.",
    category: "Decision Making",
    icon: Axe
  },
  {
    id: 15,
    title: "Margin of Safety",
    description: "Building in extra buffer for unforeseen circumstances.",
    application: "When estimating project timelines, add a 20-30% buffer to account for unexpected complications.",
    category: "Risk Management",
    icon: Gauge
  },
  {
    id: 16,
    title: "Curse of Knowledge",
    description: "When knowledgeable people struggle to see problems from the perspective of less-informed people.",
    application: "When explaining technical concepts to non-specialists, actively remind yourself that what seems obvious to you isn't obvious to everyone.",
    category: "Communication",
    icon: Lightbulb
  },
  {
    id: 17,
    title: "Black Swan Events",
    description: "Rare, high-impact events that are difficult to predict but rationalized in hindsight.",
    application: "Design your career and financial plans to be resilient to unexpected, high-impact events instead of optimizing solely for normal conditions.",
    category: "Risk Management",
    icon: Search
  },
  {
    id: 18,
    title: "Thought Experiment",
    description: "Using hypothetical scenarios to explore consequences of theories or principles.",
    application: "Before implementing a major organizational change, mentally walk through how different stakeholders might react and what second-order effects might emerge.",
    category: "Problem Solving",
    icon: Brain
  },
  {
    id: 19,
    title: "Reciprocity",
    description: "The psychological tendency to return favors and pay back debts.",
    application: "When building professional relationships, look for authentic ways to provide value first without immediate expectation of return.",
    category: "Influence",
    icon: ArrowLeftRight
  },
  {
    id: 20,
    title: "Antifragility",
    description: "Systems that get stronger when exposed to stressors, volatility, and randomness.",
    application: "Design your skill development plan to include deliberate challenges that make you more adaptable and resilient over time.",
    category: "Risk Management",
    icon: Hammer
  },
  {
    id: 21,
    title: "Network Effects",
    description: "A product or service becomes more valuable as more people use it.",
    application: "When evaluating career opportunities, consider roles in companies or industries benefiting from network effects, as they often create outsized winners.",
    category: "Business Strategy",
    icon: Network
  },
  {
    id: 22,
    title: "Lindy Effect",
    description: "The longer something non-perishable has been around, the longer it's likely to stay around.",
    application: "When developing your skill portfolio, invest significantly in fundamental skills that have stood the test of time rather than just trending technologies.",
    category: "Decision Making",
    icon: FileSearch
  },
  {
    id: 23,
    title: "Systems Thinking",
    description: "Analyzing problems by looking at the entire system rather than isolated parts.",
    application: "When troubleshooting recurring team issues, consider how organizational structures and incentives might be creating the conditions for the problem.",
    category: "Problem Solving",
    icon: Workflow
  },
  {
    id: 24,
    title: "Regret Minimization Framework",
    description: "Making decisions based on minimizing potential future regret rather than maximizing immediate happiness.",
    application: "When faced with a major career decision, ask yourself 'Which choice would I most regret not taking when I look back 10 years from now?'",
    category: "Decision Making",
    icon: Scale
  },
  {
    id: 25,
    title: "Compounding",
    description: "Small, consistent advantages accumulate over time to create exponential growth.",
    application: "Focus on building daily habits that yield small improvements but will compound dramatically over your career.",
    category: "Productivity",
    icon: DollarSign
  }
];

