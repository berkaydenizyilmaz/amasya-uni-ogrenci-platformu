import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// API anahtarını kontrol et
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Model yapılandırması
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Prompt hazırlama
    const prompt = {
      contents: [{
        parts: [{
          text: `Sen Amasya şehrinin dijital rehberisin. Amasya'nın tarihi, kültürü, yemekleri ve gezilecek yerleri hakkında bilgi veriyorsun. Lütfen aşağıdaki soruyu Türkçe ve samimi bir dille yanıtla ve çok uzun cevaplar verme:

${message}`
        }]
      }]
    };

    // İçerik oluşturma
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);

    // Hata yönetimi
    const errorMessage = error.message || "Bilinmeyen bir hata oluştu";
    const statusCode = error.status || 500;

    return NextResponse.json(
      { 
        error: "Üzgünüm, şu anda size yardımcı olamıyorum.",
        details: errorMessage,
        status: statusCode 
      },
      { status: statusCode }
    );
  }
} 