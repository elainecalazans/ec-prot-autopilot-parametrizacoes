import { T } from "../../../components/ui";

export default function SecaoDados({ titulo, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: T.mutedForeground }}>{titulo}</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
    </div>
  );
}
