import { T } from "../../../components/ui";

export default function CampoDado({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 min-w-0 ${className}`}>
      <span className="text-[11px]" style={{ color: T.mutedForeground }}>{label}</span>
      <div className="text-sm">{value}</div>
    </div>
  );
}
