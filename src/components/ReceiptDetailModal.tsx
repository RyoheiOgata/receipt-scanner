"use client";

import { useEffect } from "react";
import { ReceiptData } from "@/types/receipt";

type Props = {
  receipt: ReceiptData;
  onUpdate: (id: string, field: "date" | "storeName" | "amount", value: string) => void;
  onClose: () => void;
};

export default function ReceiptDetailModal({ receipt, onUpdate, onClose }: Props) {
  // Escキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // スクロール抑制
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg truncate">{receipt.fileName}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* コンテンツ: 左に画像、右にデータ */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* 画像 */}
          <div className="md:w-3/5 p-6 flex items-center justify-center bg-gray-50 overflow-auto">
            <img
              src={receipt.imageUrl}
              alt={receipt.fileName}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>

          {/* 抽出データ */}
          <div className="md:w-2/5 p-6 overflow-auto">
            {receipt.status === "pending" && (
              <p className="text-gray-400">待機中...</p>
            )}

            {receipt.status === "processing" && (
              <div className="flex items-center gap-2 text-blue-600">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                読み取り中...
              </div>
            )}

            {receipt.status === "error" && (
              <p className="text-red-600 text-sm">
                エラー: {receipt.error || "不明なエラー"}
              </p>
            )}

            {receipt.status === "done" && (
              <div className="space-y-5">
                <h3 className="font-medium text-gray-800">抽出データ</h3>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">日付</label>
                  <input
                    type="text"
                    value={receipt.date}
                    onChange={(e) => onUpdate(receipt.id, "date", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">店舗名</label>
                  <input
                    type="text"
                    value={receipt.storeName}
                    onChange={(e) => onUpdate(receipt.id, "storeName", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">金額</label>
                  <input
                    type="text"
                    value={receipt.amount}
                    onChange={(e) => onUpdate(receipt.id, "amount", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
