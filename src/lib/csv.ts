import { ReceiptData } from "@/types/receipt";

export function generateCsv(receipts: ReceiptData[]): string {
  const BOM = "\uFEFF";
  const header = "日付,店舗名,金額";
  const rows = receipts
    .filter((r) => r.status === "done")
    .map((r) => {
      const storeName = r.storeName.includes(",")
        ? `"${r.storeName.replace(/"/g, '""')}"`
        : r.storeName;
      return `${r.date},${storeName},${r.amount}`;
    });

  return BOM + [header, ...rows].join("\n");
}

export function downloadCsv(receipts: ReceiptData[]) {
  const csv = generateCsv(receipts);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipts_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
