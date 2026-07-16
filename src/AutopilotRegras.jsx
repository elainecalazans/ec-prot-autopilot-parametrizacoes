import React, { useState, useEffect } from "react";
import {
  Building2,
  Landmark,
  Receipt,
  X,
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Users,
  BookOpenCheck,
  SlidersHorizontal,
  CircleCheck,
} from "lucide-react";

/* ============================================================
   PORTADO DE: bhub-design-system-main/src/styles.css
   Valores copiados verbatim (modo claro). O ambiente deste
   artifact não carrega o tema Tailwind do BSystem (sem JIT/
   config custom), então em vez de `bg-primary` etc. os tokens
   são aplicados via style={} inline usando estes mesmos hex —
   mesma fonte de verdade, caminho de aplicação diferente.
   ============================================================ */
const T = {
  background: "#ffffff", foreground: "#0a0a0a",
  card: "#ffffff", cardForeground: "#0a0a0a",
  primary: "#171717", primaryForeground: "#fafafa", primaryHover: "#404040",
  secondary: "#f5f5f5", secondaryForeground: "#171717", secondaryHover: "#fafafa",
  muted: "#f5f5f5", mutedForeground: "#737373",
  accent: "#f5f5f5", accentForeground: "#171717",
  destructive: "#dc2626", destructiveForeground: "#ffffff",
  success: "#16a34a", successForeground: "#ffffff", successText: "#16a34a", successBorder: "#22c55e", successSubtle: "#f0fdf4",
  warning: "#f59e0b", warningForeground: "#ffffff", warningText: "#d97706", warningBorder: "#f59e0b", warningSubtle: "#fffbeb",
  info: "#2563eb", infoForeground: "#ffffff", infoText: "#2563eb", infoBorder: "#3b82f6", infoSubtle: "#eff6ff",
  border: "#e5e5e5", input: "#e5e5e5", ring: "#d4d4d4",
  ghostForeground: "#404040", ghostHover: "#0000000c", outlineHover: "#00000008",
  sidebar: "#fafafa", sidebarForeground: "#404040", sidebarPrimary: "#171717",
  sidebarAccent: "#f5f5f5", sidebarAccentForeground: "#171717", sidebarBorder: "#e5e5e5", sidebarMuted: "#737373",
  shadowXs: "0 1px 2px 0 #0000000c",
  shadowSm: "0 1px 3px 0 #00000019, 0 1px 2px -1px #00000019",
  shadowMd: "0 4px 6px -1px #00000019, 0 2px 4px -2px #00000019",
};

// cn() simplificado — o real usa clsx + tailwind-merge (não disponíveis neste sandbox de artifact)
const cn = (...a) => a.filter(Boolean).join(" ");

/* ============================================================
   PORTADO DE: components/ui/button.tsx
   (variantes/base mantidas; asChild/Slot e CVA removidos —
   não há class-variance-authority disponível aqui)
   ============================================================ */
const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none shrink-0";
const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 gap-1.5 text-sm",
  lg: "h-10 px-6",
};
function buttonStyle(variant, disabled) {
  if (disabled) return { background: T.secondary, color: T.mutedForeground };
  switch (variant) {
    case "secondary": return { background: T.secondary, color: T.secondaryForeground, boxShadow: T.shadowXs };
    case "outline": return { background: "transparent", color: T.foreground, border: `1px solid ${T.border}`, boxShadow: T.shadowXs };
    case "ghost": return { background: "transparent", color: T.ghostForeground };
    case "destructive": return { background: T.destructive, color: T.destructiveForeground, boxShadow: T.shadowXs };
    default: return { background: T.primary, color: T.primaryForeground, boxShadow: T.shadowXs };
  }
}
function Button({ className, variant = "default", size = "default", disabled, style, ...props }) {
  return (
    <button
      data-slot="button" data-variant={variant} data-size={size} disabled={disabled}
      className={cn(buttonBase, buttonSizes[size], className)}
      style={{ ...buttonStyle(variant, disabled), ...style }}
      {...props}
    />
  );
}

/* ============================================================
   PORTADO DE: components/ui/badge.tsx
   ============================================================ */
const badgeBase = "inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1";
function badgeStyle(variant) {
  switch (variant) {
    case "success": return { background: T.successSubtle, color: T.successText, border: `1px solid ${T.successBorder}` };
    case "warning": return { background: T.warningSubtle, color: T.warningText, border: `1px solid ${T.warningBorder}` };
    case "info": return { background: T.infoSubtle, color: T.infoText, border: `1px solid ${T.infoBorder}` };
    case "outline": return { background: "transparent", color: T.foreground, border: `1px solid ${T.border}` };
    case "secondary": return { background: T.secondary, color: T.secondaryForeground };
    default: return { background: T.primary, color: T.primaryForeground };
  }
}
function Badge({ className, variant = "default", children }) {
  return <span data-slot="badge" data-variant={variant} className={cn(badgeBase, className)} style={badgeStyle(variant)}>{children}</span>;
}

/* ============================================================
   PORTADO DE: components/ui/card.tsx (padding="md" fixo)
   ============================================================ */
function Card({ className, style, ...props }) {
  return <div data-slot="card" className={cn("flex flex-col gap-6 rounded-lg border py-6", className)} style={{ background: T.card, color: T.cardForeground, borderColor: T.border, boxShadow: T.shadowSm, ...style }} {...props} />;
}
function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />;
}
function CardTitle({ className, ...props }) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold text-base", className)} {...props} />;
}
function CardDescription({ className, ...props }) {
  return <div data-slot="card-description" className={cn("text-sm", className)} style={{ color: T.mutedForeground }} {...props} />;
}
function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}
function CardFooter({ className, style, ...props }) {
  return <div data-slot="card-footer" className={cn("flex items-center gap-2 px-6 pt-6", className)} style={{ borderTop: `1px solid ${T.border}`, ...style }} {...props} />;
}

/* ============================================================
   PORTADO DE: components/ui/input.tsx
   ============================================================ */
function Input({ className, style, ...props }) {
  return (
    <input
      data-slot="input"
      className={cn("h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-sm outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50", className)}
      style={{ background: "transparent", borderColor: T.input, color: T.foreground, boxShadow: T.shadowXs, ...style }}
      onFocus={(e) => (e.target.style.borderColor = T.ring)}
      onBlur={(e) => (e.target.style.borderColor = T.input)}
      {...props}
    />
  );
}

/* ============================================================
   PORTADO DE: components/ui/select.tsx
   Radix Select não está disponível neste sandbox (sem pacote
   `radix-ui`) — usamos <select> nativo com as MESMAS classes
   visuais do SelectTrigger real.
   ============================================================ */
function SelectField({ children, className, style, ...props }) {
  return (
    <div className="relative">
      <select
        data-slot="select-trigger"
        className={cn("h-9 w-full appearance-none rounded-lg border pl-3 pr-8 text-sm outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50", className)}
        style={{ background: "transparent", borderColor: T.input, color: T.foreground, boxShadow: T.shadowXs, ...style }}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4" style={{ color: T.mutedForeground }} />
    </div>
  );
}

/* ============================================================
   PORTADO DE: components/ui/table.tsx
   ============================================================ */
function Table({ className, ...props }) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto rounded-xl border" style={{ borderColor: T.border, background: T.card }}>
      <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}
function TableHeader({ className, ...props }) {
  return <thead data-slot="table-header" className={className} style={{ background: T.muted }} {...props} />;
}
function TableBody({ className, ...props }) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}
function TableRow({ className, style, ...props }) {
  return <tr data-slot="table-row" className={cn("transition-colors", className)} style={{ borderBottom: `1px solid ${T.border}`, ...style }} {...props} />;
}
function TableHead({ className, ...props }) {
  return <th data-slot="table-head" className={cn("h-11 px-6 text-left align-middle text-xs font-semibold whitespace-nowrap uppercase tracking-wide", className)} style={{ color: T.mutedForeground }} {...props} />;
}
function TableCell({ className, ...props }) {
  return <td data-slot="table-cell" className={cn("px-6 py-3.5 align-middle text-sm whitespace-nowrap", className)} {...props} />;
}

