
import { GoogleGenAI, Modality } from "@google/genai";

// Strictly following initialization guidelines: new GoogleGenAI({ apiKey: process.env.API_KEY })
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Вы — 'Вар-Бот', официальный ИИ-талисман игрового сообщества 'Teams War'. 
        Teams War — это тактический многопользовательский шутер. 
        Вы полезны, немного азартны и полны энтузиазма по поводу игр. 
        Отвечайте пользователям в глобальном чате на русском языке. Ответы должны быть краткими (не более 3 предложений).`,
        temperature: 0.8,
      }
    });
    return response.text || "Я готов к следующему матчу! Какова наша стратегия?";
  } catch (error) {
    console.error("Ошибка Gemini:", error);
    return "Серверная комната под обстрелом! Попробуйте позже.";
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Скажи по-военному, но бодро: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Мужской сильный голос
          },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
