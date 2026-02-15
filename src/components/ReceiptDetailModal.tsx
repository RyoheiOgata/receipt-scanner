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
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in"
      style={{ backgroundColor: 'var(--overlay)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col animate-scale-in overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--accent-soft)' }}
            >
              <svg
                className="w-4 h-4"
                style={{ color: 'var(--accent)' }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h2 className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              {receipt.fileName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors text-lg"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Image */}
          <div
            className="md:w-3/5 p-6 flex items-center justify-center overflow-auto"
            style={{ backgroundColor: 'var(--bg-muted)' }}
          >
            <img
              src={receipt.imageUrl}
              alt={receipt.fileName}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            />
          </div>

          {/* Data panel */}
          <div
            className="md:w-2/5 p-6 overflow-auto animate-slide-in-right"
            style={{ borderLeft: '1px solid var(--border)' }}
          >
            {receipt.status === "pending" && (
              <div className="flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-tertiary)' }} />
                待機中...
              </div>
            )}

            {receipt.status === "processing" && (
              <div className="flex items-center gap-3" style={{ color: 'var(--accent)' }}>
                <div className="relative w-5 h-5">
                  <div
                    className="absolute inset-0 rounded-full animate-pulse-ring"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <div
                    className="absolute inset-0.5 rounded-full animate-spin-slow"
                    style={{
                      border: '2px solid transparent',
                      borderTopColor: 'var(--accent)',
                    }}
                  />
                </div>
                <span className="text-sm font-medium">読み取り中...</span>
              </div>
            )}

            {receipt.status === "error" && (
              <div
                className="rounded-lg p-3 text-sm"
                style={{
                  backgroundColor: 'var(--error-soft)',
                  color: 'var(--error)',
                }}
              >
                エラー: {receipt.error || "不明なエラー"}
              </div>
            )}

            {receipt.status === "done" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-jp font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                    抽出データ
                  </h3>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                </div>

                {/* Date field */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    日付
                  </label>
                  <input
                    type="text"
                    value={receipt.date}
                    onChange={(e) => onUpdate(receipt.id, "date", e.target.value)}
                    className="w-full rounded-lg px-3 py-2.5 text-sm transition-all"
                    style={{
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                {/* Store name field */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    店舗名
                  </label>
                  <input
                    type="text"
                    value={receipt.storeName}
                    onChange={(e) => onUpdate(receipt.id, "storeName", e.target.value)}
                    className="w-full rounded-lg px-3 py-2.5 text-sm transition-all"
                    style={{
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                {/* Amount field */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    金額
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={receipt.amount}
                      onChange={(e) => onUpdate(receipt.id, "amount", e.target.value)}
                      className="w-full rounded-lg px-3 py-2.5 pr-8 text-sm transition-all"
                      style={{
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      円
                    </span>
                  </div>
                </div>

                {/* Summary card */}
                <div
                  className="rounded-xl p-4 mt-2"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    border: '1px solid var(--accent)',
                    borderColor: 'rgba(180, 83, 9, 0.15)',
                  }}
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>合計金額</p>
                  <p className="font-serif-jp text-2xl font-semibold tabular-nums" style={{ color: 'var(--accent-hover)' }}>
                    {receipt.amount.toLocaleString()}
                    <span className="text-sm ml-1">円</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
