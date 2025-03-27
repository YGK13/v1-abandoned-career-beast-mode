
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostSuggestion } from "./PostSuggestionTypes";

const defaultPosts: PostSuggestion[] = [
  {
    id: "post1",
    content: "After 5 years implementing product strategies across various industries, I've noticed a consistent pattern: companies that prioritize user research before roadmap planning see 32% higher user retention rates on average.\n\nHere are 3 research methods that have consistently yielded the most actionable insights for my teams:\n\n1️⃣ Contextual inquiry: Observing users in their natural environment revealed unexpected use cases that our surveys completely missed\n\n2️⃣ Jobs-to-be-done interviews: Understanding the progress users are trying to make helped us pivot a failing feature into our most-used tool\n\n3️⃣ Competitor experience mapping: Creating experience flows across competing products exposed critical gaps in the market\n\nThe key isn't just gathering data, but creating systems where insights flow directly into your prioritization framework. When leadership sees the direct connection between research findings and business outcomes, securing resources becomes much easier.\n\nWhat research methods have delivered the most value for your product team?",
    type: "personal",
    engagement: "high",
    bestTimeToPost: "Tuesday or Wednesday, 8-10am",
    audienceInsight: "Product managers and UX researchers most engaged"
  },
  {
    id: "post2",
    content: "The AI revolution in product management isn't replacing PMs - it's creating a new category of \"AI-augmented product managers\" who leverage these tools strategically.\n\nAfter experimenting with AI across our product workflow for the past 6 months, here's what's actually working:\n\n✅ User feedback synthesis: Analyzing thousands of feedback points in minutes instead of days\n\n✅ Competitive analysis acceleration: Generating comprehensive feature matrices across multiple competitors\n\n✅ First-draft specifications: Creating solid documentation foundations that require less rework\n\n✅ User story refinement: Enhancing clarity and completeness of our backlog\n\n❌ Strategy development: Still requires deep business understanding and stakeholder alignment\n\n❌ Prioritization decisions: Human judgment on impact vs. effort remains superior\n\nThe most successful teams aren't just adopting AI tools, they're redesigning their processes to leverage AI's strengths while amplifying human creativity and strategic thinking.\n\nI've documented our full AI integration process here: [link]\n\nAre you incorporating AI into your product workflow? What's working and what still requires the human touch?",
    type: "trend",
    engagement: "high",
    bestTimeToPost: "Thursday, 11am-1pm",
    audienceInsight: "Tech leaders and innovation teams most engaged"
  },
  {
    id: "post3",
    content: "Unpopular opinion: Most product roadmaps are fantasy documents that create more problems than they solve.\n\nAfter leading product across 3 companies and analyzing dozens of roadmap approaches, I've found that detailed 6+ month roadmaps almost always fail for these reasons:\n\n1. Market conditions change faster than roadmaps can adapt\n\n2. They create false expectations with stakeholders who treat dates as commitments\n\n3. They encourage solution-thinking before proper problem validation\n\n4. They reduce team agility and responsiveness to user needs\n\nInstead, the most successful teams I've worked with use a different approach:\n\n• A clear product strategy that articulates the problems worth solving\n\n• 6-week shipping cycles with dedicated discovery time\n\n• Outcome-based objectives rather than feature promises\n\n• Regular stakeholder education on why this approach delivers more value\n\nWhen we switched from roadmap-thinking to this discovery-driven approach at my current company, we doubled our impact metrics while reducing wasted development by 40%.\n\nThe best roadmap isn't a roadmap at all—it's a shared understanding of the problems worth solving and the outcomes that matter.\n\nAgree or disagree?",
    type: "opinion",
    engagement: "medium",
    bestTimeToPost: "Monday, 10am-12pm",
    audienceInsight: "Product leaders and agile practitioners most engaged"
  },
  {
    id: "post4",
    content: "According to McKinsey's 2023 State of Product Management report, only 16% of product leaders believe their organization effectively translates customer insights into product decisions. This disconnect represents a massive opportunity.\n\nDrawing from my experience leading product teams across B2B and B2C environments, I've identified five data-driven approaches that consistently bridge this gap:\n\n1. Customer Advisory Boards with quarterly deep-dives (3.2x higher feature adoption rates)\n\n2. Integrated feedback loops across marketing, sales, and support (48% reduction in feature rework)\n\n3. Rapid prototyping programs tied to specific user segments (2.5x improvement in initial user satisfaction)\n\n4. Outcome-oriented metrics visible across the organization (71% better alignment between teams)\n\n5. Cross-functional insight sessions scheduled before planning cycles (54% more viable ideas entering the backlog)\n\nOrganizations that implemented at least 3 of these approaches saw revenue growth outperform their category by an average of 27% according to our internal analysis.\n\nI've published a detailed implementation guide for each approach here: [link]\n\nWhich customer insight methods have delivered the most business impact for your organization?",
    type: "data",
    engagement: "high",
    bestTimeToPost: "Tuesday, 1-3pm",
    audienceInsight: "Senior leaders and strategists most engaged"
  }
];

export const useLinkedInPosts = () => {
  const { toast } = useToast();
  const [postSuggestions, setPostSuggestions] = useState<PostSuggestion[]>(defaultPosts);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handleCopyPost = (post: string, id: string) => {
    navigator.clipboard.writeText(post);
    setCopiedPostId(id);
    toast({
      title: "Post copied",
      description: "Ready to paste to LinkedIn",
    });
    
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  const toggleExpand = (id: string) => {
    setPostSuggestions(prev => 
      prev.map(post => 
        post.id === id ? { ...post, expanded: !post.expanded } : post
      )
    );
  };

  const refreshPosts = () => {
    // This would typically fetch new posts from an API
    // For now, we'll just reset the current posts
    setPostSuggestions(defaultPosts);
    toast({
      title: "Posts refreshed",
      description: "New post suggestions loaded",
    });
  };

  return {
    postSuggestions,
    copiedPostId,
    handleCopyPost,
    toggleExpand,
    refreshPosts
  };
};
