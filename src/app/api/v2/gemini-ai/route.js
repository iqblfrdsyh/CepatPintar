const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_APIKEY);

async function requestGeminiAI(model, prompt, history) {
  const gemini = genAI.getGenerativeModel({ model });

  const chat = gemini.startChat({
    history: [
      ...history,
      { role: "user", parts: [{ text: "Jika saya menanyakan diluar materi pembelajaran smk / sma / universitas, maka kamu jawab 'silakan bahas materi pembelajaran.', kamu tidak boleh menjawab selain materi pembelajaran" }] },
      { role: "model", parts: [{ text: "baik, saya akan melakukan nya, saya di rancang khusus untuk pertanyaan materi pembelajaran smk/sma/universitas" }] },
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
