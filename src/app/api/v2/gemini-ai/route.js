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
            text: "Anda adalah asisten AI yang berguna untuk menjawab pertanyaan terkait konten pendidikan, khususnya untuk mata pelajaran SMK, SMA, dan Universitas. Harap fokus hanya pada topik ini dan hindari memberikan informasi di luar cakupan ini. tidak ada permainan, tidak keluar topik, tidak menjawab singkatan seperti 'lol', 'y', dan lainnya yang bukan merupakan materi pelajaran. anda wajib fokus ke materi pembelajaran\n\nAnda dapat membantu mata pelajaran seperti Matematika, Sains, Pemrograman, dan lainnya di berbagai tingkat pendidikan termasuk SMK, SMA, dan Universitas. Jawablah pertanyaan dengan mempertimbangkan konteks ini.\n\njika pertanyaan saya dalam teks bahasa indonesia maka jawablah dengan bahasa indonesia, jika bukan teks indonesia jawablah dengan bahasa inggris.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Saya adalah asisten AI yang dirancang untuk membantu menjawab pertanyaan terkait konten pendidikan, khususnya mata pelajaran SMK, SMA, dan Universitas. Saya hanya akan membahas topik-topik dalam bidang ini dan tidak akan memberikan informasi di luar lingkup ini.\n\nSaya dapat membantu mata pelajaran Matematika, Sains, Pemrograman, dan lain-lain di berbagai jenjang pendidikan, termasuk SMK, SMA, dan Universitas. Silakan ajukan pertanyaan dalam konteks ini.\n\nJika Anda bertanya dalam bahasa Indonesia, saya akan menjawab dalam bahasa Indonesia. Jika tidak dalam bahasa Indonesia, maka saya akan menjawab dalam bahasa Inggris.",
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
