"use client";

import { useCallback, useRef, useState } from "react";

type Props = {
  onFilesSelected: (files: File[]) => void;
};

export default function UploadArea({ onFilesSelected }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (imageFiles.length > 0) {
        onFilesSelected(imageFiles);
      }
    },
    [onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer border-transition
        border-2 border-dashed p-10 md:p-14 text-center
        ${isDragging
          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
          : "border-[var(--border-strong)] hover:border-[var(--accent)] bg-[var(--bg-surface)] hover:bg-[var(--accent-soft)]/30"
        }
      `}
    >
      {/* Decorative corner marks */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 rounded-tl-sm opacity-20" style={{ borderColor: 'var(--accent)' }} />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 rounded-tr-sm opacity-20" style={{ borderColor: 'var(--accent)' }} />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 rounded-bl-sm opacity-20" style={{ borderColor: 'var(--accent)' }} />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 rounded-br-sm opacity-20" style={{ borderColor: 'var(--accent)' }} />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Upload icon */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
        <div
          className="absolute inset-0 rounded-full opacity-10"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <svg
          className="w-7 h-7"
          style={{ color: 'var(--accent)' }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>

      <p className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
        領収書画像をドラッグ&ドロップ
      </p>
      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
        またはクリックしてファイルを選択（複数可）
      </p>

      {/* File type hint */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {["JPG", "PNG", "WEBP"].map((ext) => (
          <span
            key={ext}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--bg-muted)',
            }}
          >
            {ext}
          </span>
        ))}
      </div>
    </div>
  );
}