/* ============================================================
   PORTADO DE: components/ui/alert.tsx
   ============================================================ */
function alertStyle(variant) {
  switch (variant) {
    case "warning": return { background: T.warningSubtle, borderColor: T.warningBorder, color: T.warningText };
    case "info": return { background: T.infoSubtle, borderColor: T.infoBorder, color: T.infoText };
    default: return { background: T.card, borderColor: T.border, color: T.cardForeground };
  }
}
/* ============================================================
   PORTADO DE: components/ui/switch.tsx
   (Radix SwitchPrimitive substituído por <button role="switch">
   controlado; dimensões h-[1.15rem]/w-8 do DS aplicadas via
   style inline, já que são valores arbitrários sem JIT aqui)
   ============================================================ */
function Switch({ checked, onCheckedChange, disabled }) {
  return (
    <button
      type="button" role="switch" aria-checked={checked} disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className="peer inline-flex shrink-0 items-center rounded-full transition-colors outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      style={{ width: 32, height: 18, background: checked ? T.primary : T.input, boxShadow: T.shadowXs, border: "1px solid transparent" }}
    >
      <span
        className="block rounded-full transition-transform"
        style={{ width: 14, height: 14, background: T.background, transform: checked ? "translateX(15px)" : "translateX(1px)" }}
      />
    </button>
  );
}
function Alert({ className, variant = "default", children }) {
  return (
    <div role="alert" data-slot="alert" className={cn("relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[16px_1fr] gap-x-3 gap-y-0.5 items-start", className)} style={alertStyle(variant)}>
      {children}
    </div>
  );
}
function AlertDescription({ className, ...props }) {
  return <div data-slot="alert-description" className={cn("col-start-2 text-sm leading-relaxed", className)} {...props} />;
}

/* ============================================================
   PORTADO DE: components/ui/toggle-group.tsx + toggle.tsx
   (ToggleGroupPrimitive do Radix substituído por estado local
   controlado; classes de estado "on" mantidas)
   ============================================================ */
