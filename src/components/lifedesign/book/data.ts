
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
      },
      {
        id: 4,
        title: "Chapter 4: Personal Values",
        description: "Defining and living according to your core principles",
        keyPoints: [
          "Values provide clarity for decision-making in complex situations",
          "Personal values should be deliberately chosen, not merely inherited",
          "Value conflicts are inevitable and require prioritization",
          "Regular values reflection strengthens identity"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-4-personal-values.pdf"
      },
      {
        id: 5,
        title: "Chapter 5: Self-Leadership",
        description: "Managing your inner state and directing your own growth",
        keyPoints: [
          "Self-leadership begins with emotional regulation",
          "Developing the capacity to observe your thoughts creates freedom of choice",
          "Self-directed learning accelerates personal development",
          "Progress tracking reinforces motivation and commitment"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-5-self-leadership.pdf"
      },
      {
        id: 6,
        title: "Chapter 6: Habit Systems",
        description: "Creating automated routines that support your goals",
        keyPoints: [
          "Habit stacking builds complex routines from simple foundations",
          "Environmental design reduces the friction for positive habits",
          "Identity-based habits create lasting change",
          "Habit tracking provides accountability and feedback"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-6-habit-systems.pdf"
      },
      {
        id: 7,
        title: "Chapter 7: Emotional Intelligence",
        description: "Understanding and managing emotions effectively",
        keyPoints: [
          "Emotional awareness is the foundation of emotional intelligence",
          "Emotional vocabulary enhances emotional granularity",
          "Emotion regulation skills can be systematically developed",
          "Understanding others' emotions improves relationships and influence"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-7-emotional-intelligence.pdf"
      },
      {
        id: 8,
        title: "Chapter 8: Decision Making",
        description: "Creating systems for effective choices",
        keyPoints: [
          "Decision journals capture your thinking process for future review",
          "Decision matrices clarify complex choices with multiple variables",
          "Pre-mortems identify potential failure points before they occur",
          "Regular decision reviews build judgment over time"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-8-decision-making.pdf"
      },
      {
        id: 9,
        title: "Chapter 9: Time Design",
        description: "Mastering the allocation of your most precious resource",
        keyPoints: [
          "Time blocking creates focused attention for deep work",
          "Energy management is as important as time management",
          "Seasons of focus allow for concentrated progress in priority areas",
          "Regular time audits identify time leaks and optimization opportunities"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-9-time-design.pdf"
      },
      {
        id: 10,
        title: "Chapter 10: Personal Strategy",
        description: "Planning and executing your life with intention",
        keyPoints: [
          "Personal strategy connects daily actions to long-term vision",
          "Strategic constraints create focus and accelerate progress",
          "Opportunity costs analysis improves resource allocation",
          "Regular strategy reviews adapt to changing conditions"
        ],
        pdfUrl: "/pdfs/volume-1-chapter-10-personal-strategy.pdf"
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
      },
      {
        id: 4,
        title: "Chapter 4: Difficult Conversations",
        description: "Navigating conflicts and tensions productively",
        keyPoints: [
          "Separating intent from impact reduces defensive reactions",
          "Psychological safety creates space for honest dialogue",
          "Curiosity about differing perspectives defuses tension",
          "Joint problem-solving transforms conflicts into opportunities"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-4-difficult-conversations.pdf"
      },
      {
        id: 5,
        title: "Chapter 5: Public Speaking",
        description: "Communicating confidently to groups of any size",
        keyPoints: [
          "Structure creates clarity and memorability in presentations",
          "Audience analysis shapes relevant and engaging content",
          "Stories and examples make abstract concepts concrete",
          "Deliberate practice builds confidence and competence"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-5-public-speaking.pdf"
      },
      {
        id: 6,
        title: "Chapter 6: Written Communication",
        description: "Crafting clear and compelling written messages",
        keyPoints: [
          "Reader-centered writing focuses on audience needs",
          "Structure and formatting enhance readability",
          "Editing processes separate creation from refinement",
          "Medium-appropriate style adapts to different contexts"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-6-written-communication.pdf"
      },
      {
        id: 7,
        title: "Chapter 7: Storytelling",
        description: "Using narrative to connect, persuade and inspire",
        keyPoints: [
          "Story structures create emotional engagement",
          "Personal stories build authenticity and connection",
          "Strategic storytelling aligns narratives with objectives",
          "Story libraries provide ready examples for various contexts"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-7-storytelling.pdf"
      },
      {
        id: 8,
        title: "Chapter 8: Negotiation",
        description: "Creating mutually beneficial agreements",
        keyPoints: [
          "Interest-based negotiation focuses on underlying needs",
          "BATNA awareness strengthens negotiating position",
          "Collaborative framing creates joint problem-solving",
          "Preparation significantly impacts negotiation outcomes"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-8-negotiation.pdf"
      },
      {
        id: 9,
        title: "Chapter 9: Digital Communication",
        description: "Mastering communication across digital channels",
        keyPoints: [
          "Channel selection matches message to appropriate medium",
          "Digital body language compensates for missing cues",
          "Asynchronous communication requires different strategies",
          "Digital reputation management shapes perception"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-9-digital-communication.pdf"
      },
      {
        id: 10,
        title: "Chapter 10: Cross-Cultural Communication",
        description: "Connecting effectively across cultural differences",
        keyPoints: [
          "Cultural frameworks identify potential misunderstandings",
          "Cultural humility creates openness to learning",
          "Adaptation strategies bridge communication gaps",
          "Explicit communication reduces assumption-based errors"
        ],
        pdfUrl: "/pdfs/volume-2-chapter-10-cross-cultural-communication.pdf"
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
      },
      {
        id: 4,
        title: "Chapter 4: Social Environment",
        description: "Curating relationships that elevate your growth",
        keyPoints: [
          "You become the average of the five people you spend the most time with",
          "Different relationships serve different developmental functions",
          "Intentional relationship curation balances support and challenge",
          "Regular social environment audits identify needed adjustments"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-4-social-environment.pdf"
      },
      {
        id: 5,
        title: "Chapter 5: Workspace Optimization",
        description: "Designing your professional environment for productivity",
        keyPoints: [
          "Task-specific zones increase productivity and focus",
          "Ergonomic design prevents physical strain and cognitive fatigue",
          "Visual management systems reduce cognitive load",
          "Regular workspace assessment ensures continued optimization"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-5-workspace-optimization.pdf"
      },
      {
        id: 6,
        title: "Chapter 6: Home Environment",
        description: "Creating spaces that support restoration and connection",
        keyPoints: [
          "Home environments should balance productivity and restoration",
          "Intentional design supports relationship quality and connection",
          "Visual simplicity reduces stress and cognitive load",
          "Environmental personalization increases psychological comfort"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-6-home-environment.pdf"
      },
      {
        id: 7,
        title: "Chapter 7: Time Environment",
        description: "Structuring your calendar for energy and focus",
        keyPoints: [
          "Time blocking creates protected space for priority work",
          "Energy-based scheduling aligns tasks with natural rhythms",
          "Buffer time prevents cascade failures in scheduling",
          "Regular time environment audits identify optimization opportunities"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-7-time-environment.pdf"
      },
      {
        id: 8,
        title: "Chapter 8: Mental Environment",
        description: "Cultivating a healthy inner landscape",
        keyPoints: [
          "Information diet shapes thought patterns and focus",
          "Mental models filter and organize incoming information",
          "Thought hygiene practices reduce negative rumination",
          "Regular mental environment audits identify needed adjustments"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-8-mental-environment.pdf"
      },
      {
        id: 9,
        title: "Chapter 9: Financial Environment",
        description: "Creating systems for financial wellbeing",
        keyPoints: [
          "Financial clarity reduces stress and improves decision-making",
          "Automated systems simplify financial management",
          "Financial buffers create psychological safety",
          "Regular financial environment reviews maintain optimal conditions"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-9-financial-environment.pdf"
      },
      {
        id: 10,
        title: "Chapter 10: Travel and Transition Environments",
        description: "Maintaining productivity during movement and change",
        keyPoints: [
          "Travel routines preserve productivity in changing environments",
          "Minimal viable environments support work anywhere",
          "Transition rituals mark shifts between different contexts",
          "Adaptable systems function across varying conditions"
        ],
        pdfUrl: "/pdfs/volume-3-chapter-10-travel-transition-environments.pdf"
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
      },
      {
        id: 4,
        title: "Chapter 4: Professional Relationships",
        description: "Building a network that supports career advancement",
        keyPoints: [
          "Strategic networking focuses on mutual value creation",
          "Relationship depth matters more than breadth",
          "Mentorship accelerates learning and advancement",
          "Regular relationship investment maintains network strength"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-4-professional-relationships.pdf"
      },
      {
        id: 5,
        title: "Chapter 5: Leadership Development",
        description: "Growing your capacity to influence and inspire others",
        keyPoints: [
          "Leadership begins with self-leadership and personal example",
          "Situational leadership adapts style to context and individual",
          "Psychological safety creates environments for innovation",
          "Regular leadership feedback guides continued development"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-5-leadership-development.pdf"
      },
      {
        id: 6,
        title: "Chapter 6: Personal Brand",
        description: "Developing a reputation that creates opportunities",
        keyPoints: [
          "Personal brand is what others say when you're not in the room",
          "Consistency builds trust and recognition over time",
          "Strategic visibility places you in opportunity paths",
          "Regular brand audits ensure alignment with goals"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-6-personal-brand.pdf"
      },
      {
        id: 7,
        title: "Chapter 7: Innovation and Creativity",
        description: "Developing habits that spark new ideas and approaches",
        keyPoints: [
          "Creative systems produce ideas more reliably than inspiration",
          "Interdisciplinary exposure generates novel combinations",
          "Constraints often enhance rather than limit creativity",
          "Regular idea capture builds a reservoir of possibilities"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-7-innovation-creativity.pdf"
      },
      {
        id: 8,
        title: "Chapter 8: Entrepreneurial Thinking",
        description: "Developing an ownership mindset in any role",
        keyPoints: [
          "Opportunity recognition can be systematically developed",
          "Resource leverage creates maximum impact with minimum input",
          "Calculated risk-taking balances potential gains with downsides",
          "Regular entrepreneurial experiments build capability"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-8-entrepreneurial-thinking.pdf"
      },
      {
        id: 9,
        title: "Chapter 9: Learning Systems",
        description: "Accelerating growth through deliberate knowledge acquisition",
        keyPoints: [
          "Learning systems convert information into applicable knowledge",
          "Spaced repetition optimizes retention of critical information",
          "Teaching solidifies understanding of complex concepts",
          "Regular learning reviews identify gaps and opportunities"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-9-learning-systems.pdf"
      },
      {
        id: 10,
        title: "Chapter 10: Legacy Design",
        description: "Creating lasting impact beyond your immediate work",
        keyPoints: [
          "Legacy thinking connects daily actions to long-term impact",
          "Knowledge transfer preserves insights for others",
          "System design creates sustained influence beyond presence",
          "Regular legacy reviews ensure alignment with values"
        ],
        pdfUrl: "/pdfs/volume-4-chapter-10-legacy-design.pdf"
      }
    ]
  }
];
