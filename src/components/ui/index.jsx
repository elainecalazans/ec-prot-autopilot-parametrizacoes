/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  CircleCheck,
  Search,
  Check,
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
function Tabs({ children }) {
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
   classes de overlay/content mantidas; showCloseButton adicionado
   pra cobrir o caso de diálogo de confirmação sem × — o usuário
   precisa escolher Cancelar ou Continuar explicitamente)
   ============================================================ */
function Dialog({ open, onOpenChange, children, showCloseButton = true }) {
  if (!open) return null;
  return (
    <div data-slot="dialog-overlay" className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,.5)" }} onClick={() => showCloseButton && onOpenChange(false)}>
      <div data-slot="dialog-content" onClick={(e) => e.stopPropagation()} className="relative grid w-full max-w-lg gap-4 rounded-lg border p-6" style={{ background: T.background, borderColor: T.border, boxShadow: T.shadowMd }}>
        {children}
        {showCloseButton && (
          <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 cursor-pointer" style={{ color: T.foreground }}>
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
function DialogHeader({ children }) { return <div className="flex flex-col gap-1.5">{children}</div>; }
function DialogTitle({ children }) { return <div className="text-lg leading-none font-semibold">{children}</div>; }
function DialogDescription({ children }) { return <div className="text-sm" style={{ color: T.mutedForeground }}>{children}</div>; }
function DialogFooter({ children }) { return <div className="flex justify-end gap-2">{children}</div>; }


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
  }, [toast, onClose]);
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
   PORTADO DE: components/ui/command.tsx + components/ui/popover.tsx
   (padrão real do DS pra combobox: PopoverTrigger + PopoverContent
   com Command dentro). Neste sandbox `radix-ui` e `cmdk` não estão
   disponíveis, então: Popover vira posicionamento absoluto controlado
   por estado local (open) em vez de Portal/Root do Radix; Command
   vira filtro de busca local em vez do motor do cmdk. Classes/tokens
   visuais mantidos (bg-popover, data-[selected=true]:bg-accent, ícone
   Search no input, Check no item selecionado) — só a "engine" trocou.
   ============================================================ */
function Combobox({ value, onChange, options, placeholder = "Selecionar...", searchPlaceholder = "Buscar...", emptyText = "Nenhum resultado encontrado.", width = 280 }) {
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickFora(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const selecionado = options.find((o) => o.value === value);
  const filtrados = options.filter((o) => `${o.label} ${o.sublabel || ""}`.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="relative" ref={wrapperRef} style={{ width }}>
      <button
        type="button" role="combobox" aria-expanded={open} data-slot="popover-trigger"
        onClick={() => setOpen((o) => !o)}
        className="h-9 w-full flex items-center justify-between gap-2 rounded-lg border px-3 text-sm cursor-pointer"
        style={{ background: "transparent", borderColor: T.input, color: selecionado ? T.foreground : T.mutedForeground, boxShadow: T.shadowXs }}
      >
        <span className="truncate">{selecionado ? selecionado.label : placeholder}</span>
        <ChevronDown className="size-4 shrink-0" style={{ color: T.mutedForeground }} />
      </button>

      {open && (
        <div data-slot="popover-content" className="absolute z-50 mt-1.5 w-full rounded-lg border overflow-hidden" style={{ background: T.background, borderColor: T.border, boxShadow: T.shadowMd }}>
          <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 px-3" style={{ borderBottom: `1px solid ${T.border}` }}>
            <Search className="size-4 shrink-0" style={{ color: T.mutedForeground, opacity: 0.6 }} />
            <input
              autoFocus value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={searchPlaceholder}
              className="h-full w-full text-sm outline-none"
              style={{ background: "transparent", color: T.foreground }}
            />
          </div>
          <div data-slot="command-list" className="max-h-[260px] overflow-y-auto p-1">
            {filtrados.length === 0 && <div data-slot="command-empty" className="py-6 text-center text-sm" style={{ color: T.mutedForeground }}>{emptyText}</div>}
            {filtrados.map((o) => {
              const isSel = o.value === value;
              return (
                <div
                  key={o.value} data-slot="command-item" data-selected={isSel}
                  onClick={() => { onChange(o.value); setOpen(false); setBusca(""); }}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer"
                  style={{ background: isSel ? T.accent : "transparent", color: T.foreground }}
                  onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = T.accent; }}
                  onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                >
                  <Check className="size-4 shrink-0" style={{ visibility: isSel ? "visible" : "hidden", color: T.mutedForeground }} />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{o.label}</span>
                    {o.sublabel && <span className="text-xs truncate" style={{ color: T.mutedForeground }}>{o.sublabel}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
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

export {
  T,
  cn,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  SelectField,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Alert,
  AlertDescription,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Sheet,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Toast,
  Combobox,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
};
