const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_APIKEY);

async function requestGeminiAI(model, prompt, history) {
  const gemini = genAI.getGenerativeModel({ model });

  const chat = gemini.startChat({
    history: [
      ...history,
      {
        role: "user",
        parts: [
          {
            text: "You are a helpful AI assistant specialized in answering questions related to educational content, specifically for SMK, SMA, and University subjects. Please focus only on these topics and avoid providing information outside of this scope. no game, no out of topic \n\nYou can help with subjects like Math, Science, Programming, and more at various educational levels including SMK, SMA, and University. Answer questions with this context in mind. \n\nif text indonesia answer with indonesia language, if not answer with english.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I am an AI assistant designed to help answer questions related to educational content, specifically for SMK, SMA, and University subjects. I will only discuss topics within these areas and will not provide information outside of this scope. \n\nI can assist with subjects like Mathematics, Science, Programming, and others at various educational levels, including SMK, SMA, and University. Please ask questions within this context. \n\nIf you ask in Indonesian, I will respond in Indonesian. If not, I will respond in English.",
          },
        ],
      },
    ],
  });

  let result = await chat.sendMessage(prompt);

  const response = await result.response;
  const text = response.text();
  return text;
}

export async function POST(request) {
  try {
    const { geminiModel, content, geminiHistory } = await request.json();
    const response = await requestGeminiAI(geminiModel, content, geminiHistory);
    return new Response(
      JSON.stringify({
        body: {
          choices: [{ message: { content: response } }],
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