function ToggleGroup({ value, onValueChange, children }) {
  return (
    <div className="group/toggle-group flex w-fit items-center rounded-lg p-[3px]" style={{ background: T.secondary, border: `1px solid ${T.border}` }}>
      {React.Children.map(children, (child) => React.cloneElement(child, { _groupValue: value, _onSelect: onValueChange }))}
    </div>
  );
}
function ToggleGroupItem({ value, _groupValue, _onSelect, children }) {
  const on = value === _groupValue;
  return (
    <button
      type="button"
      data-state={on ? "on" : "off"}
      onClick={() => _onSelect(value)}
      className="inline-flex items-center justify-center rounded-md text-xs font-medium cursor-pointer px-3 py-1.5 transition-colors"
      style={on ? { background: T.card, color: T.foreground, boxShadow: T.shadowXs } : { background: "transparent", color: T.mutedForeground }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   PORTADO DE: components/ui/tabs.tsx
   (Radix TabsPrimitive substituído por estado local; classes
   de data-[state=active] viram condicionais em JS)
   ============================================================ */
function Tabs({ value, onValueChange, children }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
function TabsList({ children }) {
  return <div className="rounded-lg p-[3px] inline-flex w-fit items-center gap-0" style={{ background: T.muted }}>{children}</div>;
}
function TabsTrigger({ active, onClick, children }) {
  return (
    <button
      type="button" onClick={onClick} data-state={active ? "active" : "inactive"}
      className="relative inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer transition-all"
      style={active ? { background: T.card, color: T.foreground, boxShadow: T.shadowXs } : { color: T.mutedForeground, background: "transparent" }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   PORTADO DE: components/ui/dialog.tsx
   (Radix DialogPrimitive substituído por render condicional;
   classes de overlay/content mantidas)
   ============================================================ */
function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div data-slot="dialog-overlay" className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,.5)" }} onClick={() => onOpenChange(false)}>
      <div data-slot="dialog-content" onClick={(e) => e.stopPropagation()} className="relative grid w-full max-w-lg gap-4 rounded-lg border p-6" style={{ background: T.background, borderColor: T.border, boxShadow: T.shadowMd }}>
        {children}
        <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 cursor-pointer" style={{ color: T.foreground }}>
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
function DialogHeader({ children }) { return <div className="flex flex-col gap-1.5">{children}</div>; }
function DialogTitle({ children }) { return <div className="text-lg leading-none font-semibold">{children}</div>; }
function DialogDescription({ children }) { return <div className="text-sm" style={{ color: T.mutedForeground }}>{children}</div>; }

/* ============================================================
   PORTADO DE: components/ui/sheet.tsx
   (Radix Dialog do Sheet substituído por render sempre montado
   + transform/opacity controlados por `open`, pra manter a
   transição de slide sem depender de Radix; side="right" fixo,
   que é o padrão real do componente e o que foi pedido aqui)
   ============================================================ */
function Sheet({ open, onOpenChange, children, width = 420 }) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity"
        style={{ background: "rgba(0,0,0,.5)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => onOpenChange(false)}
      />
      <div
        className="fixed inset-y-0 right-0 z-50 flex flex-col gap-4 transition-transform duration-300 ease-in-out"
        style={{
          width, maxWidth: "92vw",
          background: T.background, borderLeft: `1px solid ${T.border}`, boxShadow: T.shadowMd,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 cursor-pointer" style={{ color: T.foreground }}>
          <X className="size-4" />
        </button>
        {children}
      </div>
    </>
  );
}
function SheetHeader({ children }) { return <div className="flex flex-col gap-1.5 p-4" style={{ borderBottom: `1px solid ${T.border}` }}>{children}</div>; }
function SheetFooter({ children }) { return <div className="mt-auto flex flex-row justify-end gap-2 p-4" style={{ borderTop: `1px solid ${T.border}` }}>{children}</div>; }
function SheetTitle({ children }) { return <div className="text-lg font-semibold pr-6">{children}</div>; }
function SheetDescription({ children }) { return <div className="text-sm" style={{ color: T.mutedForeground }}>{children}</div>; }

/* ============================================================
   PORTADO DE: components/ui/sonner.tsx
   O pacote `sonner` não está disponível neste sandbox de
   artifact, então implementei um toast fixo (canto inferior
   direito, igual à posição padrão do sonner) reproduzindo o
   mesmo ícone (CircleCheck) e os mesmos tokens de cor que o
   wrapper real usa (--normal-bg: var(--card) etc.).
   ============================================================ */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast]);
  if (!toast) return null;
  return (
    <div
      className="fixed bottom-5 right-5 z-[60] flex items-start gap-2.5 rounded-lg border p-3.5"
      style={{ background: T.card, borderColor: T.border, color: T.cardForeground, boxShadow: T.shadowMd, width: 340 }}
    >
      <CircleCheck className="size-4 shrink-0 mt-0.5" style={{ color: T.successText }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{toast.title}</span>
        {toast.description && <span className="text-xs" style={{ color: T.mutedForeground }}>{toast.description}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   PORTADO DE: components/ui/sidebar.tsx
   (SidebarProvider/Sheet/Tooltip/mobile-collapse REMOVIDOS —
   dependem de hooks/Sheet/Tooltip não portados aqui; mantido
   o essencial: SidebarMenu, SidebarMenuItem, SidebarMenuButton,
   SidebarGroupLabel, SidebarMenuBadge, com as classes reais)
   ============================================================ */
function SidebarGroupLabel({ children }) {
  return <div className="flex h-8 shrink-0 items-center rounded-lg px-2 text-xs font-medium" style={{ color: T.sidebarMuted }}>{children}</div>;
}
// PORTADO DE sidebar.tsx — SidebarSeparator (data-slot="sidebar-separator", classe real "bg-sidebar-border mx-2 w-auto")
function SidebarSeparator() {
  return <div className="mx-2 my-2 h-px w-auto shrink-0" style={{ background: T.sidebarBorder }} />;
}
function SidebarMenu({ children }) { return <ul className="flex w-full min-w-0 flex-col gap-1">{children}</ul>; }
function SidebarMenuItem({ children }) { return <li className="relative">{children}</li>; }
function SidebarMenuButton({ isActive, disabled, onClick, size = "default", children }) {
  return (
    <button
      type="button" onClick={disabled ? undefined : onClick} data-active={isActive} data-size={size} disabled={disabled}
      className={cn(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg p-2 text-left text-sm transition-colors",
        size === "lg" ? "h-12" : "h-8"
      )}
      style={{
        cursor: disabled ? "default" : "pointer",
        background: isActive ? T.sidebarAccent : "transparent",
        color: disabled ? T.sidebarMuted : (isActive ? T.sidebarAccentForeground : T.sidebarForeground),
        fontWeight: isActive ? 500 : 400,
      }}
      onMouseEnter={(e) => { if (!disabled && !isActive) e.currentTarget.style.background = T.sidebarAccent; }}
      onMouseLeave={(e) => { if (!disabled && !isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}
// PORTADO DE sidebar.tsx — SidebarFooter (data-slot="sidebar-footer", classe real "flex flex-col gap-2 p-2")
function SidebarFooter({ children }) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>;
}
function SidebarMenuBadge({ children }) {
  return <span className="pointer-events-none ml-auto flex h-5 min-w-5 items-center justify-center rounded-lg px-1.5 text-[10px] font-medium" style={{ background: T.secondary, color: T.mutedForeground, border: `1px solid ${T.sidebarBorder}` }}>{children}</span>;
}
// PORTADO DE sidebar.tsx — SidebarMenuSub / SidebarMenuSubItem / SidebarMenuSubButton
// (mesma referência visual usada na story "WithSubmenu" do DS)
function SidebarMenuSub({ children }) {
  return <ul className="mx-3.5 flex min-w-0 flex-col gap-1 border-l px-2.5 py-0.5" style={{ borderColor: T.sidebarBorder }}>{children}</ul>;
}
function SidebarMenuSubItem({ children }) { return <li className="relative">{children}</li>; }
function SidebarMenuSubButton({ isActive, disabled, onClick, children }) {
  return (
    <button
      type="button" onClick={disabled ? undefined : onClick} data-active={isActive} disabled={disabled}
      className="flex h-7 min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg px-2 text-sm w-full text-left transition-colors"
      style={{
        cursor: disabled ? "default" : "pointer",
        background: isActive ? T.sidebarAccent : "transparent",
        color: disabled ? T.sidebarMuted : (isActive ? T.sidebarAccentForeground : T.sidebarForeground),
        fontWeight: isActive ? 500 : 400,
      }}
      onMouseEnter={(e) => { if (!disabled && !isActive) e.currentTarget.style.background = T.sidebarAccent; }}
      onMouseLeave={(e) => { if (!disabled && !isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}

/* ================================================================================
   DADOS ILUSTRATIVOS — um conjunto por vigência, para o seletor de
   Vigência de fato trocar o que a tabela exibe (antes era um único
   array compartilhado, então trocar a vigência não tinha efeito)
   ================================================================================ */
const EMPRESAS = [
  { nome: "Padaria Aurora", codigo: "PA-0011", resp: "Elizandra Souza" },
  { nome: "Metalúrgica Sigma", codigo: "MS-0027", resp: "Wender Jonathan" },
  { nome: "Comércio Horizonte", codigo: "CH-0042", resp: "Andressa Lima" },
];

const UFS = ["GO", "SP", "RJ"];
const MUNICIPIOS_POR_UF = { GO: ["Goiânia"], SP: ["São Paulo"], RJ: ["Rio de Janeiro"] };
const TODOS_MUNICIPIOS = Object.values(MUNICIPIOS_POR_UF).flat();

const FERIADOS_2026 = [
  { id: 1, data: "01/01/2026", nome: "Confraternização Universal", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 2, data: "21/04/2026", nome: "Tiradentes", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 3, data: "07/09/2026", nome: "Independência", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 4, data: "28/10/2026", nome: "Dia do Servidor Público", ambito: "Estadual", uf: "GO", municipio: null, considerar: true },
  { id: 5, data: "20/11/2026", nome: "Consciência Negra", ambito: "Estadual", uf: "SP", municipio: null, considerar: true },
  { id: 6, data: "09/07/2026", nome: "Revolução Constitucionalista", ambito: "Estadual", uf: "SP", municipio: null, considerar: true },
  { id: 7, data: "09/07/2026", nome: "Aniversário de Goiânia", ambito: "Municipal", uf: "GO", municipio: "Goiânia", considerar: false },
  { id: 8, data: "25/01/2026", nome: "Aniversário de São Paulo", ambito: "Municipal", uf: "SP", municipio: "São Paulo", considerar: false },
  { id: 9, data: "20/01/2026", nome: "Dia de São Sebastião", ambito: "Municipal", uf: "RJ", municipio: "Rio de Janeiro", considerar: false },
];
const INSS_2026 = [
  { id: 1, faixa: "até R$ 1.518,00", aliquota: "7,5%" },
  { id: 2, faixa: "R$ 1.518,01 a R$ 2.793,88", aliquota: "9,0%" },
  { id: 3, faixa: "R$ 2.793,89 a R$ 4.190,83", aliquota: "12,0%" },
  { id: 4, faixa: "R$ 4.190,84 a R$ 8.157,41", aliquota: "14,0%" },
];
const IRRF_2026 = [
  { id: 1, base: "até R$ 2.428,80", aliquota: "isento", parcela: "—" },
  { id: 2, base: "R$ 2.428,81 a R$ 2.826,65", aliquota: "7,5%", parcela: "R$ 182,16" },
  { id: 3, base: "R$ 2.826,66 a R$ 3.751,05", aliquota: "15,0%", parcela: "R$ 394,16" },
  { id: 4, base: "acima de R$ 4.664,68", aliquota: "27,5%", parcela: "R$ 896,00" },
];

const FERIADOS_2025 = [
  { id: 1, data: "01/01/2025", nome: "Confraternização Universal", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 2, data: "21/04/2025", nome: "Tiradentes", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 3, data: "07/09/2025", nome: "Independência", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 4, data: "28/10/2025", nome: "Dia do Servidor Público", ambito: "Estadual", uf: "GO", municipio: null, considerar: true },
  { id: 5, data: "20/11/2025", nome: "Consciência Negra", ambito: "Estadual", uf: "SP", municipio: null, considerar: true },
  { id: 6, data: "09/07/2025", nome: "Aniversário de Goiânia", ambito: "Municipal", uf: "GO", municipio: "Goiânia", considerar: false },
  { id: 7, data: "25/01/2025", nome: "Aniversário de São Paulo", ambito: "Municipal", uf: "SP", municipio: "São Paulo", considerar: false },
];
const INSS_2025 = [
  { id: 1, faixa: "até R$ 1.412,00", aliquota: "7,5%" },
  { id: 2, faixa: "R$ 1.412,01 a R$ 2.666,68", aliquota: "9,0%" },
  { id: 3, faixa: "R$ 2.666,69 a R$ 4.000,03", aliquota: "12,0%" },
  { id: 4, faixa: "R$ 4.000,04 a R$ 7.786,02", aliquota: "14,0%" },
];
const IRRF_2025 = [
  { id: 1, base: "até R$ 2.259,20", aliquota: "isento", parcela: "—" },
  { id: 2, base: "R$ 2.259,21 a R$ 2.826,65", aliquota: "7,5%", parcela: "R$ 169,44" },
  { id: 3, base: "R$ 2.826,66 a R$ 3.751,05", aliquota: "15,0%", parcela: "R$ 381,44" },
  { id: 4, base: "acima de R$ 4.664,68", aliquota: "27,5%", parcela: "R$ 884,96" },
];

const FERIADOS_2024 = [
  { id: 1, data: "01/01/2024", nome: "Confraternização Universal", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 2, data: "21/04/2024", nome: "Tiradentes", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 3, data: "07/09/2024", nome: "Independência", ambito: "Federal", uf: null, municipio: null, considerar: true },
  { id: 4, data: "28/10/2024", nome: "Dia do Servidor Público", ambito: "Estadual", uf: "GO", municipio: null, considerar: true },
  { id: 5, data: "09/07/2024", nome: "Aniversário de Goiânia", ambito: "Municipal", uf: "GO", municipio: "Goiânia", considerar: false },
];
const INSS_2024 = [
  { id: 1, faixa: "até R$ 1.320,00", aliquota: "7,5%" },
  { id: 2, faixa: "R$ 1.320,01 a R$ 2.571,29", aliquota: "9,0%" },
  { id: 3, faixa: "R$ 2.571,30 a R$ 3.856,94", aliquota: "12,0%" },
  { id: 4, faixa: "R$ 3.856,95 a R$ 7.507,49", aliquota: "14,0%" },
];
const IRRF_2024 = [
  { id: 1, base: "até R$ 2.112,00", aliquota: "isento", parcela: "—" },
  { id: 2, base: "R$ 2.112,01 a R$ 2.826,65", aliquota: "7,5%", parcela: "R$ 158,40" },
  { id: 3, base: "R$ 2.826,66 a R$ 3.751,05", aliquota: "15,0%", parcela: "R$ 370,40" },
  { id: 4, base: "acima de R$ 4.664,68", aliquota: "27,5%", parcela: "R$ 870,40" },
];

// 2027 ainda não foi iniciada — vigência futura, sem regras cadastradas ainda
const DADOS_INICIAIS_POR_VIGENCIA = {
  "2027": { feriados: [], inss: [], irrf: [] },
  "2026": { feriados: FERIADOS_2026, inss: INSS_2026, irrf: IRRF_2026 },
  "2025": { feriados: FERIADOS_2025, inss: INSS_2025, irrf: IRRF_2025 },
  "2024": { feriados: FERIADOS_2024, inss: INSS_2024, irrf: IRRF_2024 },
};
function criarAlteredIdsVazio() {
  return {
    "2027": { feriados: new Set(), inss: new Set(), irrf: new Set() },
    "2026": { feriados: new Set(), inss: new Set(), irrf: new Set() },
    "2025": { feriados: new Set(), inss: new Set(), irrf: new Set() },
    "2024": { feriados: new Set(), inss: new Set(), irrf: new Set() },
  };
}

const VIGENCIAS_HIST = [
  { vig: "2026", data: "02/01/2026", por: "Jeniffer Dauricio", status: "vigente" },
  { vig: "2025", data: "03/01/2025", por: "Jeniffer Dauricio", status: "histórico" },
  { vig: "2024", data: "02/01/2024", por: "Luiz Andrade", status: "histórico" },
];

const badgeAmbito = { Federal: "info", Estadual: "success", Municipal: "warning" };

/* ================================================================================
   APP
   ================================================================================ */
export default function AutopilotRegras() {
  const [section, setSection] = useState("home");
  const [tab, setTab] = useState("feriados");
  const [role, setRole] = useState("admin");
  const [ambito, setAmbito] = useState("Todos");
  const [uf, setUf] = useState("Todas");
  const [municipio, setMunicipio] = useState("Todos");
  const [vigencia, setVigencia] = useState("2026");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [empresaSel, setEmpresaSel] = useState(null);
  const [parametrosOpen, setParametrosOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [consultaOpen, setConsultaOpen] = useState(false);
  const [consultaVig, setConsultaVig] = useState(null);
  const [consultaTab, setConsultaTab] = useState("feriados");
  const [pendingDestination, setPendingDestination] = useState(null);
  const [novoFeriado, setNovoFeriado] = useState({ nome: "", data: "", ambito: "Federal", uf: "GO", municipio: "Goiânia", considerar: true });
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [editFeriado, setEditFeriado] = useState(null);
  const [editFeriadoOriginal, setEditFeriadoOriginal] = useState(null);
  const [inssEditOpen, setInssEditOpen] = useState(false);
  const [editandoInssId, setEditandoInssId] = useState(null);
  const [editInss, setEditInss] = useState(null);
  const [editInssOriginal, setEditInssOriginal] = useState(null);
  const [irrfEditOpen, setIrrfEditOpen] = useState(false);
  const [editandoIrrfId, setEditandoIrrfId] = useState(null);
  const [editIrrf, setEditIrrf] = useState(null);
  const [editIrrfOriginal, setEditIrrfOriginal] = useState(null);

  // Dados agora vivem por vigência — trocar o seletor troca o conteúdo das 3 tabelas de fato
  const [dadosPorVigencia, setDadosPorVigencia] = useState(DADOS_INICIAIS_POR_VIGENCIA);
  const [snapshotPorVigencia, setSnapshotPorVigencia] = useState(DADOS_INICIAIS_POR_VIGENCIA);
  const [alteredIdsPorVigencia, setAlteredIdsPorVigencia] = useState(criarAlteredIdsVazio);

  const isOperador = role === "operador";

  const feriadosData = dadosPorVigencia[vigencia].feriados;
  const inssData = dadosPorVigencia[vigencia].inss;
  const irrfData = dadosPorVigencia[vigencia].irrf;
  const alteredFeriadosIds = alteredIdsPorVigencia[vigencia].feriados;
  const alteredInssIds = alteredIdsPorVigencia[vigencia].inss;
  const alteredIrrfIds = alteredIdsPorVigencia[vigencia].irrf;
  const hasPendingChanges = alteredFeriadosIds.size > 0 || alteredInssIds.size > 0 || alteredIrrfIds.size > 0;

  function updateVigenciaData(tabela, updater) {
    setDadosPorVigencia((prev) => ({
      ...prev,
      [vigencia]: { ...prev[vigencia], [tabela]: updater(prev[vigencia][tabela]) },
    }));
  }
  function marcarAlterado(tabela, id) {
    setAlteredIdsPorVigencia((prev) => ({
      ...prev,
      [vigencia]: { ...prev[vigencia], [tabela]: new Set(prev[vigencia][tabela]).add(id) },
    }));
  }

  const ufDisabled = ambito === "Federal";
  const municipioDisabled = ambito === "Federal" || ambito === "Estadual";
  const municipiosDisponiveis = uf === "Todas" ? TODOS_MUNICIPIOS : (MUNICIPIOS_POR_UF[uf] || []);

  function handleAmbitoChange(value) {
    setAmbito(value);
    if (value === "Federal") { setUf("Todas"); setMunicipio("Todos"); }
    else if (value === "Estadual") { setMunicipio("Todos"); }
  }
  function handleUfChange(value) {
    setUf(value);
    const lista = value === "Todas" ? TODOS_MUNICIPIOS : (MUNICIPIOS_POR_UF[value] || []);
    if (municipio !== "Todos" && !lista.includes(municipio)) setMunicipio("Todos");
  }

  const feriadosFiltrados = feriadosData.filter((f) => {
    if (ambito !== "Todos" && f.ambito !== ambito) return false;
    if (uf !== "Todas" && f.uf !== uf) return false;
    if (municipio !== "Todos" && f.municipio !== municipio) return false;
    return true;
  });

  const formUfDisabled = novoFeriado.ambito === "Federal";
  const formMunicipioVisivel = novoFeriado.ambito === "Municipal";
  const formMunicipiosDisponiveis = MUNICIPIOS_POR_UF[novoFeriado.uf] || [];

  const editFormUfDisabled = editFeriado ? editFeriado.ambito === "Federal" : true;
  const editFormMunicipioVisivel = editFeriado ? editFeriado.ambito === "Municipal" : false;
  const editFormMunicipiosDisponiveis = editFeriado ? (MUNICIPIOS_POR_UF[editFeriado.uf] || []) : [];

  const isFeriadoDirty = editFeriado && editFeriadoOriginal && JSON.stringify(editFeriado) !== JSON.stringify(editFeriadoOriginal);
  const isInssDirty = editInss && editInssOriginal && JSON.stringify(editInss) !== JSON.stringify(editInssOriginal);
  const isIrrfDirty = editIrrf && editIrrfOriginal && JSON.stringify(editIrrf) !== JSON.stringify(editIrrfOriginal);

  function handleFormAmbitoChange(value) {
    setNovoFeriado((f) => {
      if (value === "Federal") return { ...f, ambito: value, uf: "GO", municipio: "Goiânia" };
      if (value === "Estadual") return { ...f, ambito: value };
      return { ...f, ambito: value, municipio: (MUNICIPIOS_POR_UF[f.uf] || [])[0] || "" };
    });
  }
  function handleFormUfChange(value) {
    setNovoFeriado((f) => ({ ...f, uf: value, municipio: (MUNICIPIOS_POR_UF[value] || [])[0] || "" }));
  }
  function formatarDataBR(isoDate) {
    if (!isoDate) return "";
    const [ano, mes, dia] = isoDate.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  function formatarDataISO(brDate) {
    if (!brDate) return "";
    const [dia, mes, ano] = brDate.split("/");
    return `${ano}-${mes}-${dia}`;
  }
  function handleSalvarFeriado() {
    if (!novoFeriado.nome || !novoFeriado.data) return;
    const novo = {
      id: Date.now(),
      data: formatarDataBR(novoFeriado.data),
      nome: novoFeriado.nome,
      ambito: novoFeriado.ambito,
      uf: novoFeriado.ambito === "Federal" ? null : novoFeriado.uf,
      municipio: novoFeriado.ambito === "Municipal" ? novoFeriado.municipio : null,
      considerar: novoFeriado.considerar,
    };
    updateVigenciaData("feriados", (prev) => [...prev, novo]);
    marcarAlterado("feriados", novo.id);
    setSheetOpen(false);
    setToast({ title: "Alteração salva no rascunho", description: `"${novo.nome}" foi incluído. Publique a vigência ${vigencia} para tornar isso oficial.` });
    setNovoFeriado({ nome: "", data: "", ambito: "Federal", uf: "GO", municipio: "Goiânia", considerar: true });
  }

  function handleToggleConsiderar(id, novoValor) {
    updateVigenciaData("feriados", (prev) => prev.map((f) => f.id !== id ? f : { ...f, considerar: novoValor }));
    marcarAlterado("feriados", id);
  }

  function handleAbrirEdicaoFeriado(f) {
    setEditandoId(f.id);
    const inicial = {
      nome: f.nome,
      data: formatarDataISO(f.data),
      ambito: f.ambito,
      uf: f.uf || "GO",
      municipio: f.municipio || (MUNICIPIOS_POR_UF[f.uf] || [])[0] || "Goiânia",
      considerar: f.considerar,
    };
    setEditFeriado(inicial);
    setEditFeriadoOriginal(inicial);
    setEditSheetOpen(true);
  }
  function handleEditFormAmbitoChange(value) {
    setEditFeriado((f) => {
      if (value === "Federal") return { ...f, ambito: value, uf: "GO", municipio: "Goiânia" };
      if (value === "Estadual") return { ...f, ambito: value };
      return { ...f, ambito: value, municipio: (MUNICIPIOS_POR_UF[f.uf] || [])[0] || "" };
    });
  }
  function handleEditFormUfChange(value) {
    setEditFeriado((f) => ({ ...f, uf: value, municipio: (MUNICIPIOS_POR_UF[value] || [])[0] || "" }));
  }
  function handleSalvarEdicaoFeriado() {
    if (!editFeriado.nome || !editFeriado.data || !isFeriadoDirty) return;
    updateVigenciaData("feriados", (prev) => prev.map((f) => f.id !== editandoId ? f : {
      ...f,
      data: formatarDataBR(editFeriado.data),
      nome: editFeriado.nome,
      ambito: editFeriado.ambito,
      uf: editFeriado.ambito === "Federal" ? null : editFeriado.uf,
      municipio: editFeriado.ambito === "Municipal" ? editFeriado.municipio : null,
      considerar: editFeriado.considerar,
    }));
    marcarAlterado("feriados", editandoId);
    setEditSheetOpen(false);
    setToast({ title: "Alteração salva no rascunho", description: `"${editFeriado.nome}" foi atualizado. Publique a vigência ${vigencia} para tornar isso oficial.` });
    setEditandoId(null);
    setEditFeriado(null);
    setEditFeriadoOriginal(null);
  }

  function handleAbrirEdicaoInss(r) {
    setEditandoInssId(r.id);
    const inicial = { faixa: r.faixa, aliquota: r.aliquota };
    setEditInss(inicial);
    setEditInssOriginal(inicial);
    setInssEditOpen(true);
  }
  function handleSalvarEdicaoInss() {
    if (!editInss.faixa || !editInss.aliquota || !isInssDirty) return;
    updateVigenciaData("inss", (prev) => prev.map((r) => r.id !== editandoInssId ? r : { ...r, faixa: editInss.faixa, aliquota: editInss.aliquota }));
    marcarAlterado("inss", editandoInssId);
    setInssEditOpen(false);
    setToast({ title: "Alteração salva no rascunho", description: `A faixa "${editInss.faixa}" foi atualizada. Publique a vigência ${vigencia} para tornar isso oficial.` });
    setEditandoInssId(null);
    setEditInss(null);
    setEditInssOriginal(null);
  }

  function handleAbrirEdicaoIrrf(r) {
    setEditandoIrrfId(r.id);
    const inicial = { base: r.base, aliquota: r.aliquota, parcela: r.parcela };
    setEditIrrf(inicial);
    setEditIrrfOriginal(inicial);
    setIrrfEditOpen(true);
  }
  function handleSalvarEdicaoIrrf() {
    if (!editIrrf.base || !editIrrf.aliquota || !isIrrfDirty) return;
    updateVigenciaData("irrf", (prev) => prev.map((r) => r.id !== editandoIrrfId ? r : { ...r, base: editIrrf.base, aliquota: editIrrf.aliquota, parcela: editIrrf.aliquota === "isento" ? "—" : editIrrf.parcela }));
    marcarAlterado("irrf", editandoIrrfId);
    setIrrfEditOpen(false);
    setToast({ title: "Alteração salva no rascunho", description: `A faixa "${editIrrf.base}" foi atualizada. Publique a vigência ${vigencia} para tornar isso oficial.` });
    setEditandoIrrfId(null);
    setEditIrrf(null);
    setEditIrrfOriginal(null);
  }

  function handlePublicar() {
    setSnapshotPorVigencia((prev) => ({ ...prev, [vigencia]: dadosPorVigencia[vigencia] }));
    setAlteredIdsPorVigencia((prev) => ({ ...prev, [vigencia]: { feriados: new Set(), inss: new Set(), irrf: new Set() } }));
    setToast({ title: `Vigência ${vigencia} publicada`, description: "As alterações agora são oficiais e a vigência anterior foi movida para o histórico." });
  }

  function tentarNavegar(destino) {
    if (section === "regras" && hasPendingChanges && destino !== "regras") {
      setPendingDestination(destino);
      setExitDialogOpen(true);
    } else {
      setSection(destino);
    }
  }
  function handleSairEPerder() {
    setDadosPorVigencia((prev) => ({ ...prev, [vigencia]: snapshotPorVigencia[vigencia] }));
    setAlteredIdsPorVigencia((prev) => ({ ...prev, [vigencia]: { feriados: new Set(), inss: new Set(), irrf: new Set() } }));
    setExitDialogOpen(false);
    setSection(pendingDestination);
    setPendingDestination(null);
  }
  function handleContinuarEditando() {
    setExitDialogOpen(false);
    setPendingDestination(null);
  }
  function handleAbrirConsulta(vig) {
    setConsultaVig(vig);
    setConsultaTab("feriados");
    setConsultaOpen(true);
  }
  const consultaDados = consultaVig ? snapshotPorVigencia[consultaVig] : null;

  const crumbs = { home: "empresas", regras: "regras-gerais" };

  return (
    <div className="flex h-screen w-full overflow-hidden text-sm" style={{ background: T.muted, color: T.foreground, fontFamily: "Inter, sans-serif" }}>

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 shrink-0 flex flex-col gap-1 p-3 overflow-y-auto" style={{ background: T.sidebar, borderRight: `1px solid ${T.sidebarBorder}` }}>
        <div className="flex items-center gap-2 px-2 pb-3">
          <div className="flex items-center justify-center size-6 rounded-md text-xs font-bold" style={{ background: T.sidebarPrimary, color: T.background }}>AP</div>
          <div>
            <div className="text-sm font-semibold">AutoPilot</div>
            <div className="text-[11px]" style={{ color: T.sidebarMuted }}>Regras por empresa</div>
          </div>
        </div>

        <div>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={section === "home"} onClick={() => tentarNavegar("home")}>
                <Building2 className="size-4" /> Empresas
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={section === "regras"} onClick={() => tentarNavegar("regras")}>
                <BookOpenCheck className="size-4" /> Regras Gerais
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        <div>
          <SidebarGroupLabel>Parâmetros</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setParametrosOpen((o) => !o)}>
                <SlidersHorizontal className="size-4" /> Parâmetros
                <ChevronRight className="ml-auto size-4 transition-transform" style={{ transform: parametrosOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
              </SidebarMenuButton>
              {parametrosOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton disabled>
                      <Receipt className="size-4" /> Fiscal
                      <SidebarMenuBadge>em breve</SidebarMenuBadge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton disabled>
                      <Users className="size-4" /> DP
                      <SidebarMenuBadge>em breve</SidebarMenuBadge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton disabled>
                      <Landmark className="size-4" /> Contábil
                      <SidebarMenuBadge>em breve</SidebarMenuBadge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <div className="mt-auto">
          <Card className="p-3 gap-2" style={{ boxShadow: "none" }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-0">
              <AlertTriangle className="size-3.5" style={{ color: T.warningText }} /> Em aberto p/ sexta
            </div>
            <ul className="text-[11px] leading-relaxed list-disc pl-4" style={{ color: T.mutedForeground }}>
              <li>Onde o AutoPilot mora tecnicamente</li>
              <li>Camada intermediária de regras (era do Dan)</li>
              <li>Mapa de regras formal (Jeniffer)</li>
            </ul>
          </Card>
        </div>

        <SidebarSeparator />

        {/* PORTADO DE sidebar.stories.tsx — SidebarFooter com SidebarMenuButton size="lg" (avatar com iniciais + nome + e-mail) */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex items-center justify-center size-8 rounded-full shrink-0 text-xs font-medium" style={{ background: T.muted, color: T.foreground }}>EC</div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate">Elaine Calazans</span>
                  <span className="text-xs truncate" style={{ color: T.mutedForeground }}>elaine.moreira@bhub.ai</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-4 px-6 py-3 flex-wrap" style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}>
          <div className="text-xs font-mono" style={{ color: T.mutedForeground }}>
            autopilot.bhub.ai / <b style={{ color: T.foreground, fontWeight: 500 }}>{crumbs[section]}</b>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: T.mutedForeground }}>Visualizar como</span>
            <ToggleGroup value={role} onValueChange={setRole}>
              <ToggleGroupItem value="admin">Administrador</ToggleGroupItem>
              <ToggleGroupItem value="operador">Operador</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <Alert variant="info" className="mb-5">
            <Info className="size-4" />
            <AlertDescription>
              <b>Protótipo.</b> Os dados apresentados são fictícios e servem apenas para validação da experiência.
            </AlertDescription>
          </Alert>

          {/* ============ HOME ============ */}
          {section === "home" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Empresas</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Selecione uma empresa para visualizar e gerenciar suas regras.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {EMPRESAS.map((e) => (
                  <Card key={e.codigo} className="py-4 flex-row items-center justify-between px-5" style={{ boxShadow: "none" }}>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold">{e.nome}</div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Código</span>
                          <span className="text-xs">{e.codigo}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Responsável</span>
                          <span className="text-xs">{e.resp}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => { setEmpresaSel(e.nome); setDialogOpen(true); }}>
                      abrir regras →
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* ============ REGRAS GERAIS ============ */}
          {section === "regras" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Tabelas e calendários gerais</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Regras gerais que valem para todas as empresas — mantidas em base única e versionadas por vigência.
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: T.mutedForeground }}>Vigência</span>
                  <SelectField value={vigencia} onChange={(e) => setVigencia(e.target.value)} className="w-28">
                    <option>2027</option><option>2026</option><option>2025</option><option>2024</option>
                  </SelectField>
                  {hasPendingChanges && (
                    <Badge variant="warning" className="gap-1.5">
                      <span className="size-1.5 rounded-full" style={{ background: T.warningText }} />
                      Alterações não publicadas
                    </Badge>
                  )}
                </div>
                <Button variant={hasPendingChanges ? "default" : "outline"} disabled={isOperador || !hasPendingChanges} onClick={() => setPublishDialogOpen(true)}>Publicar vigência</Button>
              </div>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={tab === "feriados"} onClick={() => setTab("feriados")}>Feriados</TabsTrigger>
                  <TabsTrigger active={tab === "inss"} onClick={() => setTab("inss")}>Tabela INSS</TabsTrigger>
                  <TabsTrigger active={tab === "irrf"} onClick={() => setTab("irrf")}>Tabela IRRF</TabsTrigger>
                  <TabsTrigger active={tab === "vigencias"} onClick={() => setTab("vigencias")}>Vigências</TabsTrigger>
                </TabsList>
              </Tabs>

              {tab === "feriados" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Calendário em três âmbitos. Selecione UF e município para ver os feriados aplicáveis àquela localidade.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Âmbito</label>
                      <SelectField value={ambito} onChange={(e) => handleAmbitoChange(e.target.value)} className="w-32">
                        <option>Todos</option><option>Federal</option><option>Estadual</option><option>Municipal</option>
                      </SelectField>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>UF</label>
                      <SelectField value={uf} onChange={(e) => handleUfChange(e.target.value)} disabled={ufDisabled} className="w-24">
                        <option>Todas</option>
                        {UFS.map((u) => <option key={u}>{u}</option>)}
                      </SelectField>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Município</label>
                      <SelectField value={municipio} onChange={(e) => setMunicipio(e.target.value)} disabled={municipioDisabled} className="w-36">
                        <option>Todos</option>
                        {municipiosDisponiveis.map((m) => <option key={m}>{m}</option>)}
                      </SelectField>
                    </div>
                  </CardContent>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: T.mutedForeground }}>{feriadosFiltrados.length} feriados na vigência {vigencia}</span>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => setSheetOpen(true)}>+ Adicionar feriado</Button>
                  </CardContent>
                  <CardContent>
                    <Table>
                      <TableHeader><tr><TableHead>Data</TableHead><TableHead>Feriado</TableHead><TableHead>Âmbito</TableHead><TableHead>Considerar</TableHead><TableHead></TableHead></tr></TableHeader>
                      <TableBody>
                        {feriadosFiltrados.length === 0 && (
                          <tr><td colSpan={5} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhum feriado encontrado para a vigência ou os filtros selecionados.</td></tr>
                        )}
                        {feriadosFiltrados.map((f) => (
                          <TableRow key={f.id} style={alteredFeriadosIds.has(f.id) ? { borderLeft: `2px solid ${T.warningBorder}` } : {}}>
                            <TableCell>{f.data}</TableCell>
                            <TableCell>{f.nome}</TableCell>
                            <TableCell><Badge variant={badgeAmbito[f.ambito]}>{f.ambito}</Badge></TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch checked={f.considerar} onCheckedChange={(v) => handleToggleConsiderar(f.id, v)} disabled={isOperador} />
                                <span className="text-xs font-medium" style={{ color: f.considerar ? T.successText : T.mutedForeground }}>{f.considerar ? "Sim" : "Não"}</span>
                              </div>
                            </TableCell>
                            <TableCell><span onClick={() => !isOperador && handleAbrirEdicaoFeriado(f)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Valores ilustrativos.</b> Feriados estaduais e municipais são exemplos — a base oficial é versionada por vigência.</span>
                  </CardFooter>
                </Card>
              )}

              {tab === "inss" && (
                <Card className="gap-4">
                  <CardHeader><CardDescription>Tabela progressiva de INSS por faixa de salário de contribuição.</CardDescription></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><tr><TableHead>Faixa (salário de contribuição)</TableHead><TableHead>Alíquota</TableHead><TableHead>Vigência</TableHead><TableHead></TableHead></tr></TableHeader>
                      <TableBody>
                        {inssData.length === 0 && (
                          <tr><td colSpan={4} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma faixa cadastrada para esta vigência ainda.</td></tr>
                        )}
                        {inssData.map((r) => (
                          <TableRow key={r.id} style={alteredInssIds.has(r.id) ? { borderLeft: `2px solid ${T.warningBorder}` } : {}}>
                            <TableCell>{r.faixa}</TableCell>
                            <TableCell><b>{r.aliquota}</b></TableCell>
                            <TableCell>{vigencia}</TableCell>
                            <TableCell><span onClick={() => !isOperador && handleAbrirEdicaoInss(r)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Valores ilustrativos.</b> A tabela é versionada por vigência — ao publicar uma nova, as anteriores ficam no histórico.</span>
                  </CardFooter>
                </Card>
              )}

              {tab === "irrf" && (
                <Card className="gap-4">
                  <CardHeader><CardDescription>Tabela progressiva de IRRF com base de cálculo, alíquota e parcela a deduzir.</CardDescription></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><tr><TableHead>Base de cálculo</TableHead><TableHead>Alíquota</TableHead><TableHead>Parcela a deduzir</TableHead><TableHead></TableHead></tr></TableHeader>
                      <TableBody>
                        {irrfData.length === 0 && (
                          <tr><td colSpan={4} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma faixa cadastrada para esta vigência ainda.</td></tr>
                        )}
                        {irrfData.map((r) => (
                          <TableRow key={r.id} style={alteredIrrfIds.has(r.id) ? { borderLeft: `2px solid ${T.warningBorder}` } : {}}>
                            <TableCell>{r.base}</TableCell>
                            <TableCell>{r.aliquota === "isento" ? <Badge variant="outline">isento</Badge> : <b>{r.aliquota}</b>}</TableCell>
                            <TableCell>{r.parcela}</TableCell>
                            <TableCell><span onClick={() => !isOperador && handleAbrirEdicaoIrrf(r)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <AlertTriangle className="size-3.5 shrink-0" style={{ color: T.warningText }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Tabela de isenção.</b> Hoje essa tabela não existe no motor — ponto levantado na daily. Aqui ela passa a ser gerida e versionada.</span>
                  </CardFooter>
                </Card>
              )}
              {tab === "vigencias" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Histórico de publicações das tabelas gerais. Publicar uma nova vigência mantém as anteriores disponíveis para consulta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><tr><TableHead>Vigência</TableHead><TableHead>Publicada em</TableHead><TableHead>Publicada por</TableHead><TableHead>Status</TableHead><TableHead></TableHead></tr></TableHeader>
                      <TableBody>
                        {VIGENCIAS_HIST.map((v) => (
                          <TableRow key={v.vig}>
                            <TableCell><b>{v.vig}</b></TableCell>
                            <TableCell>{v.data}</TableCell>
                            <TableCell>{v.por}</TableCell>
                            <TableCell><Badge variant={v.status === "vigente" ? "success" : "outline"}>{v.status}</Badge></TableCell>
                            <TableCell><span onClick={() => handleAbrirConsulta(v.vig)} className="text-xs font-medium cursor-pointer" style={{ color: T.infoText }}>consultar</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </section>
          )}
        </div>
      </main>

      {/* ================= MODAL: ESBOÇO SELEÇÃO DE TRILHA ================= */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <span className="text-xs" style={{ color: T.mutedForeground }}>{empresaSel}</span>
          <DialogTitle>Escolher trilha de regras</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2.5">
          <Card className="p-3.5 gap-1" style={{ boxShadow: "none" }}>
            <BookOpenCheck className="size-4 mb-1" />
            <div className="text-sm font-semibold">Regras Gerais</div>
            <div className="text-xs" style={{ color: T.mutedForeground }}>Feriados · INSS · IRRF</div>
          </Card>
          {[["DP", Users, "Sindicato · Rubricas"], ["Fiscal", Receipt, "CFOP · Acumuladores"], ["Contábil", Landmark, "Plano de contas"]].map(([label, Icon, desc]) => (
            <Card key={label} className="p-3.5 gap-1 relative" style={{ boxShadow: "none", opacity: 0.5, cursor: "not-allowed" }}>
              <Badge variant="secondary" className="absolute top-2.5 right-2.5 text-[10px] px-1.5 py-0">esboço</Badge>
              <Icon className="size-4 mb-1" />
              <div className="text-sm font-semibold">{label}</div>
              <div className="text-xs" style={{ color: T.mutedForeground }}>{desc}</div>
            </Card>
          ))}
        </div>
        <DialogDescription>
          Esboço ilustrativo — a seleção de trilha ainda não é clicável aqui, aguardando a decisão de arquitetura da reunião de sexta.
        </DialogDescription>
      </Dialog>

      {/* ================= DRAWER: ADICIONAR FERIADO ================= */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetHeader>
          <SheetTitle>Adicionar feriado</SheetTitle>
          <SheetDescription>Novo feriado será incluído na vigência {vigencia}.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Nome do feriado</label>
            <Input placeholder="Ex.: Corpus Christi" value={novoFeriado.nome} onChange={(e) => setNovoFeriado((f) => ({ ...f, nome: e.target.value }))} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Data</label>
            <Input type="date" value={novoFeriado.data} onChange={(e) => setNovoFeriado((f) => ({ ...f, data: e.target.value }))} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Âmbito</label>
            <SelectField value={novoFeriado.ambito} onChange={(e) => handleFormAmbitoChange(e.target.value)}>
              <option>Federal</option><option>Estadual</option><option>Municipal</option>
            </SelectField>
          </div>

          {!formUfDisabled && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>UF</label>
              <SelectField value={novoFeriado.uf} onChange={(e) => handleFormUfChange(e.target.value)}>
                {UFS.map((u) => <option key={u}>{u}</option>)}
              </SelectField>
            </div>
          )}

          {formMunicipioVisivel && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Município</label>
              <SelectField value={novoFeriado.municipio} onChange={(e) => setNovoFeriado((f) => ({ ...f, municipio: e.target.value }))}>
                {formMunicipiosDisponiveis.map((m) => <option key={m}>{m}</option>)}
              </SelectField>
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="size-3.5 cursor-pointer" checked={novoFeriado.considerar} onChange={(e) => setNovoFeriado((f) => ({ ...f, considerar: e.target.checked }))} />
            <span className="text-sm">Considerar por padrão</span>
          </label>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancelar</Button>
          <Button disabled={!novoFeriado.nome || !novoFeriado.data} onClick={handleSalvarFeriado}>Salvar feriado</Button>
        </SheetFooter>
      </Sheet>

      {/* ================= DRAWER: EDITAR FERIADO ================= */}
      {editFeriado && (
        <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
          <SheetHeader>
            <SheetTitle>Editar feriado</SheetTitle>
            <SheetDescription>Alterações serão aplicadas na vigência {vigencia}.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Nome do feriado</label>
              <Input value={editFeriado.nome} onChange={(e) => setEditFeriado((f) => ({ ...f, nome: e.target.value }))} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Data</label>
              <Input type="date" value={editFeriado.data} onChange={(e) => setEditFeriado((f) => ({ ...f, data: e.target.value }))} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Âmbito</label>
              <SelectField value={editFeriado.ambito} onChange={(e) => handleEditFormAmbitoChange(e.target.value)}>
                <option>Federal</option><option>Estadual</option><option>Municipal</option>
              </SelectField>
            </div>

            {!editFormUfDisabled && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>UF</label>
                <SelectField value={editFeriado.uf} onChange={(e) => handleEditFormUfChange(e.target.value)}>
                  {UFS.map((u) => <option key={u}>{u}</option>)}
                </SelectField>
              </div>
            )}

            {editFormMunicipioVisivel && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Município</label>
                <SelectField value={editFeriado.municipio} onChange={(e) => setEditFeriado((f) => ({ ...f, municipio: e.target.value }))}>
                  {editFormMunicipiosDisponiveis.map((m) => <option key={m}>{m}</option>)}
                </SelectField>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="size-3.5 cursor-pointer" checked={editFeriado.considerar} onChange={(e) => setEditFeriado((f) => ({ ...f, considerar: e.target.checked }))} />
              <span className="text-sm">Considerar por padrão</span>
            </label>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setEditSheetOpen(false)}>Cancelar</Button>
            <Button disabled={!editFeriado.nome || !editFeriado.data || !isFeriadoDirty} onClick={handleSalvarEdicaoFeriado}>Salvar alterações</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DRAWER: EDITAR FAIXA DE INSS ================= */}
      {editInss && (
        <Sheet open={inssEditOpen} onOpenChange={setInssEditOpen}>
          <SheetHeader>
            <SheetTitle>Editar faixa de INSS</SheetTitle>
            <SheetDescription>Alterações serão aplicadas na vigência {vigencia}.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Faixa (salário de contribuição)</label>
              <Input placeholder="Ex.: R$ 1.518,01 a R$ 2.793,88" value={editInss.faixa} onChange={(e) => setEditInss((f) => ({ ...f, faixa: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Alíquota</label>
              <Input placeholder="Ex.: 9,0%" value={editInss.aliquota} onChange={(e) => setEditInss((f) => ({ ...f, aliquota: e.target.value }))} />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setInssEditOpen(false)}>Cancelar</Button>
            <Button disabled={!editInss.faixa || !editInss.aliquota || !isInssDirty} onClick={handleSalvarEdicaoInss}>Salvar alterações</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DRAWER: EDITAR FAIXA DE IRRF ================= */}
      {editIrrf && (
        <Sheet open={irrfEditOpen} onOpenChange={setIrrfEditOpen}>
          <SheetHeader>
            <SheetTitle>Editar faixa de IRRF</SheetTitle>
            <SheetDescription>Alterações serão aplicadas na vigência {vigencia}.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Base de cálculo</label>
              <Input placeholder="Ex.: R$ 2.428,81 a R$ 2.826,65" value={editIrrf.base} onChange={(e) => setEditIrrf((f) => ({ ...f, base: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Alíquota</label>
              <SelectField
                value={editIrrf.aliquota === "isento" ? "isento" : "percentual"}
                onChange={(e) => setEditIrrf((f) => ({ ...f, aliquota: e.target.value === "isento" ? "isento" : "", parcela: e.target.value === "isento" ? "—" : f.parcela }))}
              >
                <option value="isento">Isento</option>
                <option value="percentual">Percentual (%)</option>
              </SelectField>
            </div>
            {editIrrf.aliquota !== "isento" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Percentual</label>
                <Input placeholder="Ex.: 15,0%" value={editIrrf.aliquota} onChange={(e) => setEditIrrf((f) => ({ ...f, aliquota: e.target.value }))} />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Parcela a deduzir</label>
              <Input placeholder="Ex.: R$ 182,16" value={editIrrf.parcela} disabled={editIrrf.aliquota === "isento"} onChange={(e) => setEditIrrf((f) => ({ ...f, parcela: e.target.value }))} />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIrrfEditOpen(false)}>Cancelar</Button>
            <Button disabled={!editIrrf.base || !editIrrf.aliquota || !isIrrfDirty} onClick={handleSalvarEdicaoIrrf}>Salvar alterações</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DRAWER: CONSULTAR VIGÊNCIA (SOMENTE LEITURA) ================= */}
      {consultaDados && (
        <Sheet open={consultaOpen} onOpenChange={setConsultaOpen} width={720}>
          <SheetHeader>
            <SheetTitle>Vigência {consultaVig}</SheetTitle>
            <SheetDescription>Consulta somente leitura dos dados publicados nesta vigência.</SheetDescription>
          </SheetHeader>

          <div className="px-4">
            <Tabs>
              <TabsList>
                <TabsTrigger active={consultaTab === "feriados"} onClick={() => setConsultaTab("feriados")}>Feriados</TabsTrigger>
                <TabsTrigger active={consultaTab === "inss"} onClick={() => setConsultaTab("inss")}>INSS</TabsTrigger>
                <TabsTrigger active={consultaTab === "irrf"} onClick={() => setConsultaTab("irrf")}>IRRF</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            {consultaTab === "feriados" && (
              <Table>
                <TableHeader><tr><TableHead>Data</TableHead><TableHead>Feriado</TableHead><TableHead>Âmbito</TableHead><TableHead>Considerar</TableHead></tr></TableHeader>
                <TableBody>
                  {consultaDados.feriados.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhum feriado publicado nesta vigência.</td></tr>
                  )}
                  {consultaDados.feriados.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.data}</TableCell>
                      <TableCell>{f.nome}</TableCell>
                      <TableCell><Badge variant={badgeAmbito[f.ambito]}>{f.ambito}</Badge></TableCell>
                      <TableCell><span className="text-xs font-medium" style={{ color: f.considerar ? T.successText : T.mutedForeground }}>{f.considerar ? "Sim" : "Não"}</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {consultaTab === "inss" && (
              <Table>
                <TableHeader><tr><TableHead>Faixa (salário de contribuição)</TableHead><TableHead>Alíquota</TableHead></tr></TableHeader>
                <TableBody>
                  {consultaDados.inss.length === 0 && (
                    <tr><td colSpan={2} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma faixa publicada nesta vigência.</td></tr>
                  )}
                  {consultaDados.inss.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.faixa}</TableCell>
                      <TableCell><b>{r.aliquota}</b></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {consultaTab === "irrf" && (
              <Table>
                <TableHeader><tr><TableHead>Base de cálculo</TableHead><TableHead>Alíquota</TableHead><TableHead>Parcela a deduzir</TableHead></tr></TableHeader>
                <TableBody>
                  {consultaDados.irrf.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>Nenhuma faixa publicada nesta vigência.</td></tr>
                  )}
                  {consultaDados.irrf.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.base}</TableCell>
                      <TableCell>{r.aliquota === "isento" ? <Badge variant="outline">isento</Badge> : <b>{r.aliquota}</b>}</TableCell>
                      <TableCell>{r.parcela}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setConsultaOpen(false)}>Fechar</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DIALOG: CONFIRMAR PUBLICAÇÃO DE VIGÊNCIA ================= */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogHeader>
          <DialogTitle>Publicar vigência {vigencia}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          A vigência anterior será movida para o histórico e as alterações feitas no rascunho passam a valer oficialmente para todas as empresas.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>Cancelar</Button>
          <Button onClick={() => { handlePublicar(); setPublishDialogOpen(false); }}>Publicar</Button>
        </div>
      </Dialog>

      {/* ================= DIALOG: SAIR COM ALTERAÇÕES PENDENTES ================= */}
      <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <DialogHeader>
          <DialogTitle>Você tem alterações não publicadas</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Há mudanças no rascunho da vigência {vigencia} que ainda não foram publicadas. Você pode continuar editando aqui, ou sair e perder essas alterações.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleSairEPerder}>Sair sem publicar</Button>
          <Button onClick={handleContinuarEditando}>Continuar editando</Button>
        </div>
      </Dialog>

      {/* ================= TOAST DE SUCESSO ================= */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}