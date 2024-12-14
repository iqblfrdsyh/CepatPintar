import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function runAI(aiModel, question, history) {
  const models = aiModel.toLowerCase().startsWith("gemini")
    ? "gemini-ai"
    : aiModel;

  try {
    const response = await axios.post(
      `${base_url}/v2/${models}`,
      {
        geminiModel: aiModel,
        content: question,
        geminiHistory: history,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAllUsers(endpoint) {
  try {
    const response = await axios.get(`${base_url}/${endpoint}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateData(endpoint, userId) {
  try {
    const response = await axios.get(`${base_url}/${endpoint}/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
