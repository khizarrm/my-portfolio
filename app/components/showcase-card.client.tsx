"use client";

import { ReactNode, useState } from "react";
import { Copy, Check } from "lucide-react";

interface ShowcaseCardProps {
  title: string;
  description: ReactNode;
  source: string;
  prompt: string;
  children: ReactNode;
}

export default function ShowcaseCard({
  title,
  description,
  source,
  prompt,
  children,
}: ShowcaseCardProps) {
  const [copied, setCopied] = useState<"code" | "prompt" | null>(null);

  const copy = async (text: string, which: "code" | "prompt") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      <div className="rounded-2xl bg-[#1A1A1A] p-8">{children}</div>

      <div className="flex gap-3">
        <button
          onClick={() => copy(source, "code")}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors"
        >
          {copied === "code" ? (
            <>
              <Check size={14} className="text-teal" /> copied
            </>
          ) : (
            <>
              <Copy size={14} /> copy code
            </>
          )}
        </button>
        <button
          onClick={() => copy(prompt, "prompt")}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors"
        >
          {copied === "prompt" ? (
            <>
              <Check size={14} className="text-teal" /> copied
            </>
          ) : (
            <>
              <Copy size={14} /> copy prompt
            </>
          )}
        </button>
      </div>
    </section>
  );
}
