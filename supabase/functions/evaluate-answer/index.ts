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

    const systemPrompt = `You are a friendly crisis management coach named Coach. Your role is to evaluate answers to emergency scenario questions and provide brief, encouraging feedback.

Guidelines:
- Be warm, supportive, and concise (2-3 sentences max)
- If correct: Praise their thinking and reinforce why it's the best choice
- If wrong: Gently explain the better approach without being harsh
- Use simple, clear language
- End with an encouraging note about staying calm under pressure`;

    const userPrompt = isCorrect
      ? `The trainee correctly answered this crisis scenario:
Question: "${question}"
Their answer: "${userAnswer}"

Provide brief, positive feedback reinforcing why this was the right choice. Reference the explanation: "${explanation}"`
      : `The trainee needs guidance on this crisis scenario:
Question: "${question}"
Their answer: "${userAnswer}"
Correct answer: "${correctAnswer}"

Gently explain why the correct answer is better. Reference: "${explanation}"`;

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
