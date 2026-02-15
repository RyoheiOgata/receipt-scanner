"use client";

import { ReceiptData } from "@/types/receipt";
import { downloadCsv } from "@/lib/csv";

type Props = {
  receipts: ReceiptData[];
};

export default function ResultTable({ receipts }: Props) {
  const doneReceipts = receipts.filter((r) => r.status === "done");

  if (doneReceipts.length === 0) return null;

  const total = doneReceipts.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-in-up"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <h2 className="font-serif-jp font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
            抽出結果一覧
          </h2>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
          >
            {doneReceipts.length}件
          </span>
        </div>
        <button
          onClick={() => downloadCsv(receipts)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all btn-press"
          style={{
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-surface)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          CSVダウンロード
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th
                className="text-left px-6 py-3 text-xs font-medium tracking-wider uppercase"
                style={{ color: 'var(--text-tertiary)' }}
              >
                ファイル名
              </th>
              <th
                className="text-left px-6 py-3 text-xs font-medium tracking-wider uppercase"
                style={{ color: 'var(--text-tertiary)' }}
              >
                日付
              </th>
              <th
                className="text-left px-6 py-3 text-xs font-medium tracking-wider uppercase"
                style={{ color: 'var(--text-tertiary)' }}
              >
                店舗名
              </th>
              <th
                className="text-right px-6 py-3 text-xs font-medium tracking-wider uppercase"
                style={{ color: 'var(--text-tertiary)' }}
              >
                金額
              </th>
            </tr>
          </thead>
          <tbody>
            {doneReceipts.map((r, i) => (
              <tr
                key={r.id}
                className="table-row-hover"
                style={{
                  borderBottom: i < doneReceipts.length - 1 ? '1px solid var(--border)' : 'none',
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <td className="px-6 py-3.5 truncate max-w-[200px]" style={{ color: 'var(--text-tertiary)' }}>
                  {r.fileName}
                </td>
                <td className="px-6 py-3.5 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {r.date}
                </td>
                <td className="px-6 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                  {r.storeName}
                </td>
                <td className="px-6 py-3.5 text-right tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                  {r.amount.toLocaleString()}
                  <span className="text-xs ml-0.5" style={{ color: 'var(--text-tertiary)' }}>円</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with total */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderTop: '2px solid var(--border)',
          backgroundColor: 'var(--bg-muted)',
        }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          合計
        </span>
        <span className="font-serif-jp text-xl font-semibold tabular-nums" style={{ color: 'var(--accent-hover)' }}>
          {total.toLocaleString()}
          <span className="text-sm ml-0.5" style={{ color: 'var(--accent)' }}>円</span>
        </span>
      </div>
    </div>
  );
}
