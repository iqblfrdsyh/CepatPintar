import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_APIKEY,
});

let conversationHistory = [
  {
    role: "system",
    content:
      "You are a helpful AI assistant specialized in answering questions related to educational content, specifically for SMK, SMA, and University subjects. Please focus only on these topics and avoid providing information outside of this scope. no game, no out of topic",
  },
  {
    role: "system",
    content:
      "You can help with subjects like Math, Science, Programming, and more at various educational levels including SMK, SMA, and University. Answer questions with this context in mind.",
  },
  {
    role: "system",
    content:
      "if text indonesia answer with indonesia language, if not answer with english.",
  },
];

const requestGroqAI = async (content) => {
  conversationHistory.push({
    role: "user",
    content,
  });

  const replyGroq = await groq.chat.completions.create({
    messages: conversationHistory,
    model: "llama3-8b-8192",
  });

  conversationHistory.push({
    role: "assistant",
    content: replyGroq.choices[0].message.content,
  });

  return replyGroq;
};

export async function POST(request) {
  try {
    const { content } = await request.json();
    const response = await requestGroqAI(content);
    return Response.json({
      headers: {
        "Content-Type": "application/json",
      },
      body: response,
    });
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
