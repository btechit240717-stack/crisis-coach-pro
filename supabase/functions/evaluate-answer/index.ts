import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Authenticated user:", user.id);

    const { question, userAnswer, correctAnswer, isCorrect, explanation } =
      await req.json();

    // Basic input validation
    if (!question || !userAnswer || !correctAnswer || typeof isCorrect !== "boolean") {
      console.error("Invalid input parameters");
      return new Response(
        JSON.stringify({ error: "Invalid input parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    /* ---------------- SYSTEM PROMPT ---------------- */
    const systemPrompt = `
You are a crisis management coach named Coach.

Return ONLY valid JSON with these fields:
- tone: "encouraging" | "corrective"
- key_takeaway: one short sentence
- feedback: 2-3 sentence explanation
- real_world_tip: one practical safety tip
- consequence: one short sentence describing what might happen in real life if the trainee's choice was followed (e.g., "Running could trigger the animal's chase instinct, increasing injury risk.")

Rules:
- No markdown
- No backticks
- No extra text outside JSON
- Be calm, supportive, and concise
- The consequence should be realistic and educational
`;

    /* ---------------- USER PROMPT ---------------- */
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

Focus on:
- Decision-making under stress
- Safety prioritization
- What to remember next time
- The realistic consequence of the trainee's specific choice
`;

    /* ---------------- AI CALL ---------------- */
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();

    /* ---------------- SAFE PARSING ---------------- */
    let parsedFeedback;

    try {
      const raw = data.choices?.[0]?.message?.content ?? "";
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsedFeedback = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse failed:", err);

      parsedFeedback = {
        tone: isCorrect ? "encouraging" : "corrective",
        key_takeaway: "Stay calm and prioritize safety.",
        feedback: explanation,
        real_world_tip:
          "Pause, assess your surroundings, and choose the safest option.",
        consequence: isCorrect 
          ? "Your choice helps maintain safety and control of the situation."
          : "This choice could escalate the situation or increase risk of harm.",
      };
    }

    /* ---------------- FINAL RESPONSE ---------------- */
    return new Response(JSON.stringify(parsedFeedback), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in evaluate-answer function:", error);

    return new Response(
      JSON.stringify({
        tone: "encouraging",
        key_takeaway: "Staying calm is essential in emergencies.",
        feedback:
          "You made an effort, and that matters. In real situations, slowing down your thinking helps you make safer choices.",
        real_world_tip:
          "Take a breath, observe carefully, and avoid sudden movements.",
        consequence: "Every decision shapes the outcome—practice builds better instincts.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
