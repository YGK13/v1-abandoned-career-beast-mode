
import { BookVolume } from "./types";
import { Heart, Brain, Coffee, PenTool } from "lucide-react";

export const bookVolumes: BookVolume[] = [
  {
    id: 1,
    title: "Volume 1: Be Your Own Commander-in-Chief",
    subtitle: "Building your identity and personal leadership",
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    badgeColor: "bg-rose-100 border-rose-200 text-rose-700",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Four Conversations",
        description: "Understanding the framework of conversations with Self, Others, Environment, and Work",
        keyPoints: [
          "The Self conversation builds identity and values",
          "The Others conversation creates connection and influence",
          "The Environment conversation shapes your surroundings for success",
          "The Work conversation masters your craft and career"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-1-four-conversations.pdf"
      },
      {
        id: 2,
        title: "Chapter 2: Identity Design",
        description: "Crafting who you are and who you want to become",
        keyPoints: [
          "Identity is shaped by your consistent actions and choices",
          "You can intentionally design your identity through habits",
          "Values serve as the foundation for identity design",
          "Small identity shifts create significant life changes"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-2-identity-design.pdf"
      },
      {
        id: 3,
        title: "Chapter 3: Mental Models",
        description: "Building effective frameworks for thinking and decision-making",
        keyPoints: [
          "Mental models are the lenses through which we interpret reality",
          "Diverse mental models lead to more effective problem-solving",
          "Challenging assumptions reveals hidden mental models",
          "Regular mental model audits improve decision quality"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-3-mental-models.pdf"
      }
    ]
  },
  {
    id: 2,
    title: "Volume 2: Mastering Communication",
    subtitle: "Building meaningful connections and influence",
    icon: Brain,
    color: "bg-blue-100 text-blue-700",
    badgeColor: "bg-blue-100 border-blue-200 text-blue-700",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Communication Fundamentals",
        description: "The foundations of effective communication across all contexts",
        keyPoints: [
          "Active listening is the cornerstone of effective communication",
          "Non-verbal cues often convey more than words",
          "Emotional intelligence amplifies communication effectiveness",
          "Context awareness shapes appropriate communication styles"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-1-communication-fundamentals.pdf"
      },
      {
        id: 2,
        title: "Chapter 2: Relationship Building",
        description: "Creating and nurturing meaningful connections",
        keyPoints: [
          "Trust is built in small moments of vulnerability and reliability",
          "Authentic curiosity creates deeper connections",
          "Boundaries establish healthy relationship frameworks",
          "Regular investment maintains relationship strength"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-2-relationship-building.pdf"
      },
      {
        id: 3,
        title: "Chapter 3: Influence and Persuasion",
        description: "Ethically shaping perspectives and decisions",
        keyPoints: [
          "Influence begins with understanding others' values and motivations",
          "Stories persuade more effectively than facts alone",
          "Reciprocity creates natural opportunities for influence",
          "Genuine advocacy for others' interests builds lasting influence"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-3-influence-persuasion.pdf"
      }
    ]
  },
  {
    id: 3,
    title: "Volume 3: Optimal Environments",
    subtitle: "Designing spaces and routines that support your success",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700",
    badgeColor: "bg-amber-100 border-amber-200 text-amber-700",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Physical Environment Design",
        description: "Creating spaces that enhance focus, creativity, and well-being",
        keyPoints: [
          "Your environment is either enhancing your energy or draining it",
          "Physical spaces should be designed for specific activities",
          "Environmental cues can trigger desired behaviors automatically",
          "Regular environment audits maintain optimal conditions"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-1-physical-environment.pdf"
      },
      {
        id: 2,
        title: "Chapter 2: Health Optimization",
        description: "Building the physical foundation for peak performance",
        keyPoints: [
          "Health is the foundation upon which all other success is built",
          "Sleep quality affects every aspect of cognitive performance",
          "Nutrition directly impacts energy, focus, and mood stability",
          "Movement patterns should be integrated throughout the day"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-2-health-optimization.pdf"
      },
      {
        id: 3,
        title: "Chapter 3: Digital Environment Design",
        description: "Managing technology for focus and wellbeing",
        keyPoints: [
          "Digital environments require intentional boundaries and design",
          "Notifications interrupt deep thinking and shift cognitive resources",
          "Digital tools should be evaluated for their impact on mental health",
          "Regular digital detox periods restore attention and creativity"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-3-digital-environment.pdf"
      }
    ]
  },
  {
    id: 4,
    title: "Volume 4: Career Mastery",
    subtitle: "Developing rare skills and creating meaningful impact",
    icon: PenTool,
    color: "bg-emerald-100 text-emerald-700",
    badgeColor: "bg-emerald-100 border-emerald-200 text-emerald-700",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Skill Development",
        description: "Building valuable expertise through deliberate practice",
        keyPoints: [
          "Career capital comes from developing rare and valuable skills",
          "Deliberate practice requires focused attention on weak areas",
          "Feedback loops accelerate skill development",
          "Interdisciplinary skills create unique value combinations"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-1-skill-development.pdf"
      },
      {
        id: 2,
        title: "Chapter 2: Purpose and Meaning",
        description: "Connecting your work to deeper values and impact",
        keyPoints: [
          "Purpose-driven work connects daily actions to meaningful impact",
          "Values alignment prevents burnout and sustains motivation",
          "Impact can be measured in multiple dimensions beyond money",
          "Regular purpose reviews ensure continued alignment"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-2-purpose-meaning.pdf"
      },
      {
        id: 3,
        title: "Chapter 3: Career Strategy",
        description: "Planning career moves for long-term growth and impact",
        keyPoints: [
          "Career strategy requires both opportunity exploration and focused execution",
          "Adjacent possible moves often yield better results than radical jumps",
          "Network cultivation creates unexpected opportunities",
          "Regular career strategy reviews prevent stagnation"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-3-career-strategy.pdf"
      }
    ]
  }
];
