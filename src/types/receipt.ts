export type ReceiptData = {
  id: string;
  fileName: string;
  imageUrl: string;
  date: string;
  storeName: string;
  amount: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
};
