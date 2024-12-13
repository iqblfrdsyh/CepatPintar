import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_APIKEY,
});

let conversationHistory = [
  {
    role: "system",
    content:
      "You are an AI assistant that is useful for answering questions related to educational content, specifically for subjects in SMK, SMA, and University. Please focus only on this topic and avoid providing information outside of this scope. No games, no off-topic discussions, and do not answer abbreviations like 'lol', 'y', and others that are not part of the educational material. You must focus on educational content.\n\nYou can assist with subjects like Mathematics, Science, Programming, and others at various education levels including SMK, SMA, and University. Answer the questions with this context in mind.\n\nIf my question is in Indonesian text, please answer in Indonesian; if not, answer in English.",
  },
  {
    role: "system",
    content:
      "You can help with subjects like Math, Science, Programming, and more at various educational levels including SMK, SMA, and University. Answer questions with this context in mind.",
  },
  {
    role: "system",
    content: "your name is Amelia",
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
