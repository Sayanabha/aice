const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function askGroq(moodTile, userMessage, flavorList) {
  const prompt = `You are Pengu, a cheerful and witty penguin mascot for Aice, a premium ice cream shop. You recommend ice creams based on people's moods. Keep responses warm, playful, and concise.

Available flavors:
${JSON.stringify(
    flavorList.map(f => ({
      id: f.id,
      name: f.name,
      emoji: f.emoji,
      desc: f.desc,
      tags: f.tags,
      category: f.category,
    }))
  )}

Customer's selected mood: "${moodTile || "not specified"}"
Customer's message: "${userMessage}"

Respond as Pengu the penguin. Be playful, warm, 2-3 sentences max. Occasionally reference being a penguin (waddling, loving the cold, etc).
Then recommend exactly 2-3 flavors that best match the mood.

Respond ONLY with valid JSON — no markdown fences, no extra text whatsoever:
{"message": "Pengu's response here", "recommendations": [{"id": <number>, "reason": "<reason under 12 words>"}, {"id": <number>, "reason": "<reason under 12 words>"}]}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.9,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "You are Pengu, a fun penguin ice cream recommender. Always respond with pure JSON only — no markdown, no code fences, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "{}";
  const clean = raw.replace(/```json\n?|```/g, "").trim();
  return JSON.parse(clean);
}