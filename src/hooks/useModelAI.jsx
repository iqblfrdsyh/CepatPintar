import { create } from "zustand";

const useAIModel = create((set) => ({
  AIModel: "gemini-1.5-flash",
  switchAIModel: (model) => set(() => ({ AIModel: model })),
}));

export default useAIModel;
