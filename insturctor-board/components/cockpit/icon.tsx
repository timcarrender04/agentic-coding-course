export function Icon({
  name,
  className,
  fill,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`material-symbols-outlined select-none ${className ?? ""}`}
      style={
        fill ? { fontVariationSettings: '"FILL" 1' } : undefined
      }
    >
      {name}
    </span>
  );
}
