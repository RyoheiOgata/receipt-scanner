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
      className="relative rounded-xl overflow-hidden cursor-pointer card-hover"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
      onClick={onClick}
    >
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(receipt.id);
        }}
        className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100"
        style={{
          backgroundColor: 'var(--bg-muted)',
          color: 'var(--text-tertiary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--error)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
          e.currentTarget.style.color = 'var(--text-tertiary)';
        }}
        aria-label="削除"
      >
        &times;
      </button>

      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail */}
        <div
          className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-muted)' }}
        >
          <img
            src={receipt.imageUrl}
            alt={receipt.fileName}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {receipt.fileName}
          </p>

          {receipt.status === "pending" && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-tertiary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>待機中...</span>
            </div>
          )}

          {receipt.status === "processing" && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="relative w-4 h-4">
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
              <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                読み取り中...
              </span>
            </div>
          )}

          {receipt.status === "error" && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--error)' }} />
              <span className="text-xs truncate" style={{ color: 'var(--error)' }}>
                エラー: {receipt.error || "不明なエラー"}
              </span>
            </div>
          )}

          {receipt.status === "done" && (
            <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {receipt.date}
              </span>
              <span className="truncate">{receipt.storeName}</span>
            </div>
          )}
        </div>

        {/* Amount badge for done items */}
        {receipt.status === "done" && (
          <div className="flex-shrink-0 text-right">
            <span
              className="font-serif-jp text-lg font-semibold tabular-nums"
              style={{ color: 'var(--text-primary)' }}
            >
              {receipt.amount.toLocaleString()}
            </span>
            <span className="text-xs ml-0.5" style={{ color: 'var(--text-tertiary)' }}>円</span>
          </div>
        )}
      </div>

      {/* Bottom accent line for done items */}
      {receipt.status === "done" && (
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(to right, var(--accent), transparent)`,
            opacity: 0.2,
          }}
        />
      )}
    </div>
  );
}
