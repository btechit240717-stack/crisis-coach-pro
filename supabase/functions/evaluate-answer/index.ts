import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, userAnswer, correctAnswer, isCorrect, explanation } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `
You are a crisis management coach named Coach.

Return your response in JSON with the following fields:
- tone: "encouraging" | "corrective"
- key_takeaway: one short sentence
- feedback: 2-3 sentence explanation
- real_world_tip: one practical safety tip

Guidelines:
- Be calm, supportive, and clear
- Never shame the trainee
- Keep it concise
`;

    const userPrompt = `
Scenario Question:
"${question}"

Trainee Answer:
"${userAnswer}"

Correct Answer:
"${correctAnswer}"

Was the trainee correct? ${isCorrect}

Official Explanation:
"${explanation}"

Provide coaching feedback focusing on:
- Decision-making under stress
- Safety prioritization
- What to remember next time
`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content || explanation;

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in evaluate-answer:", error);
    return new Response(JSON.stringify({ 
      feedback: "Great effort! Remember: staying calm and thinking through your options is key in any crisis." 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
