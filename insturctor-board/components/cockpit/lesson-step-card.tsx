"use client";

import { useState } from "react";

import type { Step } from "@/types/curriculum";

import { Icon } from "./icon";

const LANG_ICONS: Record<string, string> = {
  bash: "terminal",
  sh: "terminal",
  shell: "terminal",
  zsh: "terminal",
  console: "terminal",
  yaml: "settings",
  yml: "settings",
  dockerfile: "settings",
  conf: "settings",
  ini: "settings",
  env: "settings",
  json: "data_object",
  markdown: "description",
  md: "description",
  text: "notes",
};

export function LessonStepCard({
  step,
  active,
  scale = "default",
  allowCopy = true,
}: {
  step: Step;
  active: boolean;
  scale?: "default" | "projector";
  allowCopy?: boolean;
}) {
  const numSize =
    scale === "projector" ? "w-12 h-12 text-xl" : "w-8 h-8 text-base";
  const bodySize =
    scale === "projector" ? "text-2xl leading-relaxed" : "text-lg leading-relaxed";
  const codeSize = scale === "projector" ? "text-lg" : "text-sm";

  return (
    <li
      className={`flex gap-4 group ${active ? "" : "opacity-50"}`}
      data-active={active}
    >
      <span
        className={`flex-shrink-0 ${numSize} rounded flex items-center justify-center font-bold ${
          active
            ? "bg-[var(--color-primary)] text-white"
            : "bg-[var(--color-ink)] text-[var(--color-panel)]"
        }`}
      >
        {step.kind === "warning" ? (
          <Icon name="warning" />
        ) : step.kind === "code" ? (
          <Icon name="code" />
        ) : step.kind === "checkpoint" ? (
          <Icon name="flag" />
        ) : (
          step.index
        )}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className={`${bodySize} text-[var(--color-ink)] [&_code]:font-code [&_code]:bg-[var(--color-panel-tint)] [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-[var(--color-secondary)]`}
          dangerouslySetInnerHTML={{ __html: renderInline(step.body) }}
        />
        {step.code && step.code.length > 0 && (
          <div className="mt-3 space-y-2">
            {step.code.map((c, i) => (
              <CodeBlock
                key={i}
                allowCopy={allowCopy}
                codeSize={codeSize}
                lang={c.lang}
                source={c.source}
              />
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function CodeBlock({
  lang,
  source,
  codeSize,
  allowCopy,
}: {
  lang: string;
  source: string;
  codeSize: string;
  allowCopy: boolean;
}) {
  const icon = LANG_ICONS[lang.toLowerCase()] ?? "code";

  return (
    <div className="rounded-sm overflow-hidden border-l-4 border-[var(--color-primary)]">
      <div className="flex items-center justify-between bg-[var(--color-ink)] text-[var(--color-panel)] px-3 py-1.5 border-b border-white/10">
        <span className="flex items-center gap-1.5 text-[11px] font-code uppercase tracking-wider opacity-70">
          <Icon className="text-sm" name={icon} />
          {lang}
        </span>
        {allowCopy ? <CopyButton source={source} /> : null}
      </div>
      <pre
        className={`bg-[var(--color-ink)] text-[var(--color-panel)] p-3 ${codeSize} font-code overflow-x-auto ${
          allowCopy ? "" : "select-none cursor-default"
        }`}
      >
        <code>{source}</code>
      </pre>
    </div>
  );
}

function CopyButton({ source }: { source: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      aria-label={copied ? "Copied" : "Copy code"}
      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(source);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // ignore
        }
      }}
    >
      <Icon className="text-sm" name={copied ? "check" : "content_copy"} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function renderInline(md: string): string {
  return md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n+/g, "</p><p class='mt-2'>")
    .replace(/^/, "<p>")
    .concat("</p>");
}
