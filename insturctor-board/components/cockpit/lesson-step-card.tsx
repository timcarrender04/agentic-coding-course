import type { Step } from "@/types/curriculum";

import { Icon } from "./icon";

export function LessonStepCard({
  step,
  active,
  scale = "default",
}: {
  step: Step;
  active: boolean;
  scale?: "default" | "projector";
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
        {step.kind === "warning" ? <Icon name="warning" /> : step.index}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className={`${bodySize} text-[var(--color-ink)] [&_code]:font-code [&_code]:bg-[var(--color-panel-tint)] [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-[var(--color-secondary)]`}
          dangerouslySetInnerHTML={{ __html: renderInline(step.body) }}
        />
        {step.code && step.code.length > 0 && (
          <div className="mt-3 space-y-2">
            {step.code.map((c, i) => (
              <pre
                key={i}
                className={`bg-[var(--color-ink)] text-[var(--color-panel)] p-3 ${codeSize} font-code overflow-x-auto rounded-sm border-l-4 border-[var(--color-primary)]`}
              >
                <code>{c.source}</code>
              </pre>
            ))}
          </div>
        )}
      </div>
    </li>
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
