import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_APIKEY,
});

const requestGroqAI = async (content) => {
  const replyGroq = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
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
