# 領収書読み取りアプリ

領収書やレシートの画像をアップロードすると、Google Gemini AI が**日付・店舗名・金額**を自動で読み取るWebアプリです。

## 主な機能

- 画像のドラッグ＆ドロップまたはファイル選択によるアップロード
- 複数枚の一括読み取り
- 読み取り結果の手動編集
- 結果一覧の表示とCSVダウンロード

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS 4 |
| AI | Google Gemini 2.0 Flash |
| ランタイム | React 19 |

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトルートに `.env.local` を作成し、Google Gemini の API キーを設定します。

```
GEMINI_API_KEY=your_api_key_here
```

API キーは [Google AI Studio](https://aistudio.google.com/apikey) から取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) にアクセスしてアプリを利用できます。

## プロジェクト構成

```
src/
├── app/
│   ├── api/extract/route.ts   # 画像から情報を抽出するAPIエンドポイント
│   ├── layout.tsx             # ルートレイアウト
│   ├── page.tsx               # メインページ
│   └── globals.css            # グローバルスタイル
├── components/
│   ├── UploadArea.tsx         # 画像アップロードエリア
│   ├── ReceiptCard.tsx        # 読み取り結果カード
│   ├── ReceiptDetailModal.tsx # 詳細・編集モーダル
│   └── ResultTable.tsx        # 結果一覧テーブル
├── lib/
│   ├── gemini.ts              # Gemini API呼び出し
│   └── csv.ts                 # CSV生成・ダウンロード
└── types/
    └── receipt.ts             # 型定義
```

## 使い方

1. 画面上部のエリアに領収書・レシートの画像をドラッグ＆ドロップ（または選択）
2. AI が自動で日付・店舗名・金額を読み取り
3. 結果が正しくない場合はカードをクリックして手動で修正
4. 「CSVダウンロード」ボタンで結果をエクスポート

## スクリプト一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint によるコード検査 |
