"use client";

import { useState, useCallback } from "react";
import { ReceiptData } from "@/types/receipt";
import UploadArea from "@/components/UploadArea";
import ReceiptCard from "@/components/ReceiptCard";
import ReceiptDetailModal from "@/components/ReceiptDetailModal";
import ResultTable from "@/components/ResultTable";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const newReceipts: ReceiptData[] = files.map((file) => ({
      id: crypto.randomUUID(),
      fileName: file.name,
      imageUrl: URL.createObjectURL(file),
      date: "",
      storeName: "",
      amount: 0,
      status: "pending" as const,
    }));

    setReceipts((prev) => [...prev, ...newReceipts]);

    const promises = files.map(async (file, i) => {
      const receipt = newReceipts[i];

      setReceipts((prev) =>
        prev.map((r) =>
          r.id === receipt.id ? { ...r, status: "processing" as const } : r
        )
      );

      try {
        const base64 = await fileToBase64(file);
        const res = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, mimeType: file.type }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "API エラー");
        }

        const data = await res.json();

        setReceipts((prev) =>
          prev.map((r) =>
            r.id === receipt.id
              ? {
                  ...r,
                  date: data.date || "",
                  storeName: data.storeName || "",
                  amount: Number(data.amount) || 0,
                  status: "done" as const,
                }
              : r
          )
        );
      } catch (error) {
        setReceipts((prev) =>
          prev.map((r) =>
            r.id === receipt.id
              ? {
                  ...r,
                  status: "error" as const,
                  error:
                    error instanceof Error ? error.message : "不明なエラー",
                }
              : r
          )
        );
      }
    });

    await Promise.all(promises);
  }, []);

  const handleUpdate = useCallback(
    (id: string, field: "date" | "storeName" | "amount", value: string) => {
      setReceipts((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          if (field === "amount") {
            return { ...r, amount: Number(value) || 0 };
          }
          return { ...r, [field]: value };
        })
      );
    },
    []
  );

  const handleDelete = useCallback((id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const selectedReceipt = receipts.find((r) => r.id === selectedId) ?? null;

  const doneCount = receipts.filter((r) => r.status === "done").length;
  const processingCount = receipts.filter((r) => r.status === "processing").length;

  return (
    <main className="min-h-screen py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 animate-fade-in-up">
          <div className="flex items-end gap-3 mb-2">
            <h1 className="font-serif-jp text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              領収書読み取り
            </h1>
            <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: 'var(--accent)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            画像をアップロードして、日付・店舗名・金額を自動抽出
          </p>
        </header>

        {/* Upload */}
        <section className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <UploadArea onFilesSelected={handleFilesSelected} />
        </section>

        {/* Status bar */}
        {receipts.length > 0 && (
          <div
            className="flex items-center gap-4 mb-6 text-xs animate-fade-in"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <span>{receipts.length} 件のレシート</span>
            {processingCount > 0 && (
              <span style={{ color: 'var(--accent)' }}>
                {processingCount} 件処理中...
              </span>
            )}
            {doneCount > 0 && (
              <span style={{ color: 'var(--success)' }}>
                {doneCount} 件完了
              </span>
            )}
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>
        )}

        {/* Receipt cards */}
        {receipts.length > 0 && (
          <section className="mb-10 stagger-children">
            <div className="grid gap-3">
              {receipts.map((receipt) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  onClick={() => setSelectedId(receipt.id)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* Results table */}
        <ResultTable receipts={receipts} />
      </div>

      {/* Detail modal */}
      {selectedReceipt && (
        <ReceiptDetailModal
          receipt={selectedReceipt}
          onUpdate={handleUpdate}
          onClose={() => setSelectedId(null)}
        />
      )}
    </main>
  );
}
