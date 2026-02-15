import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractReceiptData(base64Image: string, mimeType: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    },
    {
      text: `この領収書・レシート画像から以下の情報を抽出してJSON形式で返してください。
他のテキストは一切含めず、JSONのみを返してください。

{
  "date": "YYYY-MM-DD形式の日付",
  "storeName": "店舗名",
  "amount": 合計金額（数値のみ、円記号やカンマなし）
}

読み取れない項目は date="" storeName="" amount=0 としてください。`,
    },
  ]);

  const text = result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("JSONの抽出に失敗しました");
  }

  return JSON.parse(jsonMatch[0]) as {
    date: string;
    storeName: string;
    amount: number;
  };
}
