import { NextRequest, NextResponse } from "next/server";
import { extractReceiptData } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json();

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "image と mimeType は必須です" },
        { status: 400 }
      );
    }

    const data = await extractReceiptData(image, mimeType);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Receipt extraction error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "抽出に失敗しました" },
      { status: 500 }
    );
  }
}
