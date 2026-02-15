"use client";

import { ReceiptData } from "@/types/receipt";

type Props = {
  receipt: ReceiptData;
  onClick: () => void;
  onDelete: (id: string) => void;
};

export default function ReceiptCard({ receipt, onClick, onDelete }: Props) {
  return (
    <div
      className="relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* 削除ボタン */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(receipt.id);
        }}
        className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-500 hover:text-white text-gray-500 text-sm font-bold transition-colors"
        aria-label="削除"
      >
        &times;
      </button>

      <div className="flex items-center gap-3 p-3">
        {/* サムネイル */}
        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
          <img
            src={receipt.imageUrl}
            alt={receipt.fileName}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* 概要 */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">
            {receipt.fileName}
          </p>

          {receipt.status === "pending" && (
            <p className="text-xs text-gray-400 mt-1">待機中...</p>
          )}

          {receipt.status === "processing" && (
            <div className="flex items-center gap-1 mt-1">
              <svg
                className="animate-spin h-3 w-3 text-blue-600"
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
              <span className="text-xs text-blue-600">読み取り中...</span>
            </div>
          )}

          {receipt.status === "error" && (
            <p className="text-xs text-red-600 mt-1 truncate">
              エラー: {receipt.error || "不明なエラー"}
            </p>
          )}

          {receipt.status === "done" && (
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
              <span>{receipt.date}</span>
              <span className="truncate">{receipt.storeName}</span>
              <span className="font-medium ml-auto flex-shrink-0">
                {receipt.amount.toLocaleString()}円
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
