
// Sample responses for different career question categories
export const sampleResponses: Record<string, string[]> = {
  interviews: [
    "Prepare for interviews by researching the company thoroughly and understanding their products, services, and company culture.",
    "Practice the STAR method (Situation, Task, Action, Result) for answering behavioral interview questions effectively.",
    "Prepare 3-5 insightful questions to ask the interviewer that demonstrate your interest in the role and company.",
    "Always follow up with a thank-you email within 24 hours of your interview to express appreciation and reiterate your interest."
  ],
  salary: [
    "Before negotiating, research salary ranges for similar positions in your location using sites like Glassdoor, Payscale, and LinkedIn Salary.",
    "When discussing compensation, consider the total package including benefits, equity, bonuses, and work flexibility, not just the base salary.",
    "Use specific numbers rather than ranges when negotiating. For example, ask for $87,500 rather than $85,000-$90,000.",
    "Highlight your unique value and specific accomplishments when justifying your salary expectations."
  ],
  promotion: [
    "Document your accomplishments and the value you've added to the organization over time. Quantify results whenever possible.",
    "Take on high-visibility projects that demonstrate your leadership capabilities and willingness to grow.",
    "Build relationships with mentors and sponsors in your organization who can advocate for your advancement.",
    "Schedule a meeting with your manager to discuss your career path and express your interest in advancement opportunities."
  ],
  skills: [
    "Focus on developing T-shaped skills: deep expertise in one area combined with broad knowledge across related disciplines.",
    "Identify skill gaps in your current role or desired position, and create a deliberate learning plan to address them.",
    "Seek hands-on projects that allow you to apply new skills in real-world scenarios, reinforcing your learning.",
    "Consider pursuing relevant certifications or micro-credentials that are recognized in your industry."
  ],
  networking: [
    "Quality matters more than quantity in networking. Focus on building meaningful relationships rather than collecting connections.",
    "Follow the 'give first' principle: look for ways to provide value to your network before asking for favors.",
    "Schedule regular networking activities such as attending industry events or setting up coffee chats with colleagues.",
    "Maintain and nurture your network with regular check-ins, even when you don't need anything specific."
  ],
  career_change: [
    "Before making a career change, conduct informational interviews with professionals in your target field to gain realistic insights.",
    "Identify transferable skills from your current role that would be valuable in your desired field.",
    "Consider taking on side projects, volunteering, or freelancing to build experience in your new field while maintaining your current job.",
    "Develop a compelling narrative that explains your career transition in a way that emphasizes the value you bring to the new role."
  ],
  leadership: [
    "Effective leaders focus on developing their emotional intelligence to better understand and motivate their team members.",
    "Practice delegating tasks appropriately, giving team members both responsibility and authority to complete their work.",
    "Establish clear communication channels and provide regular, constructive feedback to team members.",
    "Lead by example and demonstrate the work ethic and values you expect from your team."
  ],
  general: [
    "Consider creating a personal board of directors - a small group of trusted advisors from different backgrounds who can provide diverse perspectives on career decisions.",
    "Regularly reassess your career goals and values to ensure alignment between your work and personal priorities.",
    "Invest time in building your personal brand through thought leadership, public speaking, or content creation in your area of expertise.",
    "Develop a growth mindset that embraces challenges, persists through obstacles, and views failures as opportunities to learn and improve."
  ]
};

// Categories for keyword matching
export const categories: Record<string, string[]> = {
  interviews: ["interview", "hiring", "questions", "recruiter", "preparation"],
  salary: ["salary", "compensation", "negotiate", "pay", "raise", "money", "benefits"],
  promotion: ["promotion", "advance", "career path", "growth", "next level", "senior"],
  skills: ["skills", "learn", "training", "develop", "expertise", "knowledge"],
  networking: ["network", "connection", "contact", "relationship", "linkedin"],
  career_change: ["change", "transition", "pivot", "switch", "new field", "different role"],
  leadership: ["leader", "manage", "team", "supervise", "executive", "director"],
  general: ["career", "job", "work", "professional", "advice"]
};
