
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const commanderInChiefSummary = `
"Be Your Own Commander-in-Chief" is a comprehensive career development framework that emphasizes:
1. Self-Leadership: Taking command of your own career trajectory through intentional decision-making
2. Strategic Career Planning: Identifying your unique strengths and positioning them for maximum impact
3. Professional Relationship Building: Cultivating meaningful connections that accelerate growth
4. Personal Brand Development: Creating a clear, compelling professional narrative
5. Career Resilience: Building adaptability and perseverance through challenges
6. Value Communication: Effectively demonstrating your contributions and worth
7. Career Environment Design: Creating conditions that support sustainable success
8. Continuous Learning: Developing systems for lifelong skill acquisition
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userMessage, userDocuments, linkedInData, messageHistory } = await req.json();
    
    // Format previous messages for context
    const formattedHistory = messageHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
    
    // Create document context string
    let documentContext = "";
    if (userDocuments && userDocuments.length > 0) {
      documentContext = "User Documents:\n" + userDocuments.join("\n\n");
    }
    
    // Create LinkedIn context string
    let linkedInContext = "";
    if (linkedInData) {
      linkedInContext = "LinkedIn Profile Data:\n" + 
        `Current Role: ${linkedInData.currentRole}\n` +
        `Skills: ${linkedInData.skills.join(", ")}\n` +
        `Connections: ${linkedInData.connections}\n` +
        `Recommendations: ${linkedInData.recommendations}\n` +
        `Engagement Rate: ${linkedInData.engagementRate}`;
    }
    
    // Construct system message with enhanced context
    const systemMessage = {
      role: "system",
      content: `You are an AI Career Coach trained on "Be Your Own Commander-in-Chief" methodology and extensive career development resources. 
      
${commanderInChiefSummary}

Your goal is to provide highly personalized, actionable career guidance based on the user's specific situation.

When advising:
1. Always reference specific details from their documents or LinkedIn profile to personalize advice
2. Cite relevant concepts from "Be Your Own Commander-in-Chief" when applicable
3. Provide specific, actionable next steps they can take
4. Maintain a supportive, empowering, yet honest tone
5. When appropriate, reference industry best practices or relevant research
6. Avoid generic advice - everything should be tailored to their specific situation

${documentContext}

${linkedInContext}

Focus on being both specific and practical in your guidance.`
    };
    
    // Add the initial greeting message if this is the first interaction
    let messages = [systemMessage, ...formattedHistory];
    
    // Add the current user query
    if (userMessage) {
      messages.push({
        role: "user",
        content: userMessage
      });
    }
    
    console.log("Sending request to OpenAI with messages:", JSON.stringify(messages.slice(0, 2) + "... and " + (messages.length - 2) + " more messages"));
    
    // Send request to OpenAI using gpt-4o
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API error:", data.error);
      throw new Error(data.error.message || "Error from OpenAI API");
    }
    
    const aiResponse = data.choices[0].message.content;
    
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error("Error in career-coach-ai function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "An unexpected error occurred"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
