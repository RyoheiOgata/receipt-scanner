"use client";

import { ReceiptData } from "@/types/receipt";
import { downloadCsv } from "@/lib/csv";

type Props = {
  receipts: ReceiptData[];
};

export default function ResultTable({ receipts }: Props) {
  const doneReceipts = receipts.filter((r) => r.status === "done");

  if (doneReceipts.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">抽出結果一覧</h2>
        <button
          onClick={() => downloadCsv(receipts)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          CSVダウンロード
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">ファイル名</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">日付</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">店舗名</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">金額</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {doneReceipts.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">
                  {r.fileName}
                </td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.storeName}</td>
                <td className="px-4 py-3 text-right">
                  {r.amount.toLocaleString()}円
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-medium">
            <tr>
              <td className="px-4 py-3" colSpan={3}>合計</td>
              <td className="px-4 py-3 text-right">
                {doneReceipts
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}
                円
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
