
import { 
  Heart, 
  Shield, 
  Clock, 
  User, 
  Users, 
  Briefcase, 
  BookOpen,
  MessageCircle,
  Brain,
  Lightbulb,
  Rocket,
  Leaf,
  Eye,
  Scale,
  FileText,
  PenTool,
  Palette,
  Music,
  ArrowUpRight,
  HandMetal,
  DollarSign,
  LineChart,
  BedDouble,
  Coffee,
  SunMedium,
  Cloud,
  ScrollText,
  Target,
  Search,
  ChevronUp
} from "lucide-react";

export interface LifeSkill {
  id: number;
  title: string;
  description: string;
  actionStep: string;
  category: string;
  icon: React.ElementType;
}

export const lifeSkills: LifeSkill[] = [
  {
    id: 1,
    title: "Active Listening",
    description: "Fully concentrating on what is being said rather than passively hearing the message of the speaker.",
    actionStep: "Today, make a conscious effort to not interrupt others when they speak and reflect back what you heard before responding.",
    category: "Communication",
    icon: Users
  },
  {
    id: 2,
    title: "Emotional Regulation",
    description: "Managing your emotions in a constructive way, especially in high-pressure situations.",
    actionStep: "When you feel stressed today, take 3 deep breaths and name the emotion you're experiencing before responding.",
    category: "Emotional Intelligence",
    icon: Heart
  },
  {
    id: 3,
    title: "Boundary Setting",
    description: "Clearly establishing what behavior you will and won't accept from others and yourself.",
    actionStep: "Identify one area where you need stronger boundaries and practice saying 'no' or setting a limit today.",
    category: "Self-Care",
    icon: Shield
  },
  {
    id: 4,
    title: "Time Blocking",
    description: "Dividing your day into blocks of time dedicated to specific tasks or activities.",
    actionStep: "Set aside three focused 90-minute work blocks tomorrow, with short breaks in between, for your most important tasks.",
    category: "Productivity",
    icon: Clock
  },
  {
    id: 5,
    title: "Growth Mindset",
    description: "Believing your talents can be developed through hard work, good strategies, and feedback.",
    actionStep: "When facing a challenge today, replace 'I can't do this' with 'I can't do this yet' and identify one small step forward.",
    category: "Mindset",
    icon: BookOpen
  },
  {
    id: 6,
    title: "Constructive Feedback",
    description: "Providing observations and suggestions to help others improve in a way that's specific and supportive.",
    actionStep: "Use the format 'I noticed X, it impacted Y, could you consider Z?' next time you need to give feedback to someone.",
    category: "Communication",
    icon: Briefcase
  },
  {
    id: 7,
    title: "Self-Compassion",
    description: "Treating yourself with the same kindness and understanding you would offer to a good friend.",
    actionStep: "When you make a mistake today, notice your self-talk and intentionally speak to yourself as you would to someone you care about.",
    category: "Self-Care",
    icon: User
  },
  {
    id: 8,
    title: "Assertive Communication",
    description: "Expressing your needs, wants, and feelings directly and honestly while respecting others.",
    actionStep: "Practice using 'I' statements today when discussing sensitive topics: 'I feel/think/need' instead of 'You always/never'.",
    category: "Communication",
    icon: MessageCircle
  },
  {
    id: 9,
    title: "Critical Thinking",
    description: "Analyzing information objectively to form a judgment, identifying biases and logical fallacies.",
    actionStep: "When reading news today, identify at least three assumptions being made and consider alternative perspectives.",
    category: "Cognitive Skills",
    icon: Brain
  },
  {
    id: 10,
    title: "Creative Problem-Solving",
    description: "Finding innovative solutions to challenges by approaching them from different angles.",
    actionStep: "Take a current problem you're facing and brainstorm 10 possible solutions without judging their feasibility initially.",
    category: "Cognitive Skills",
    icon: Lightbulb
  },
  {
    id: 11,
    title: "Goal Setting",
    description: "Defining specific, measurable objectives with clear timelines for achievement.",
    actionStep: "Write down one important goal using the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound).",
    category: "Productivity",
    icon: Target
  },
  {
    id: 12,
    title: "Habit Formation",
    description: "Creating sustainable behavior changes through consistent practice and environmental design.",
    actionStep: "Identify one small habit you want to build and link it to an existing routine (e.g., 'After I brush my teeth, I will meditate for 2 minutes').",
    category: "Self-Improvement",
    icon: Rocket
  },
  {
    id: 13,
    title: "Mindfulness",
    description: "Maintaining awareness of your thoughts, feelings, and environment without judgment.",
    actionStep: "Take three 'mindful minutes' today where you pause and observe your breath, sensations, and thoughts without getting caught up in them.",
    category: "Mental Health",
    icon: Leaf
  },
  {
    id: 14,
    title: "Empathy",
    description: "Understanding and sharing the feelings of another person from their perspective.",
    actionStep: "During your next disagreement, pause and genuinely ask yourself, 'Why might a reasonable person hold this view?'",
    category: "Emotional Intelligence",
    icon: Eye
  },
  {
    id: 15,
    title: "Conflict Resolution",
    description: "Addressing disagreements constructively to find mutually acceptable solutions.",
    actionStep: "In your next conflict, practice active listening, validate the other person's perspective, and look for common ground before problem-solving.",
    category: "Relationships",
    icon: Scale
  },
  {
    id: 16,
    title: "Note-Taking",
    description: "Recording information effectively for better retention and organization of knowledge.",
    actionStep: "Try the Cornell note-taking method during your next meeting or learning session, dividing your page into sections for notes, cues, and summary.",
    category: "Learning",
    icon: FileText
  },
  {
    id: 17,
    title: "Storytelling",
    description: "Crafting and delivering narratives that engage, persuade, and inspire others.",
    actionStep: "Next time you present information, structure it as a story with a clear beginning, middle, and end, focusing on why it matters to your audience.",
    category: "Communication",
    icon: PenTool
  },
  {
    id: 18,
    title: "Aesthetic Appreciation",
    description: "Recognizing and enjoying beauty in art, nature, and everyday experiences.",
    actionStep: "Take 5 minutes today to mindfully observe something beautiful in your environment, noticing details and your emotional response.",
    category: "Well-being",
    icon: Palette
  },
  {
    id: 19,
    title: "Active Rest",
    description: "Engaging in restorative activities that provide recovery from stress and mental fatigue.",
    actionStep: "Schedule a 30-minute block this week for a fully immersive activity you enjoy that's neither work nor passive entertainment.",
    category: "Self-Care",
    icon: Music
  },
  {
    id: 20,
    title: "Continuous Learning",
    description: "Regularly acquiring new knowledge and skills throughout life.",
    actionStep: "Identify one skill you want to develop and dedicate 20 minutes to learning about it today, whether through reading, watching a tutorial, or practice.",
    category: "Self-Improvement",
    icon: ArrowUpRight
  },
  {
    id: 21,
    title: "Resilience",
    description: "Adapting well in the face of adversity, trauma, or significant sources of stress.",
    actionStep: "Reflect on a past challenge you've overcome and identify three strengths or strategies that helped you through it.",
    category: "Mental Health",
    icon: HandMetal
  },
  {
    id: 22,
    title: "Financial Literacy",
    description: "Understanding how to effectively manage personal finances and make informed financial decisions.",
    actionStep: "Track all your expenses for the next three days to increase awareness of your spending patterns.",
    category: "Life Management",
    icon: DollarSign
  },
  {
    id: 23,
    title: "Networking",
    description: "Building and maintaining professional relationships for mutual benefit.",
    actionStep: "Reach out to one person in your network you haven't spoken with recently to check in and see how they're doing.",
    category: "Career Development",
    icon: LineChart
  },
  {
    id: 24,
    title: "Sleep Hygiene",
    description: "Practicing habits that facilitate good, consistent sleep.",
    actionStep: "Establish a 20-minute wind-down routine before bed tonight that doesn't include screens.",
    category: "Physical Health",
    icon: BedDouble
  },
  {
    id: 25,
    title: "Deep Work",
    description: "The ability to focus without distraction on cognitively demanding tasks.",
    actionStep: "Block out 90 minutes tomorrow for your most important task, turning off all notifications and working in a distraction-free environment.",
    category: "Productivity",
    icon: Coffee
  },
  {
    id: 26,
    title: "Optimism",
    description: "Maintaining a hopeful outlook while acknowledging challenges.",
    actionStep: "At the end of today, write down three good things that happened and why they matter to you.",
    category: "Mental Health",
    icon: SunMedium
  },
  {
    id: 27,
    title: "Adaptability",
    description: "Adjusting effectively to changing circumstances and requirements.",
    actionStep: "When your next plan gets disrupted, pause, take a breath, and ask 'What's the opportunity here?' before responding.",
    category: "Mindset",
    icon: Cloud
  },
  {
    id: 28,
    title: "Ethical Decision-Making",
    description: "Making choices based on principles of right and wrong beyond self-interest.",
    actionStep: "Before your next significant decision, consider how it aligns with your core values and how it might impact various stakeholders.",
    category: "Character Development",
    icon: ScrollText
  },
  {
    id: 29,
    title: "Self-Awareness",
    description: "Conscious knowledge of your character, feelings, motives, and desires.",
    actionStep: "Take a personality assessment or ask three trusted friends to describe your strengths and growth areas, noting patterns in their feedback.",
    category: "Emotional Intelligence",
    icon: Search
  },
  {
    id: 30,
    title: "Asking for Help",
    description: "Seeking assistance when needed without shame or hesitation.",
    actionStep: "Identify something you're struggling with and reach out to someone who might help, being specific about what you need.",
    category: "Relationships",
    icon: ChevronUp
  }
];

