import React, { useState, useEffect, useRef } from "react";
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
const EMPRESAS = [
  { nome: "Padaria Aurora", codigo: "PA-0011", resp: "Elizandra Souza", optanteSimples: true },
  { nome: "Metalúrgica Sigma", codigo: "MS-0027", resp: "Wender Jonathan", optanteSimples: false },
  { nome: "Comércio Horizonte", codigo: "CH-0042", resp: "Andressa Lima", optanteSimples: true },
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
  { vig: "2027", data: null, por: null, status: "não iniciada" },
  { vig: "2026", data: "02/01/2026", por: "Jeniffer Dauricio", status: "vigente" },
  { vig: "2025", data: "03/01/2025", por: "Jeniffer Dauricio", status: "histórico" },
  { vig: "2024", data: "02/01/2024", por: "Luiz Andrade", status: "histórico" },
];
const badgeVigenciaStatus = { "vigente": "success", "histórico": "outline", "não iniciada": "secondary" };

const badgeAmbito = { Federal: "info", Estadual: "success", Municipal: "warning" };

/* ================================================================================
   DADOS ILUSTRATIVOS — trilha FISCAL
   Diferente de Regras Gerais: aqui NÃO existe conceito de vigência/
   rascunho/publicação. Cada tabela é uma base única, mutável direto
   (dado "oficial" assim que salvo). Estrutura de campos é um ESBOÇO —
   ainda sem o mapa de regras formal da Jeniffer para Fiscal; ajustar
   quando Elizandra/Jeisy validarem o conteúdo real.
   ================================================================================ */
// CFOP e SIMPLES NACIONAL — REMOVIDOS daqui na reunião de 17/07 (Fernando + Jeniffer):
// são regras nacionais (não variam por empresa), então moraram para "Regras por trilha
// > Fiscal", fora do Parâmetros por empresa. Aqui dentro do Fiscal (por empresa) fica só
// a EXCEÇÃO de CFOP, que referencia o registro nacional por id.
const CFOP_BASE_NACIONAL_INICIAL = [
  { id: 1, categoria: "Ativo", cfopSaida: "6551", cfopEntrada: "2551", escopo: "Interestadual", origem: "Automática" },
  { id: 2, categoria: "Ativo", cfopSaida: "6552", cfopEntrada: "2552", escopo: "Interestadual", origem: "Automática" },
  { id: 3, categoria: "Ativo", cfopSaida: "6553", cfopEntrada: "2553", escopo: "Interestadual", origem: "Automática" },
  { id: 4, categoria: "Ativo", cfopSaida: "6556", cfopEntrada: "2556", escopo: "Interestadual", origem: "Automática" },
];

// CORRIGIDO a partir do protótipo real da Jeniffer (prototipo-tela-regras.vercel.app,
// seção Fiscal > Fornecedor × plano de contas): o vínculo não é fornecedor→conta contábil
// direto, é fornecedor→CFOP + Acumulador (que definem a escrituração); "Status" substitui
// a "Natureza da operação" como coluna exibida na tabela (natureza fica só no cadastro).
const FORNECEDOR_PLANO_CONTAS_INICIAL = [
  { id: 1, fornecedor: "Distribuidora Nova Era Ltda", cnpj: "12.345.678/0001-90", cfop: "5102", acumulador: "ACM-001 — Base de cálculo ICMS", naturezaOperacao: "Compra para revenda", status: "ativo" },
  { id: 2, fornecedor: "Transportes Rocha S.A.", cnpj: "98.765.432/0001-11", cfop: "1653", acumulador: "ACM-014 — Base de cálculo PIS/COFINS", naturezaOperacao: "Serviço de frete", status: "ativo" },
];

// CORRIGIDO a partir do protótipo real da Jeniffer (seção Fiscal > Acumulador × conta):
// "um acumulador é o código do CFOP + um identificador que determina aquele CFOP para uma
// finalidade específica e a conta contábil de destino — ou seja, um conjunto de regras por
// empresa, padrão ou personalizado". Colunas reais: Acumulador | Conta contábil | Tipo | Em
// uso (sem Descrição/Natureza separadas, que eu tinha esboçado errado antes).
const ACUMULADOR_CONTA_INICIAL = [
  { id: 1, acumulador: "ACM-001 — Base de cálculo ICMS", contaContabil: "4.1.01.001", tipo: "Padrão", emUso: "sim" },
  { id: 2, acumulador: "ACM-014 — Base de cálculo PIS/COFINS", contaContabil: "4.1.02.003", tipo: "Padrão", emUso: "sim" },
  { id: 3, acumulador: "ACM-022 — Crédito de ICMS sobre insumos (personalizado)", contaContabil: "1.1.03.007", tipo: "Personalizado", emUso: "não" },
];

// CORRIGIDO a partir do protótipo real da Jeniffer (prototipo-tela-regras.vercel.app,
// seção Fiscal > Simples Nacional): estrutura por ANEXO (I a V), não por faixa de receita
// bruta como eu tinha esboçado antes. Nacional (não por empresa) — mesma decisão da reunião
// de 17/07 aplicada ao CFOP: vive em "Regras por trilha > Fiscal", não dentro do Parâmetros
// por empresa. "Em uso" aqui reflete o padrão nacional; o protótipo da Jeniffer também mostra
// um toggle por EMPRESA pra forçar um único anexo (ignorando classificação por nota) — isso é
// uma exceção por empresa, então fica de fora daqui por ora (ver observação na tela).
const SIMPLES_NACIONAL_INICIAL = [
  { id: 1, anexo: "Anexo I", atividade: "Comércio", aliquotaInicial: "4,00%", emUso: "sim" },
  { id: 2, anexo: "Anexo II", atividade: "Indústria", aliquotaInicial: "4,50%", emUso: "não" },
  { id: 3, anexo: "Anexo III", atividade: "Serviços", aliquotaInicial: "6,00%", emUso: "não" },
];

// Uma exceção ilustrativa pra mostrar o conceito: PA-0011 tem uma regra de CFOP própria
// (cadastrada manualmente) que sobrescreve a base nacional, mesma estrutura de campos.
const CFOP_EXCECOES_INICIAIS_POR_EMPRESA = {
  "PA-0011": [
    { id: 101, categoria: "Ativo", cfopSaida: "5102", cfopEntrada: "1102", escopo: "Interna", origem: "Manual" },
  ],
};

const badgeCategoriaCfop = { "Ativo": "success", "Inativo": "outline" };
const badgeEscopoCfop = { "Interna": "info", "Interestadual": "secondary", "Internacional": "warning" };
const badgeOrigemCfop = { "Automática": "success", "Manual": "outline" };
const badgeTipoAcumulador = { "Padrão": "secondary", "Personalizado": "outline" };
const badgeStatusFornecedor = { "ativo": "success", "inativo": "outline" };
const badgeEmUso = { "sim": "success", "não": "outline" };

// Dados por empresa — Fornecedor x Plano de Contas e Acumulador x Conta têm conjunto
// próprio por empresa. CFOP (exceções) também vive aqui, por empresa. simplesConfig é a
// exceção por empresa do Simples Nacional (protótipo da Jeniffer): permite forçar um único
// anexo, ignorando a classificação automática por nota — só relevante se a empresa for
// optante do Simples (ver EMPRESAS[].optanteSimples). A tabela de anexos em si (CFOP base
// nacional e a relação de anexos do Simples) NÃO entra aqui: vive em estados nacionais
// próprios (ver acima), compartilhados entre todas as empresas.
function criarFiscalDadosIniciais() {
  const base = {};
  EMPRESAS.forEach((e) => {
    base[e.codigo] = {
      cfopExcecoes: (CFOP_EXCECOES_INICIAIS_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
      fornecedor: FORNECEDOR_PLANO_CONTAS_INICIAL.map((r) => ({ ...r })),
      acumulador: ACUMULADOR_CONTA_INICIAL.map((r) => ({ ...r })),
      simplesConfig: { usarApenasUmAnexo: false, anexoForcado: "Anexo I" },
    };
  });
  return base;
}

// Configuração declarativa de cada sub-conteúdo da trilha Fiscal — usada pelas
// abas, pela tabela genérica e pelo drawer genérico de Adicionar/Editar. O campo
// "cfop" é reaproveitado tanto pra base nacional (Regras por trilha) quanto pra
// exceções por empresa (Parâmetros); mesmo formato de linha, só o destino de
// gravação muda — ver handleSalvarFiscal.
const FISCAL_TIPOS = {
  cfop: {
    label: "CFOP",
    tituloSingular: "regra de CFOP",
    colunas: [
      { chave: "categoria", titulo: "Categoria", badge: badgeCategoriaCfop },
      { chave: "cfopSaida", titulo: "CFOP Saída" },
      { chave: "cfopEntrada", titulo: "CFOP Entrada" },
      { chave: "escopo", titulo: "Escopo", badge: badgeEscopoCfop },
      { chave: "origem", titulo: "Origem", badge: badgeOrigemCfop },
    ],
    campos: [
      { chave: "categoria", label: "Categoria", tipoCampo: "select", opcoes: ["Ativo", "Inativo"] },
      { chave: "cfopSaida", label: "CFOP Saída", placeholder: "Ex.: 6551" },
      { chave: "cfopEntrada", label: "CFOP Entrada", placeholder: "Ex.: 2551" },
      { chave: "escopo", label: "Escopo", tipoCampo: "select", opcoes: ["Interna", "Interestadual", "Internacional"] },
      { chave: "origem", label: "Origem", tipoCampo: "select", opcoes: ["Automática", "Manual"] },
    ],
    obrigatorios: ["cfopSaida", "cfopEntrada"],
    resumoLinha: (r) => `${r.cfopSaida} → ${r.cfopEntrada}`,
  },
  fornecedor: {
    label: "Fornecedor x Plano de Contas",
    tituloSingular: "fornecedor",
    colunas: [
      { chave: "fornecedor", titulo: "Fornecedor" },
      { chave: "cnpj", titulo: "CNPJ" },
      { chave: "cfop", titulo: "CFOP" },
      { chave: "acumulador", titulo: "Acumulador" },
      { chave: "status", titulo: "Status", badge: badgeStatusFornecedor },
    ],
    campos: [
      { chave: "fornecedor", label: "Fornecedor", placeholder: "Ex.: Distribuidora Nova Era Ltda" },
      { chave: "cnpj", label: "CNPJ", placeholder: "Ex.: 12.345.678/0001-90" },
      { chave: "cfop", label: "CFOP", placeholder: "Ex.: 5102" },
      { chave: "acumulador", label: "Acumulador", placeholder: "Ex.: ACM-001 — Base de cálculo ICMS" },
      { chave: "naturezaOperacao", label: "Natureza da operação", placeholder: "Ex.: Compra para revenda" },
      { chave: "status", label: "Status", tipoCampo: "select", opcoes: ["ativo", "inativo"] },
    ],
    obrigatorios: ["fornecedor", "cnpj"],
    resumoLinha: (r) => r.fornecedor,
  },
  acumulador: {
    label: "Acumulador x Conta",
    tituloSingular: "acumulador",
    colunas: [
      { chave: "acumulador", titulo: "Acumulador" },
      { chave: "contaContabil", titulo: "Conta contábil" },
      { chave: "tipo", titulo: "Tipo", badge: badgeTipoAcumulador },
      { chave: "emUso", titulo: "Em uso", badge: badgeEmUso },
    ],
    campos: [
      { chave: "acumulador", label: "Acumulador", placeholder: "Ex.: ACM-001 — Base de cálculo ICMS" },
      { chave: "contaContabil", label: "Conta contábil", placeholder: "Ex.: 4.1.01.001" },
      { chave: "tipo", label: "Tipo", tipoCampo: "select", opcoes: ["Padrão", "Personalizado"] },
      { chave: "emUso", label: "Em uso", tipoCampo: "select", opcoes: ["sim", "não"] },
    ],
    obrigatorios: ["acumulador", "contaContabil"],
    resumoLinha: (r) => r.acumulador,
  },
  simples: {
    label: "Simples Nacional",
    tituloSingular: "anexo",
    colunas: [
      { chave: "anexo", titulo: "Anexo" },
      { chave: "atividade", titulo: "Atividade" },
      { chave: "aliquotaInicial", titulo: "Alíquota inicial" },
      { chave: "emUso", titulo: "Em uso", badge: badgeEmUso },
    ],
    campos: [
      { chave: "anexo", label: "Anexo", tipoCampo: "select", opcoes: ["Anexo I", "Anexo II", "Anexo III", "Anexo IV", "Anexo V"] },
      { chave: "atividade", label: "Atividade", placeholder: "Ex.: Comércio" },
      { chave: "aliquotaInicial", label: "Alíquota inicial", placeholder: "Ex.: 4,00%" },
      { chave: "emUso", label: "Em uso", tipoCampo: "select", opcoes: ["sim", "não"] },
    ],
    obrigatorios: ["anexo", "aliquotaInicial"],
    resumoLinha: (r) => r.anexo,
  },
};

// Tabela genérica reaproveitada por todas as sub-telas de CFOP/Fornecedor/Acumulador/
// Simples (tanto em Regras por trilha quanto em Parâmetros) — evita repetir a mesma
// marcação de Table/TableHeader/TableBody em cada uma.
function FiscalTable({ config, linhas, isOperador, onEditar, mensagemVazia = "Nenhum registro cadastrado ainda.", rotuloAcao }) {
  return (
    <Table>
      <TableHeader>
        <tr>
          {config.colunas.map((c) => <TableHead key={c.chave}>{c.titulo}</TableHead>)}
          <TableHead></TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {linhas.length === 0 && (
          <tr><td colSpan={config.colunas.length + 1} className="px-6 py-8 text-center text-xs" style={{ color: T.mutedForeground }}>{mensagemVazia}</td></tr>
        )}
        {linhas.map((r) => (
          <TableRow key={r.id}>
            {config.colunas.map((c) => (
              <TableCell key={c.chave}>
                {c.badge ? <Badge variant={c.badge[r[c.chave]] || "outline"}>{r[c.chave]}</Badge> : r[c.chave]}
              </TableCell>
            ))}
            <TableCell><span onClick={() => !isOperador && onEditar(r)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>{rotuloAcao ? rotuloAcao(r) : "editar"}</span></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ================================================================================
   DADOS ILUSTRATIVOS — trilha DP
   Mesma lógica da Fiscal: catálogos NACIONAIS (sindicato, rubrica, atualizações
   anuais) moram em "Regras por trilha > DP"; vínculos e amarrações POR EMPRESA
   moram em "Parâmetros > DP". Estrutura fiel ao protótipo da Jeniffer
   (prototipo-tela-regras.vercel.app, seção DP) — esboço, ainda sem validação de
   Jaqueline/Wender.
   ================================================================================ */
// Cadastro de sindicato — catálogo nacional. Cada sindicato/CCT define jornada, HE,
// piso e férias "padrão"; empresas vinculadas herdam isso e podem ter exceções
// (ver sindicatoVinculo por empresa, em Parâmetros > DP).
const SINDICATOS_INICIAL = [
  { id: 1, sindicato: "Sind. dos Metalúrgicos — CCT 2026/2027", vigenciaCCT: "2026/2027", jornadaSemanal: "44h", adicionalHE: "60%", pisoSalarial: "R$ 1.850,00", regraFerias: "30 dias corridos" },
  { id: 2, sindicato: "Sind. do Comércio — CCT 2026", vigenciaCCT: "2026", jornadaSemanal: "40h", adicionalHE: "50%", pisoSalarial: "R$ 1.700,00", regraFerias: "30 dias corridos" },
];

// Cadastro de rubrica — catálogo nacional, só rubricas "Geral" (as "Específica" só
// fazem sentido no contexto de um sindicato/empresa, então nascem dentro da amarração
// Sindicato x Rubrica x Conta, em Parâmetros > DP, não aqui).
const RUBRICAS_INICIAL = [
  { id: 1, rubrica: "Salário base", codigo: "001", modelo: "Referência", referenciaFormula: "Valor mensal", tipo: "Geral" },
  { id: 2, rubrica: "INSS patronal", codigo: "920", modelo: "Fórmula", referenciaFormula: "% sobre salário base", tipo: "Geral" },
  { id: 3, rubrica: "Vale-refeição", codigo: "305", modelo: "Referência", referenciaFormula: "Valor por dia útil", tipo: "Geral" },
];

// Atualizações anuais — versionado por competência/vigência, igual ao modelo de
// Feriados/INSS/IRRF em Regras Gerais (rascunho + badge de pendência + Publicar).
// Conjunto fixo de 3 atualizações por vigência — não faz sentido "adicionar" uma nova
// aqui, só editar valor atual / novo valor dentro da vigência selecionada.
const ATUALIZACOES_POR_VIGENCIA_INICIAL = {
  "2027": [
    { id: 1, atualizacao: "Pró-labore", periodicidade: "Anual", valorAtual: "R$ 1.630,00", novo: "" },
    { id: 2, atualizacao: "Salário (dissídio)", periodicidade: "Anual", valorAtual: "R$ 1.800,00", novo: "" },
    { id: 3, atualizacao: "RAT / FAP", periodicidade: "Anual", valorAtual: "2,0% x 1,2", novo: "" },
  ],
  "2026": [
    { id: 1, atualizacao: "Pró-labore", periodicidade: "Anual", valorAtual: "R$ 1.518,00", novo: "R$ 1.630,00" },
    { id: 2, atualizacao: "Salário (dissídio)", periodicidade: "Anual", valorAtual: "R$ 1.700,00", novo: "R$ 1.800,00" },
    { id: 3, atualizacao: "RAT / FAP", periodicidade: "Anual", valorAtual: "2,0% x 1,0", novo: "2,0% x 1,2" },
  ],
  "2025": [
    { id: 1, atualizacao: "Pró-labore", periodicidade: "Anual", valorAtual: "R$ 1.412,00", novo: "R$ 1.518,00" },
    { id: 2, atualizacao: "Salário (dissídio)", periodicidade: "Anual", valorAtual: "R$ 1.600,00", novo: "R$ 1.700,00" },
    { id: 3, atualizacao: "RAT / FAP", periodicidade: "Anual", valorAtual: "1,8% x 1,0", novo: "2,0% x 1,0" },
  ],
  "2024": [
    { id: 1, atualizacao: "Pró-labore", periodicidade: "Anual", valorAtual: "R$ 1.320,00", novo: "R$ 1.412,00" },
    { id: 2, atualizacao: "Salário (dissídio)", periodicidade: "Anual", valorAtual: "R$ 1.500,00", novo: "R$ 1.600,00" },
    { id: 3, atualizacao: "RAT / FAP", periodicidade: "Anual", valorAtual: "1,8% x 1,0", novo: "1,8% x 1,0" },
  ],
};
function criarAlteredAtualizacoesVazio() {
  return { "2027": new Set(), "2026": new Set(), "2025": new Set(), "2024": new Set() };
}
// Histórico de publicações das atualizações anuais — mesmo papel do VIGENCIAS_HIST
// de Regras Gerais, só que escopado ao DP.
const DP_VIGENCIAS_HIST = [
  { vig: "2026", data: "05/01/2026", por: "Jeniffer Dauricio", status: "vigente" },
  { vig: "2025", data: "06/01/2025", por: "Jeniffer Dauricio", status: "histórico" },
  { vig: "2024", data: "04/01/2024", por: "Thaís Lima", status: "histórico" },
];

const badgeTipoRubrica = { "Geral": "secondary", "Específica": "outline" };
const badgeStatusAmarracao = { "amarrada": "success", "revisar": "warning" };

// Vínculo por empresa (Sindicato x Empresa) — só Metalúrgica Sigma tem sindicato
// vinculado no mock, pra dar pra ver o estado vazio nas outras duas.
const SINDICATO_VINCULO_INICIAL_POR_EMPRESA = {
  "MS-0027": { sindicatoId: 1, variaveisEspecificas: "" },
};

// Amarração Sindicato x Rubrica x Conta por empresa — um exemplo ilustrativo (mesma
// linha usada no protótipo Contábil da Jeniffer: adicional de periculosidade).
const SINDICATO_RUBRICA_CONTA_INICIAL_POR_EMPRESA = {
  "MS-0027": [
    { id: 101, rubrica: "Adicional periculosidade", codigo: "210", regraSindicato: "Sind. dos Metalúrgicos — adicional de 30% sobre salário base", contaContabil: "4.1.1.12", status: "amarrada" },
  ],
};

function criarDPDadosIniciais() {
  const base = {};
  EMPRESAS.forEach((e) => {
    const vinculo = SINDICATO_VINCULO_INICIAL_POR_EMPRESA[e.codigo] || { sindicatoId: null, variaveisEspecificas: "" };
    base[e.codigo] = {
      sindicatoVinculo: { ...vinculo },
      sindicatoRubricaConta: (SINDICATO_RUBRICA_CONTA_INICIAL_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
    };
  });
  return base;
}

// Configuração declarativa — mesmo padrão do FISCAL_TIPOS, reaproveitando o mesmo
// FiscalTable genérico e o mesmo drawer genérico de Adicionar/Editar.
const DP_TIPOS = {
  sindicato: {
    label: "Cadastro de sindicato",
    tituloSingular: "sindicato",
    colunas: [
      { chave: "sindicato", titulo: "Sindicato / CCT" },
      { chave: "vigenciaCCT", titulo: "Vigência CCT" },
      { chave: "jornadaSemanal", titulo: "Jornada semanal" },
      { chave: "adicionalHE", titulo: "Adicional HE" },
      { chave: "pisoSalarial", titulo: "Piso salarial" },
      { chave: "regraFerias", titulo: "Regra de férias" },
    ],
    campos: [
      { chave: "sindicato", label: "Sindicato / CCT", placeholder: "Ex.: Sind. dos Metalúrgicos — CCT 2026/2027" },
      { chave: "vigenciaCCT", label: "Vigência CCT", placeholder: "Ex.: 2026/2027" },
      { chave: "jornadaSemanal", label: "Jornada semanal", placeholder: "Ex.: 44h" },
      { chave: "adicionalHE", label: "Adicional HE", placeholder: "Ex.: 60%" },
      { chave: "pisoSalarial", label: "Piso salarial", placeholder: "Ex.: R$ 1.850,00" },
      { chave: "regraFerias", label: "Regra de férias", placeholder: "Ex.: 30 dias corridos" },
    ],
    obrigatorios: ["sindicato", "vigenciaCCT"],
    resumoLinha: (r) => r.sindicato,
  },
  rubrica: {
    label: "Cadastro de rubrica",
    tituloSingular: "rubrica",
    colunas: [
      { chave: "rubrica", titulo: "Rubrica" },
      { chave: "codigo", titulo: "Cód." },
      { chave: "modelo", titulo: "Modelo" },
      { chave: "referenciaFormula", titulo: "Referência / fórmula" },
      { chave: "tipo", titulo: "Tipo", badge: badgeTipoRubrica },
    ],
    campos: [
      { chave: "rubrica", label: "Rubrica", placeholder: "Ex.: Salário base" },
      { chave: "codigo", label: "Código", placeholder: "Ex.: 001" },
      { chave: "modelo", label: "Modelo", tipoCampo: "select", opcoes: ["Referência", "Fórmula"] },
      { chave: "referenciaFormula", label: "Referência / fórmula", placeholder: "Ex.: Valor mensal, ou % sobre base" },
      { chave: "tipo", label: "Tipo", tipoCampo: "select", opcoes: ["Geral", "Específica"] },
    ],
    obrigatorios: ["rubrica", "codigo"],
    resumoLinha: (r) => r.rubrica,
  },
  atualizacao: {
    label: "Atualizações anuais",
    tituloSingular: "atualização",
    colunas: [
      { chave: "atualizacao", titulo: "Atualização" },
      { chave: "periodicidade", titulo: "Periodicidade" },
      { chave: "valorAtual", titulo: "Valor / índice atual" },
      { chave: "novo", titulo: "Novo" },
    ],
    campos: [
      { chave: "valorAtual", label: "Valor / índice atual", placeholder: "Ex.: R$ 1.518,00" },
      { chave: "novo", label: "Novo", placeholder: "Ex.: R$ 1.630,00" },
    ],
    obrigatorios: ["novo"],
    resumoLinha: (r) => r.atualizacao,
  },
  sindicatoRubricaConta: {
    label: "Sindicato x Rubrica x Conta",
    tituloSingular: "amarração",
    colunas: [
      { chave: "rubrica", titulo: "Rubrica" },
      { chave: "codigo", titulo: "Cód." },
      { chave: "regraSindicato", titulo: "Regra do sindicato" },
      { chave: "contaContabil", titulo: "Conta contábil" },
      { chave: "status", titulo: "Status", badge: badgeStatusAmarracao },
    ],
    campos: [
      { chave: "rubrica", label: "Rubrica", placeholder: "Ex.: Adicional periculosidade" },
      { chave: "codigo", label: "Código", placeholder: "Ex.: 210" },
      { chave: "regraSindicato", label: "Regra do sindicato", placeholder: "Ex.: Sind. dos Metalúrgicos — adicional de 30%" },
      { chave: "contaContabil", label: "Conta contábil", placeholder: "Ex.: 4.1.1.12" },
      { chave: "status", label: "Status", tipoCampo: "select", opcoes: ["amarrada", "revisar"] },
    ],
    obrigatorios: ["rubrica", "contaContabil"],
    resumoLinha: (r) => r.rubrica,
  },
};

// Campos pesquisáveis por tipo, mesma lógica do CAMPOS_BUSCA_FISCAL
const CAMPOS_BUSCA_DP = {
  sindicato: { campos: ["sindicato", "vigenciaCCT", "jornadaSemanal"], placeholder: "Sindicato, vigência CCT..." },
  rubrica: { campos: ["rubrica", "codigo", "modelo", "tipo"], placeholder: "Rubrica, código, modelo..." },
  sindicatoRubricaConta: { campos: ["rubrica", "codigo", "regraSindicato", "contaContabil"], placeholder: "Rubrica, conta, regra do sindicato..." },
};

/* ================================================================================
   DADOS ILUSTRATIVOS — trilha CONTÁBIL
   Diferente de Fiscal e DP: aqui NÃO existe nenhum catálogo nacional próprio — o
   Contábil só referencia origens que já existem em outro lugar (acumuladores do
   Fiscal, rubricas do DP) e faz a ponte delas até a conta contábil da empresa. Por
   isso "Regras por Trilha > Contábil" fica de fora por ora (nada nacional pra
   mostrar lá) — tudo aqui é direto em Parâmetros, por empresa, igual ao Fiscal
   (sem vigência/rascunho/publicação). Fiel ao protótipo real da Jeniffer
   (prototipo-tela-regras.vercel.app, seção Contábil, empresa=comercio-horizonte).
   ================================================================================ */
const ACUMULADOR_CONTA_CONTABIL_INICIAL_POR_EMPRESA = {
  "CH-0042": [
    { id: 1, origem: "Receita venda mercadoria", trilha: "Fiscal", contaContabil: "3.1.1.01", status: "amarrado" },
    { id: 2, origem: "Adicional periculosidade", trilha: "DP", contaContabil: "4.1.1.12", status: "amarrado" },
    { id: 3, origem: "Material consumo fábrica", trilha: "Fiscal", contaContabil: "conta genérica", status: "revisar" },
  ],
};
const RUBRICA_CONTA_CONTABIL_INICIAL_POR_EMPRESA = {
  "CH-0042": [
    { id: 1, rubrica: "Salário base", codigo: "001", contaContabil: "4.1.1.01 Salários", status: "amarrada" },
    { id: 2, rubrica: "INSS patronal", codigo: "920", contaContabil: "4.1.1.20 Encargos", status: "amarrada" },
    { id: 3, rubrica: "Vale-refeição", codigo: "305", contaContabil: "conta genérica", status: "revisar" },
  ],
};
const ADEQUACAO_PLANO_INICIAL_POR_EMPRESA = {
  "CH-0042": [
    { id: 1, conta: "3.1.1.01", descricao: "Receita de vendas", natureza: "Receita", ativa: "sim" },
    { id: 2, conta: "4.1.1.01", descricao: "Salários", natureza: "Despesa", ativa: "sim" },
    { id: 3, conta: "4.1.2.07", descricao: "Material de consumo", natureza: "Despesa", ativa: "não" },
  ],
};
const PERSONALIZACAO_INICIAL_POR_EMPRESA = {
  "CH-0042": [
    { id: 1, origem: "Material consumo fábrica", tipo: "Fiscal", contaPadrao: "4.1.2.07", contaPersonalizada: "4.1.2.08", condicao: "", escopo: "só esta empresa" },
    { id: 2, origem: "Adicional periculosidade", tipo: "DP", contaPadrao: "conta genérica", contaPersonalizada: "4.1.1.12", condicao: "", escopo: "só esta empresa" },
  ],
};

function criarContabilDadosIniciais() {
  const base = {};
  EMPRESAS.forEach((e) => {
    base[e.codigo] = {
      acumuladorConta: (ACUMULADOR_CONTA_CONTABIL_INICIAL_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
      rubricaConta: (RUBRICA_CONTA_CONTABIL_INICIAL_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
      adequacaoPlano: (ADEQUACAO_PLANO_INICIAL_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
      personalizacao: (PERSONALIZACAO_INICIAL_POR_EMPRESA[e.codigo] || []).map((r) => ({ ...r })),
    };
  });
  return base;
}

const badgeTrilhaOrigem = { "Fiscal": "info", "DP": "secondary", "Contábil": "outline" };
// "amarrado" (acumulador, masculino) e "amarrada" (rubrica, feminino) — mesmo status,
// concordância de gênero diferente conforme a origem.
const badgeStatusAmarracaoContabil = { "amarrado": "success", "amarrada": "success", "revisar": "warning" };

const CONTABIL_TIPOS = {
  acumuladorConta: {
    label: "Acumulador x Conta",
    tituloSingular: "amarração",
    colunas: [
      { chave: "origem", titulo: "Acumulador (origem)" },
      { chave: "trilha", titulo: "Trilha", badge: badgeTrilhaOrigem },
      { chave: "contaContabil", titulo: "Conta contábil" },
      { chave: "status", titulo: "Status", badge: badgeStatusAmarracaoContabil },
    ],
    campos: [
      { chave: "origem", label: "Acumulador (origem)", placeholder: "Ex.: Receita venda mercadoria" },
      { chave: "trilha", label: "Trilha", tipoCampo: "select", opcoes: ["Fiscal", "DP"] },
      { chave: "contaContabil", label: "Conta contábil", placeholder: "Ex.: 3.1.1.01" },
      { chave: "status", label: "Status", tipoCampo: "select", opcoes: ["amarrado", "revisar"] },
    ],
    obrigatorios: ["origem", "contaContabil"],
    resumoLinha: (r) => r.origem,
  },
  rubricaConta: {
    label: "Rubrica x Conta",
    tituloSingular: "amarração",
    colunas: [
      { chave: "rubrica", titulo: "Rubrica (origem DP)" },
      { chave: "codigo", titulo: "Cód." },
      { chave: "contaContabil", titulo: "Conta contábil" },
      { chave: "status", titulo: "Status", badge: badgeStatusAmarracaoContabil },
    ],
    campos: [
      { chave: "rubrica", label: "Rubrica (origem DP)", placeholder: "Ex.: Salário base" },
      { chave: "codigo", label: "Código", placeholder: "Ex.: 001" },
      { chave: "contaContabil", label: "Conta contábil", placeholder: "Ex.: 4.1.1.01 Salários" },
      { chave: "status", label: "Status", tipoCampo: "select", opcoes: ["amarrada", "revisar"] },
    ],
    obrigatorios: ["rubrica", "contaContabil"],
    resumoLinha: (r) => r.rubrica,
  },
  adequacaoPlano: {
    label: "Adequação do plano de contas",
    tituloSingular: "conta",
    colunas: [
      { chave: "conta", titulo: "Conta" },
      { chave: "descricao", titulo: "Descrição" },
      { chave: "natureza", titulo: "Natureza" },
      { chave: "ativa", titulo: "Ativa", badge: badgeEmUso },
    ],
    campos: [
      { chave: "conta", label: "Conta", placeholder: "Ex.: 3.1.1.01" },
      { chave: "descricao", label: "Descrição", placeholder: "Ex.: Receita de vendas" },
      { chave: "natureza", label: "Natureza", tipoCampo: "select", opcoes: ["Receita", "Despesa", "Ativo", "Passivo"] },
      { chave: "ativa", label: "Ativa", tipoCampo: "select", opcoes: ["sim", "não"] },
    ],
    obrigatorios: ["conta", "descricao"],
    resumoLinha: (r) => r.conta,
  },
  personalizacao: {
    label: "Personalização",
    tituloSingular: "personalização",
    colunas: [
      { chave: "origem", titulo: "Origem" },
      { chave: "tipo", titulo: "Tipo", badge: badgeTrilhaOrigem },
      { chave: "contaPersonalizada", titulo: "Conta personalizada" },
      { chave: "escopo", titulo: "Escopo" },
    ],
    campos: [
      { chave: "origem", label: "Origem", placeholder: "Ex.: Material consumo fábrica" },
      { chave: "tipo", label: "Tipo", tipoCampo: "select", opcoes: ["Fiscal", "DP"] },
      { chave: "contaPadrao", label: "Conta padrão", placeholder: "Ex.: 4.1.2.07" },
      { chave: "contaPersonalizada", label: "Conta personalizada (esta empresa)", placeholder: "Ex.: 4.1.2.08" },
      { chave: "condicao", label: "Condição (opcional)", placeholder: "Ex.: só para notas acima de R$ 5.000" },
    ],
    obrigatorios: ["origem", "contaPersonalizada"],
    resumoLinha: (r) => r.origem,
  },
};
const CAMPOS_BUSCA_CONTABIL = {
  acumuladorConta: { campos: ["origem", "trilha", "contaContabil"], placeholder: "Acumulador, trilha, conta..." },
  rubricaConta: { campos: ["rubrica", "codigo", "contaContabil"], placeholder: "Rubrica, código, conta..." },
  adequacaoPlano: { campos: ["conta", "descricao", "natureza"], placeholder: "Conta, descrição, natureza..." },
  personalizacao: { campos: ["origem", "tipo", "contaPersonalizada"], placeholder: "Origem, tipo, conta..." },
};

/* ================================================================================
   APP
   ================================================================================ */
export default function AutopilotRegras() {
  const [section, setSection] = useState("regras");
  const [tab, setTab] = useState("feriados");
  const [role, setRole] = useState("admin");
  const [ambito, setAmbito] = useState("Todos");
  const [uf, setUf] = useState("Todas");
  const [municipio, setMunicipio] = useState("Todos");
  const [vigencia, setVigencia] = useState("2026");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [empresaSel, setEmpresaSel] = useState(null);
  const [parametrosOpen, setParametrosOpen] = useState(true);
  const [regrasTrilhaOpen, setRegrasTrilhaOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  // Pedido do Fernando (reunião 17/07): primeiro pedir a vigência, só depois mostrar os
  // dados — em vez de um seletor solto ao lado das abas. null = lista de vigências
  // (landing de Regras Gerais); um ano = "dentro" daquela vigência (Feriados/INSS/IRRF).
  const [regrasVigenciaAtiva, setRegrasVigenciaAtiva] = useState(null);
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

  // ===== REGRAS POR TRILHA — nacionais, sem vínculo de empresa e sem vigência/rascunho.
  // Fiscal e DP já ativos; Contábil "em breve". Aba local dentro da seção (não precisa
  // de seletor de empresa, já que é a mesma info pra todo mundo).
  const [regrasTrilhaFiscalTab, setRegrasTrilhaFiscalTab] = useState("cfop");
  const [cfopBaseNacional, setCfopBaseNacional] = useState(CFOP_BASE_NACIONAL_INICIAL);
  const [simplesNacionalBase, setSimplesNacionalBase] = useState(SIMPLES_NACIONAL_INICIAL);
  const [cfopBuscaNacional, setCfopBuscaNacional] = useState("");
  const [cfopEscopoFiltroNacional, setCfopEscopoFiltroNacional] = useState("Todas");

  // ===== FISCAL (Parâmetros, por empresa) — sem vigência/rascunho/publicação; dado
  // único por EMPRESA, edição direta. CFOP aqui é só EXCEÇÃO (referencia o nacional).
  // Exige seleção explícita de empresa antes de mostrar qualquer tabela (null = nada selecionado ainda)
  const [empresaFiscalSel, setEmpresaFiscalSel] = useState(null);
  const [fiscalTab, setFiscalTab] = useState("cfop");
  const [fiscalDadosPorEmpresa, setFiscalDadosPorEmpresa] = useState(criarFiscalDadosIniciais);
  const [fiscalSheetOpen, setFiscalSheetOpen] = useState(false);
  const [fiscalSheetTipo, setFiscalSheetTipo] = useState(null); // 'cfop' | 'fornecedor' | 'acumulador' | 'simples'
  const [fiscalSheetModo, setFiscalSheetModo] = useState("add"); // 'add' | 'edit'
  const [fiscalSheetEscopo, setFiscalSheetEscopo] = useState("empresa"); // 'nacional' | 'empresa' — 'nacional' só usado em Regras por trilha
  const [fiscalEditandoId, setFiscalEditandoId] = useState(null);
  const [fiscalForm, setFiscalForm] = useState(null);
  const [fiscalFormOriginal, setFiscalFormOriginal] = useState(null);
  // Busca + filtro por escopo das EXCEÇÕES de CFOP por empresa (a base nacional tem seu
  // próprio filtro, ver cfopBuscaNacional/cfopEscopoFiltroNacional acima)
  const [cfopBuscaExcecao, setCfopBuscaExcecao] = useState("");
  const [cfopEscopoFiltroExcecao, setCfopEscopoFiltroExcecao] = useState("Todas");
  const [fornecedorBusca, setFornecedorBusca] = useState("");
  const [acumuladorBusca, setAcumuladorBusca] = useState("");
  const [simplesBuscaNacional, setSimplesBuscaNacional] = useState("");
  const [simplesConfigRascunho, setSimplesConfigRascunho] = useState({ usarApenasUmAnexo: false, anexoForcado: "Anexo I" });

  // ===== REGRAS POR TRILHA > DP — catálogos nacionais (sindicato, rubrica), sem
  // empresa envolvida. Atualizações anuais é versionada por vigência (competência),
  // igual Feriados/INSS/IRRF de Regras Gerais — rascunho + Publicar, não save direto.
  const [regrasTrilhaDPTab, setRegrasTrilhaDPTab] = useState("sindicato");
  const [sindicatosNacional, setSindicatosNacional] = useState(SINDICATOS_INICIAL);
  const [rubricasNacional, setRubricasNacional] = useState(RUBRICAS_INICIAL);
  const [sindicatoBuscaNacional, setSindicatoBuscaNacional] = useState("");
  const [rubricaBuscaNacional, setRubricaBuscaNacional] = useState("");
  const [vigenciaDP, setVigenciaDP] = useState("2026");
  const [atualizacoesPorVigencia, setAtualizacoesPorVigencia] = useState(ATUALIZACOES_POR_VIGENCIA_INICIAL);
  const [snapshotAtualizacoesPorVigencia, setSnapshotAtualizacoesPorVigencia] = useState(ATUALIZACOES_POR_VIGENCIA_INICIAL);
  const [alteredAtualizacoesIds, setAlteredAtualizacoesIds] = useState(criarAlteredAtualizacoesVazio);
  const [publicarAtualizacoesDialogOpen, setPublicarAtualizacoesDialogOpen] = useState(false);
  const [consultaDPOpen, setConsultaDPOpen] = useState(false);
  const [consultaDPVig, setConsultaDPVig] = useState(null);

  // ===== PARÂMETROS > DP — por empresa: vínculo com sindicato (+ variáveis
  // específicas) e amarração Sindicato x Rubrica x Conta.
  const [empresaDPSel, setEmpresaDPSel] = useState(null);
  const [dpTab, setDpTab] = useState("sindicatoEmpresa");
  const [dpDadosPorEmpresa, setDpDadosPorEmpresa] = useState(criarDPDadosIniciais);
  const [sindicatoVinculoRascunho, setSindicatoVinculoRascunho] = useState({ sindicatoId: null, variaveisEspecificas: "" });
  const [sindicatoRubricaContaBusca, setSindicatoRubricaContaBusca] = useState("");
  const [dpSheetOpen, setDpSheetOpen] = useState(false);
  const [dpSheetTipo, setDpSheetTipo] = useState(null); // 'sindicato' | 'rubrica' | 'atualizacao' | 'sindicatoRubricaConta'
  const [dpSheetModo, setDpSheetModo] = useState("add"); // 'add' | 'edit'
  const [dpSheetEscopo, setDpSheetEscopo] = useState("empresa"); // 'nacional' | 'empresa'
  const [dpEditandoId, setDpEditandoId] = useState(null);
  const [dpForm, setDpForm] = useState(null);
  const [dpFormOriginal, setDpFormOriginal] = useState(null);

  // ===== PARÂMETROS > CONTÁBIL — por empresa, sem catálogo nacional (Contábil só
  // referencia origens do Fiscal/DP e faz a ponte até a conta contábil). Igual ao
  // Fiscal: sem vigência/rascunho/publicação, salva assim que confirma no drawer.
  const [empresaContabilSel, setEmpresaContabilSel] = useState(null);
  const [contabilTab, setContabilTab] = useState("acumuladorConta");
  const [contabilDadosPorEmpresa, setContabilDadosPorEmpresa] = useState(criarContabilDadosIniciais);
  const [contabilBuscaPorTipo, setContabilBuscaPorTipo] = useState({ acumuladorConta: "", rubricaConta: "", adequacaoPlano: "", personalizacao: "" });
  const [contabilSheetOpen, setContabilSheetOpen] = useState(false);
  const [contabilSheetTipo, setContabilSheetTipo] = useState(null); // 'acumuladorConta' | 'rubricaConta' | 'adequacaoPlano' | 'personalizacao'
  const [contabilSheetModo, setContabilSheetModo] = useState("add"); // 'add' | 'edit'
  const [contabilEditandoId, setContabilEditandoId] = useState(null);
  const [contabilForm, setContabilForm] = useState(null);
  const [contabilFormOriginal, setContabilFormOriginal] = useState(null);

  const empresasOptions = EMPRESAS.map((e) => ({ value: e.codigo, label: e.nome, sublabel: e.codigo }));
  const fiscalDadosEmpresaAtual = empresaFiscalSel ? fiscalDadosPorEmpresa[empresaFiscalSel] : null;
  const dpDadosEmpresaAtual = empresaDPSel ? dpDadosPorEmpresa[empresaDPSel] : null;
  const empresaDPNome = empresaDPSel ? EMPRESAS.find((e) => e.codigo === empresaDPSel)?.nome : null;
  // Preview reflete o RASCUNHO (não o salvo) — assim, ao trocar o sindicato no select,
  // o usuário já vê jornada/HE/piso/férias daquele sindicato antes de clicar Salvar.
  const sindicatoVinculadoAtual = sindicatoVinculoRascunho.sindicatoId
    ? sindicatosNacional.find((s) => s.id === sindicatoVinculoRascunho.sindicatoId)
    : null;

  // Rascunho local do vínculo inteiro (sindicato + variáveis específicas) — sincroniza
  // sempre que troca de empresa, pra permitir dirty-check (só habilita "Salvar" se algo
  // realmente mudou), mesmo padrão usado nos drawers de edição (ex.: editFeriado/editFeriadoOriginal).
  useEffect(() => {
    setSindicatoVinculoRascunho(dpDadosEmpresaAtual ? { ...dpDadosEmpresaAtual.sindicatoVinculo } : { sindicatoId: null, variaveisEspecificas: "" });
  }, [empresaDPSel]);
  const isSindicatoVinculoDirty = dpDadosEmpresaAtual && JSON.stringify(sindicatoVinculoRascunho) !== JSON.stringify(dpDadosEmpresaAtual.sindicatoVinculo);

  const atualizacoesData = atualizacoesPorVigencia[vigenciaDP];
  const alteredAtualizacoesIdsAtual = alteredAtualizacoesIds[vigenciaDP];
  const hasPendingChangesDP = alteredAtualizacoesIdsAtual.size > 0;
  const consultaDPDados = consultaDPVig ? snapshotAtualizacoesPorVigencia[consultaDPVig] : null;




  // Filtra uma lista de linhas de CFOP por texto livre (busca em todos os campos) e por escopo
  function filtrarLinhasCfop(linhas, busca, escopoFiltro) {
    return linhas.filter((r) => {
      if (escopoFiltro !== "Todas" && r.escopo !== escopoFiltro) return false;
      if (busca.trim() === "") return true;
      const alvo = `${r.categoria} ${r.cfopSaida} ${r.cfopEntrada} ${r.escopo} ${r.origem}`.toLowerCase();
      return alvo.includes(busca.trim().toLowerCase());
    });
  }
  // Contagem "X regras · Y automáticas · Z manuais" — sempre sobre o conjunto já filtrado
  function contarOrigemCfop(linhas) {
    return {
      total: linhas.length,
      automaticas: linhas.filter((r) => r.origem === "Automática").length,
      manuais: linhas.filter((r) => r.origem === "Manual").length,
    };
  }

  // Filtro de busca genérico por texto livre — reaproveitado em Fornecedor x Plano de
  // Contas, Acumulador x Conta e Simples Nacional (tabelas que não têm filtro de escopo
  // como o CFOP, só busca simples mesmo)
  function filtrarPorBusca(linhas, busca, camposBusca) {
    if (busca.trim() === "") return linhas;
    const alvo = busca.trim().toLowerCase();
    return linhas.filter((r) => camposBusca.some((c) => String(r[c] ?? "").toLowerCase().includes(alvo)));
  }
  // Campos pesquisáveis e placeholder contextual por tipo — usados no loop genérico de
  // Fornecedor/Acumulador e na tabela nacional de Simples Nacional
  const CAMPOS_BUSCA_FISCAL = {
    fornecedor: { campos: ["fornecedor", "cnpj", "cfop", "acumulador"], placeholder: "Fornecedor, CNPJ, CFOP, acumulador..." },
    acumulador: { campos: ["acumulador", "contaContabil", "tipo"], placeholder: "Acumulador, conta, tipo..." },
    simples: { campos: ["anexo", "atividade", "aliquotaInicial", "emUso"], placeholder: "Anexo, atividade..." },
  };

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

  // ===== FISCAL / REGRAS POR TRILHA — handlers (dado único, sem draft/publish) =====
  function fiscalFormVazio(tipo) {
    const base = {};
    FISCAL_TIPOS[tipo].campos.forEach((c) => {
      base[c.chave] = c.tipoCampo === "select" ? c.opcoes[0] : "";
    });
    return base;
  }
  // escopo: 'nacional' (Regras por trilha — CFOP ou Simples Nacional, vale pra todas as
  // empresas) ou 'empresa' (Parâmetros > Fiscal — hoje só a exceção de CFOP usa isso)
  function abrirAdicionarFiscal(tipoAtual, escopo = "empresa") {
    setFiscalSheetTipo(tipoAtual);
    setFiscalSheetModo("add");
    setFiscalSheetEscopo(escopo);
    setFiscalEditandoId(null);
    setFiscalForm(fiscalFormVazio(tipoAtual));
    setFiscalFormOriginal(null);
    setFiscalSheetOpen(true);
  }
  function abrirEditarFiscal(tipoAtual, registro, escopo = "empresa") {
    setFiscalSheetTipo(tipoAtual);
    setFiscalSheetModo("edit");
    setFiscalSheetEscopo(escopo);
    setFiscalEditandoId(registro.id);
    const inicial = {};
    FISCAL_TIPOS[tipoAtual].campos.forEach((c) => { inicial[c.chave] = registro[c.chave] ?? ""; });
    setFiscalForm(inicial);
    setFiscalFormOriginal(inicial);
    setFiscalSheetOpen(true);
  }
  const fiscalConfigAtual = fiscalSheetTipo ? FISCAL_TIPOS[fiscalSheetTipo] : null;
  const isFiscalDirty = fiscalSheetModo === "edit" && fiscalForm && fiscalFormOriginal && JSON.stringify(fiscalForm) !== JSON.stringify(fiscalFormOriginal);
  const fiscalCamposPreenchidos = fiscalConfigAtual && fiscalForm
    ? fiscalConfigAtual.obrigatorios.every((chave) => String(fiscalForm[chave] || "").trim().length > 0)
    : false;
  const fiscalSalvarDesabilitado = fiscalSheetModo === "add" ? !fiscalCamposPreenchidos : (!fiscalCamposPreenchidos || !isFiscalDirty);

  function handleSalvarFiscal() {
    if (fiscalSalvarDesabilitado) return;
    const tipoAtual = fiscalSheetTipo;
    const config = FISCAL_TIPOS[tipoAtual];

    // Escopo nacional — CFOP base nacional ou Simples Nacional (Regras por trilha > Fiscal),
    // grava numa lista global, vale pra todas as empresas, sem seleção de empresa envolvida.
    if (fiscalSheetEscopo === "nacional") {
      const setNacional = tipoAtual === "cfop" ? setCfopBaseNacional : setSimplesNacionalBase;
      const rotuloSecao = tipoAtual === "cfop" ? "Base nacional de CFOP" : "Tabela do Simples Nacional";
      if (fiscalSheetModo === "add") {
        const novo = { id: Date.now(), ...fiscalForm };
        setNacional((prev) => [...prev, novo]);
        setToast({ title: `${rotuloSecao} atualizada`, description: `${config.resumoLinha(novo)} foi incluído — vale para todas as empresas.` });
      } else {
        setNacional((prev) => prev.map((r) => r.id !== fiscalEditandoId ? r : { ...r, ...fiscalForm }));
        setToast({ title: `${rotuloSecao} atualizada`, description: `${config.resumoLinha(fiscalForm)} foi atualizado — vale para todas as empresas.` });
      }
      setFiscalSheetOpen(false);
      setFiscalForm(null);
      setFiscalFormOriginal(null);
      setFiscalEditandoId(null);
      return;
    }

    // Escopo empresa — hoje só a exceção de CFOP, além de Fornecedor x Plano de Contas e
    // Acumulador x Conta (Parâmetros > Fiscal)
    if (!empresaFiscalSel) return;
    const chaveDados = tipoAtual === "cfop" ? "cfopExcecoes" : tipoAtual;
    if (fiscalSheetModo === "add") {
      const novo = { id: Date.now(), ...fiscalForm };
      setFiscalDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaFiscalSel]: { ...prev[empresaFiscalSel], [chaveDados]: [...prev[empresaFiscalSel][chaveDados], novo] },
      }));
      const rotulo = tipoAtual === "cfop" ? "exceção de CFOP" : config.label;
      setToast({ title: `Novo registro adicionado em ${rotulo}`, description: `${config.resumoLinha(novo)} foi incluído com sucesso para ${empresaFiscalNome}.` });
    } else {
      setFiscalDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaFiscalSel]: {
          ...prev[empresaFiscalSel],
          [chaveDados]: prev[empresaFiscalSel][chaveDados].map((r) => r.id !== fiscalEditandoId ? r : { ...r, ...fiscalForm }),
        },
      }));
      const rotulo = tipoAtual === "cfop" ? "exceção de CFOP" : config.label;
      setToast({ title: `Alteração salva em ${rotulo}`, description: `${config.resumoLinha(fiscalForm)} foi atualizado com sucesso para ${empresaFiscalNome}.` });
    }
    setFiscalSheetOpen(false);
    setFiscalForm(null);
    setFiscalFormOriginal(null);
    setFiscalEditandoId(null);
  }

  // ===== DP / REGRAS POR TRILHA — handlers (mesmo padrão do Fiscal: catálogos
  // nacionais gravam direto num estado global; dados por empresa gravam em
  // dpDadosPorEmpresa; nenhum dos dois tem rascunho/publicação) =====
  function dpFormVazio(tipo) {
    const base = {};
    DP_TIPOS[tipo].campos.forEach((c) => {
      base[c.chave] = c.tipoCampo === "select" ? c.opcoes[0] : "";
    });
    return base;
  }
  // escopo: 'nacional' (Regras por trilha — sindicato, rubrica ou atualização, vale pra
  // todas as empresas) ou 'empresa' (Parâmetros > DP — hoje só sindicatoRubricaConta usa isso)
  function abrirAdicionarDP(tipoAtual, escopo = "empresa") {
    setDpSheetTipo(tipoAtual);
    setDpSheetModo("add");
    setDpSheetEscopo(escopo);
    setDpEditandoId(null);
    setDpForm(dpFormVazio(tipoAtual));
    setDpFormOriginal(null);
    setDpSheetOpen(true);
  }
  function abrirEditarDP(tipoAtual, registro, escopo = "empresa") {
    setDpSheetTipo(tipoAtual);
    setDpSheetModo("edit");
    setDpSheetEscopo(escopo);
    setDpEditandoId(registro.id);
    const inicial = {};
    DP_TIPOS[tipoAtual].campos.forEach((c) => { inicial[c.chave] = registro[c.chave] ?? ""; });
    setDpForm(inicial);
    setDpFormOriginal(inicial);
    setDpSheetOpen(true);
  }
  const dpConfigAtual = dpSheetTipo ? DP_TIPOS[dpSheetTipo] : null;
  const isDPDirty = dpSheetModo === "edit" && dpForm && dpFormOriginal && JSON.stringify(dpForm) !== JSON.stringify(dpFormOriginal);
  const dpCamposPreenchidos = dpConfigAtual && dpForm
    ? dpConfigAtual.obrigatorios.every((chave) => String(dpForm[chave] || "").trim().length > 0)
    : false;
  const dpSalvarDesabilitado = dpSheetModo === "add" ? !dpCamposPreenchidos : (!dpCamposPreenchidos || !isDPDirty);

  const DP_NACIONAL_SETTERS = { sindicato: setSindicatosNacional, rubrica: setRubricasNacional };
  const DP_NACIONAL_ROTULOS = { sindicato: "Cadastro de sindicato", rubrica: "Cadastro de rubrica" };

  function handleSalvarDP() {
    if (dpSalvarDesabilitado) return;
    const tipoAtual = dpSheetTipo;
    const config = DP_TIPOS[tipoAtual];

    // Atualização anual — versionada por vigência (rascunho + Publicar), não salva
    // direto como os outros catálogos nacionais. Só existe modo "edit" (sem adicionar).
    if (tipoAtual === "atualizacao") {
      setAtualizacoesPorVigencia((prev) => ({
        ...prev,
        [vigenciaDP]: prev[vigenciaDP].map((r) => r.id !== dpEditandoId ? r : { ...r, ...dpForm }),
      }));
      setAlteredAtualizacoesIds((prev) => ({ ...prev, [vigenciaDP]: new Set(prev[vigenciaDP]).add(dpEditandoId) }));
      setToast({ title: "Alteração salva no rascunho", description: `"${config.resumoLinha(dpForm)}" foi atualizado. Publique a vigência ${vigenciaDP} do DP para tornar isso oficial.` });
      setDpSheetOpen(false);
      setDpForm(null);
      setDpFormOriginal(null);
      setDpEditandoId(null);
      return;
    }

    // Escopo nacional — sindicato ou rubrica (Regras por trilha > DP), grava direto
    if (dpSheetEscopo === "nacional") {
      const setNacional = DP_NACIONAL_SETTERS[tipoAtual];
      const rotuloSecao = DP_NACIONAL_ROTULOS[tipoAtual];
      if (dpSheetModo === "add") {
        const novo = { id: Date.now(), ...dpForm };
        setNacional((prev) => [...prev, novo]);
        setToast({ title: `${rotuloSecao} atualizado`, description: `${config.resumoLinha(novo)} foi incluído — vale para todas as empresas.` });
      } else {
        setNacional((prev) => prev.map((r) => r.id !== dpEditandoId ? r : { ...r, ...dpForm }));
        setToast({ title: `${rotuloSecao} atualizado`, description: `${config.resumoLinha(dpForm)} foi atualizado — vale para todas as empresas.` });
      }
      setDpSheetOpen(false);
      setDpForm(null);
      setDpFormOriginal(null);
      setDpEditandoId(null);
      return;
    }

    // Escopo empresa — hoje só sindicatoRubricaConta (Parâmetros > DP)
    if (!empresaDPSel) return;
    if (dpSheetModo === "add") {
      const novo = { id: Date.now(), ...dpForm };
      setDpDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaDPSel]: { ...prev[empresaDPSel], sindicatoRubricaConta: [...prev[empresaDPSel].sindicatoRubricaConta, novo] },
      }));
      setToast({ title: `Novo registro adicionado em ${config.label}`, description: `${config.resumoLinha(novo)} foi incluído com sucesso para ${empresaDPNome}.` });
    } else {
      setDpDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaDPSel]: {
          ...prev[empresaDPSel],
          sindicatoRubricaConta: prev[empresaDPSel].sindicatoRubricaConta.map((r) => r.id !== dpEditandoId ? r : { ...r, ...dpForm }),
        },
      }));
      setToast({ title: `Alteração salva em ${config.label}`, description: `${config.resumoLinha(dpForm)} foi atualizado com sucesso para ${empresaDPNome}.` });
    }
    setDpSheetOpen(false);
    setDpForm(null);
    setDpFormOriginal(null);
    setDpEditandoId(null);
  }

  // Vínculo Sindicato x Empresa — unificado num único rascunho (sindicato + variáveis
  // específicas); nada salva sozinho, só o botão "Salvar vínculo" abaixo.
  function handleSalvarVinculoSindicato() {
    if (!empresaDPSel || !isSindicatoVinculoDirty) return;
    setDpDadosPorEmpresa((prev) => ({
      ...prev,
      [empresaDPSel]: { ...prev[empresaDPSel], sindicatoVinculo: { ...sindicatoVinculoRascunho } },
    }));
    const sindicatoNome = sindicatoVinculoRascunho.sindicatoId
      ? sindicatosNacional.find((s) => s.id === sindicatoVinculoRascunho.sindicatoId)?.sindicato
      : null;
    setToast({
      title: "Vínculo salvo",
      description: sindicatoNome ? `${empresaDPNome} passa a seguir ${sindicatoNome}.` : `Vínculo de ${empresaDPNome} atualizado.`,
    });
  }

  // Publicar vigência das Atualizações anuais — mesma lógica do handlePublicar de
  // Regras Gerais: promove o rascunho a snapshot oficial e limpa os alterados.
  function handlePublicarAtualizacoes() {
    setSnapshotAtualizacoesPorVigencia((prev) => ({ ...prev, [vigenciaDP]: atualizacoesPorVigencia[vigenciaDP] }));
    setAlteredAtualizacoesIds((prev) => ({ ...prev, [vigenciaDP]: new Set() }));
    setToast({ title: `Atualizações da vigência ${vigenciaDP} publicadas`, description: "Os novos valores agora são oficiais para o cálculo da folha do DP." });
  }
  function handleAbrirConsultaDP(vig) {
    setConsultaDPVig(vig);
    setConsultaDPOpen(true);
  }

  // ===== CONTÁBIL — handlers (dado único por empresa, sem escopo nacional; mesmo
  // padrão de salvar do Fiscal, só que sempre "por empresa") =====
  const empresaContabilNome = empresaContabilSel ? EMPRESAS.find((e) => e.codigo === empresaContabilSel)?.nome : null;
  const contabilDadosEmpresaAtual = empresaContabilSel ? contabilDadosPorEmpresa[empresaContabilSel] : null;

  function contabilFormVazio(tipo) {
    const base = {};
    CONTABIL_TIPOS[tipo].campos.forEach((c) => {
      base[c.chave] = c.tipoCampo === "select" ? c.opcoes[0] : "";
    });
    return base;
  }
  function abrirAdicionarContabil(tipoAtual) {
    setContabilSheetTipo(tipoAtual);
    setContabilSheetModo("add");
    setContabilEditandoId(null);
    setContabilForm(contabilFormVazio(tipoAtual));
    setContabilFormOriginal(null);
    setContabilSheetOpen(true);
  }
  function abrirEditarContabil(tipoAtual, registro) {
    setContabilSheetTipo(tipoAtual);
    setContabilSheetModo("edit");
    setContabilEditandoId(registro.id);
    const inicial = {};
    CONTABIL_TIPOS[tipoAtual].campos.forEach((c) => { inicial[c.chave] = registro[c.chave] ?? ""; });
    setContabilForm(inicial);
    setContabilFormOriginal(inicial);
    setContabilSheetOpen(true);
  }
  const contabilConfigAtual = contabilSheetTipo ? CONTABIL_TIPOS[contabilSheetTipo] : null;
  const isContabilDirty = contabilSheetModo === "edit" && contabilForm && contabilFormOriginal && JSON.stringify(contabilForm) !== JSON.stringify(contabilFormOriginal);
  const contabilCamposPreenchidos = contabilConfigAtual && contabilForm
    ? contabilConfigAtual.obrigatorios.every((chave) => String(contabilForm[chave] || "").trim().length > 0)
    : false;
  const contabilSalvarDesabilitado = contabilSheetModo === "add" ? !contabilCamposPreenchidos : (!contabilCamposPreenchidos || !isContabilDirty);

  function handleSalvarContabil() {
    if (contabilSalvarDesabilitado || !empresaContabilSel) return;
    const tipoAtual = contabilSheetTipo;
    const config = CONTABIL_TIPOS[tipoAtual];
    if (contabilSheetModo === "add") {
      // Personalização sempre vale só pra empresa selecionada — escopo fixo, não vem do form.
      const extra = tipoAtual === "personalizacao" ? { escopo: "só esta empresa" } : {};
      const novo = { id: Date.now(), ...contabilForm, ...extra };
      setContabilDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaContabilSel]: { ...prev[empresaContabilSel], [tipoAtual]: [...prev[empresaContabilSel][tipoAtual], novo] },
      }));
      setToast({ title: `Novo registro adicionado em ${config.label}`, description: `${config.resumoLinha(novo)} foi incluído com sucesso para ${empresaContabilNome}.` });
    } else {
      setContabilDadosPorEmpresa((prev) => ({
        ...prev,
        [empresaContabilSel]: {
          ...prev[empresaContabilSel],
          [tipoAtual]: prev[empresaContabilSel][tipoAtual].map((r) => r.id !== contabilEditandoId ? r : { ...r, ...contabilForm }),
        },
      }));
      setToast({ title: `Alteração salva em ${config.label}`, description: `${config.resumoLinha(contabilForm)} foi atualizado com sucesso para ${empresaContabilNome}.` });
    }
    setContabilSheetOpen(false);
    setContabilForm(null);
    setContabilFormOriginal(null);
    setContabilEditandoId(null);
  }
  function rotuloAcaoAmarracao(r) {
    return r.status === "revisar" ? "corrigir" : "editar";
  }
  function rotuloAcaoAdequacao(r) {
    return r.ativa === "não" ? "arquivar" : "editar";
  }

  function tentarNavegar(destino) {
    const saindoDeRegrasComPendencia = section === "regras" && hasPendingChanges && destino !== "regras";
    const saindoDeDPComPendencia = section === "regras-trilha-dp" && hasPendingChangesDP && destino !== "regras-trilha-dp";
    if (saindoDeRegrasComPendencia || saindoDeDPComPendencia) {
      setPendingDestination(destino);
      setExitDialogOpen(true);
    } else {
      setSection(destino);
    }
  }
  function handleSairEPerder() {
    if (section === "regras-trilha-dp") {
      setAtualizacoesPorVigencia((prev) => ({ ...prev, [vigenciaDP]: snapshotAtualizacoesPorVigencia[vigenciaDP] }));
      setAlteredAtualizacoesIds((prev) => ({ ...prev, [vigenciaDP]: new Set() }));
    } else {
      setDadosPorVigencia((prev) => ({ ...prev, [vigencia]: snapshotPorVigencia[vigencia] }));
      setAlteredIdsPorVigencia((prev) => ({ ...prev, [vigencia]: { feriados: new Set(), inss: new Set(), irrf: new Set() } }));
    }
    setExitDialogOpen(false);
    if (pendingDestination === "regras-lista") {
      setRegrasVigenciaAtiva(null);
    } else {
      setSection(pendingDestination);
    }
    setPendingDestination(null);
  }
  function handleContinuarEditando() {
    setExitDialogOpen(false);
    setPendingDestination(null);
  }
  // Abrir uma vigência a partir da lista — pedido do Fernando: primeiro escolhe a
  // vigência, só depois vê Feriados/INSS/IRRF daquele período (nada de seletor solto).
  function handleAbrirVigenciaRegras(vig) {
    setVigencia(vig);
    setRegrasVigenciaAtiva(vig);
    setTab("feriados");
  }
  function handleVoltarParaVigencias() {
    if (hasPendingChanges && !regrasSomenteLeitura) {
      setPendingDestination("regras-lista");
      setExitDialogOpen(true);
    } else {
      setRegrasVigenciaAtiva(null);
    }
  }
  // Vigência histórica abre somente leitura (sem editar/adicionar/publicar) — vigente
  // e não iniciada continuam editáveis normalmente.
  const vigenciaAtivaInfo = regrasVigenciaAtiva ? VIGENCIAS_HIST.find((v) => v.vig === regrasVigenciaAtiva) : null;
  const regrasSomenteLeitura = vigenciaAtivaInfo ? vigenciaAtivaInfo.status === "histórico" : false;

  const empresaFiscalNome = empresaFiscalSel ? EMPRESAS.find((e) => e.codigo === empresaFiscalSel)?.nome : null;
  const empresaFiscalOptanteSimples = empresaFiscalSel ? !!EMPRESAS.find((e) => e.codigo === empresaFiscalSel)?.optanteSimples : false;
  const simplesConfigEmpresaAtual = fiscalDadosEmpresaAtual ? fiscalDadosEmpresaAtual.simplesConfig : null;

  // Rascunho local — sincroniza sempre que troca de empresa, mesmo padrão das
  // variáveis específicas do DP: nada salva sozinho, só o botão "Salvar" abaixo.
  useEffect(() => {
    setSimplesConfigRascunho(simplesConfigEmpresaAtual ? { ...simplesConfigEmpresaAtual } : { usarApenasUmAnexo: false, anexoForcado: "Anexo I" });
  }, [empresaFiscalSel]);
  const isSimplesConfigDirty = simplesConfigEmpresaAtual && JSON.stringify(simplesConfigRascunho) !== JSON.stringify(simplesConfigEmpresaAtual);

  function handleSalvarSimplesConfig() {
    if (!empresaFiscalSel || !isSimplesConfigDirty) return;
    setFiscalDadosPorEmpresa((prev) => ({
      ...prev,
      [empresaFiscalSel]: { ...prev[empresaFiscalSel], simplesConfig: { ...simplesConfigRascunho } },
    }));
    setToast({
      title: "Exceção do Simples Nacional salva",
      description: simplesConfigRascunho.usarApenasUmAnexo
        ? `${empresaFiscalNome} passa a usar só o ${simplesConfigRascunho.anexoForcado}, ignorando o CFOP/NCM da nota.`
        : `${empresaFiscalNome} volta a classificar o anexo automaticamente por nota.`,
    });
  }
  const crumbs = {
    home: "empresas",
    regras: "regras gerais",
    "regras-trilha-fiscal": "regras por trilha / fiscal",
    "regras-trilha-dp": "regras por trilha / dp",
    fiscal: `parametros / fiscal${empresaFiscalNome ? ` / ${empresaFiscalNome}` : ""}`,
    dp: `parametros / dp${empresaDPNome ? ` / ${empresaDPNome}` : ""}`,
    contabil: `parametros / contabil${empresaContabilNome ? ` / ${empresaContabilNome}` : ""}`,
  };

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
              <SidebarMenuButton disabled>
                <Building2 className="size-4" /> Empresas
                <SidebarMenuBadge>escopo a definir</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        <div>
          <SidebarGroupLabel>Regras</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={section === "regras"} onClick={() => tentarNavegar("regras")}>
                <BookOpenCheck className="size-4" /> Regras Gerais
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setRegrasTrilhaOpen((o) => !o)}>
                <SlidersHorizontal className="size-4" /> Regras por Trilha
                <ChevronRight className="ml-auto size-4 transition-transform" style={{ transform: regrasTrilhaOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
              </SidebarMenuButton>
              {regrasTrilhaOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive={section === "regras-trilha-fiscal"} onClick={() => tentarNavegar("regras-trilha-fiscal")}>
                      <Receipt className="size-4" /> Fiscal
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive={section === "regras-trilha-dp"} onClick={() => tentarNavegar("regras-trilha-dp")}>
                      <Users className="size-4" /> DP
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
                    <SidebarMenuSubButton isActive={section === "fiscal"} onClick={() => tentarNavegar("fiscal")}>
                      <Receipt className="size-4" /> Fiscal
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive={section === "dp"} onClick={() => tentarNavegar("dp")}>
                      <Users className="size-4" /> DP
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive={section === "contabil"} onClick={() => tentarNavegar("contabil")}>
                      <Landmark className="size-4" /> Contábil
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
              <li>Mapa de regras formal (Jeniffer) — Fiscal ainda é esboço</li>
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
          {/* ============ REGRAS GERAIS ============ */}
          {section === "regras" && !regrasVigenciaAtiva && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Regras gerais</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Selecione uma vigência para ver ou editar Feriados, Tabela INSS e Tabela IRRF daquele período — regras que
                  valem para todas as empresas e todas as trilhas.
                   <p></p><br></br>
                  <strong>Nota:</strong> Só é possível editar uma vigência que esteja <strong>Ativa</strong>
                </p>
              </div>
              <Card className="gap-4">
                <CardHeader>
                  <CardDescription>Publicar uma nova vigência mantém as anteriores disponíveis para consulta.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><tr><TableHead>Vigência</TableHead><TableHead>Publicada em</TableHead><TableHead>Publicada por</TableHead><TableHead>Status</TableHead><TableHead></TableHead></tr></TableHeader>
                    <TableBody>
                      {VIGENCIAS_HIST.map((v) => (
                        <TableRow key={v.vig}>
                          <TableCell><b>{v.vig}</b></TableCell>
                          <TableCell>{v.data || "—"}</TableCell>
                          <TableCell>{v.por || "—"}</TableCell>
                          <TableCell><Badge variant={badgeVigenciaStatus[v.status]}>{v.status}</Badge></TableCell>
                          <TableCell><span onClick={() => handleAbrirVigenciaRegras(v.vig)} className="text-xs font-medium cursor-pointer" style={{ color: T.infoText }}>abrir</span></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          )}

          {section === "regras" && regrasVigenciaAtiva && (
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={handleVoltarParaVigencias} className="text-xs font-medium cursor-pointer w-fit" style={{ color: T.infoText }}>← Vigências</button>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">Vigência {vigencia}</h1>
                  <Badge variant={badgeVigenciaStatus[vigenciaAtivaInfo?.status]}>{vigenciaAtivaInfo?.status}</Badge>
                </div>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  {regrasSomenteLeitura
                    ? "Vigência histórica — consulta somente leitura, sem opção de editar ou publicar."
                    : "Regras gerais que valem para todas as empresas e todas as trilhas — mantidas em base única."}
                </p>
              </div>

              {!regrasSomenteLeitura && (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {hasPendingChanges && (
                      <Badge variant="warning" className="gap-1.5">
                        <span className="size-1.5 rounded-full" style={{ background: T.warningText }} />
                        Alterações não publicadas
                      </Badge>
                    )}
                  </div>
                  <Button variant={hasPendingChanges ? "default" : "outline"} disabled={isOperador || !hasPendingChanges} onClick={() => setPublishDialogOpen(true)}>Publicar vigência</Button>
                </div>
              )}

              <Tabs>
                <TabsList>
                  <TabsTrigger active={tab === "feriados"} onClick={() => setTab("feriados")}>Feriados</TabsTrigger>
                  <TabsTrigger active={tab === "inss"} onClick={() => setTab("inss")}>Tabela INSS</TabsTrigger>
                  <TabsTrigger active={tab === "irrf"} onClick={() => setTab("irrf")}>Tabela IRRF</TabsTrigger>
                </TabsList>
              </Tabs>

              {tab === "feriados" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Calendário em três âmbitos. Selecione UF e município para ver os feriados aplicáveis àquela localidade.</CardDescription>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      <span className="text-[11px]" style={{ color: T.mutedForeground }}>Impacta:</span>
                      <Badge variant={badgeTrilhaOrigem["Fiscal"]}>Fiscal</Badge>
                      <Badge variant={badgeTrilhaOrigem["DP"]}>DP</Badge>
                      <Badge variant={badgeTrilhaOrigem["Contábil"]}>Contábil</Badge>
                    </div>
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
                    {!regrasSomenteLeitura && (
                      <Button variant="outline" size="sm" disabled={isOperador} onClick={() => setSheetOpen(true)}>+ Adicionar feriado</Button>
                    )}
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
                                <Switch checked={f.considerar} onCheckedChange={(v) => handleToggleConsiderar(f.id, v)} disabled={isOperador || regrasSomenteLeitura} />
                                <span className="text-xs font-medium" style={{ color: f.considerar ? T.successText : T.mutedForeground }}>{f.considerar ? "Sim" : "Não"}</span>
                              </div>
                            </TableCell>
                            <TableCell>{!regrasSomenteLeitura && <span onClick={() => !isOperador && handleAbrirEdicaoFeriado(f)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span>}</TableCell>
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
                            <TableCell>{!regrasSomenteLeitura && <span onClick={() => !isOperador && handleAbrirEdicaoInss(r)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span>}</TableCell>
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
                            <TableCell>{!regrasSomenteLeitura && <span onClick={() => !isOperador && handleAbrirEdicaoIrrf(r)} className="text-xs font-medium cursor-pointer" style={{ color: isOperador ? T.mutedForeground : T.infoText, opacity: isOperador ? 0.5 : 1 }}>editar</span>}</TableCell>
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
            </section>
          )}

          {/* ============ REGRAS POR TRILHA ============ */}
          {section === "regras-trilha-fiscal" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Regras por trilha — Fiscal</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Regras nacionais específicas da trilha Fiscal — valem para todas as empresas, sem exceção. Diferem de Regras
                  Gerais porque não impactam DP nem Contábil, e diferem de Parâmetros porque não variam por empresa.
                </p>
              </div>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={regrasTrilhaFiscalTab === "cfop"} onClick={() => setRegrasTrilhaFiscalTab("cfop")}>CFOP</TabsTrigger>
                  <TabsTrigger active={regrasTrilhaFiscalTab === "simples"} onClick={() => setRegrasTrilhaFiscalTab("simples")}>Simples Nacional</TabsTrigger>
                </TabsList>
              </Tabs>

              {regrasTrilhaFiscalTab === "cfop" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Regras de-para CFOP saída/entrada — base nacional, compartilhada entre todas as empresas. Regras automáticas escrituram NFs sem intervenção manual. Exceções por empresa ficam em Parâmetros &gt; Fiscal.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex gap-3 flex-wrap items-end">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                        <Input placeholder="CFOP, escopo..." value={cfopBuscaNacional} onChange={(e) => setCfopBuscaNacional(e.target.value)} className="w-48" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Categoria (escopo)</label>
                        <SelectField value={cfopEscopoFiltroNacional} onChange={(e) => setCfopEscopoFiltroNacional(e.target.value)} className="w-40">
                          <option value="Todas">Todas categorias</option>
                          <option value="Interna">Interna</option>
                          <option value="Interestadual">Interestadual</option>
                          <option value="Internacional">Internacional</option>
                        </SelectField>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarFiscal("cfop", "nacional")}>+ Adicionar regra</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const filtradas = filtrarLinhasCfop(cfopBaseNacional, cfopBuscaNacional, cfopEscopoFiltroNacional);
                      const c = contarOrigemCfop(filtradas);
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: T.mutedForeground }}>
                            <span>⇄ <b style={{ color: T.foreground }}>{c.total}</b> regras</span>
                            <span>⚡ {c.automaticas} automáticas</span>
                            <span>◷ {c.manuais} manuais</span>
                          </div>
                          <FiscalTable config={FISCAL_TIPOS.cfop} linhas={filtradas} isOperador={isOperador} onEditar={(r) => abrirEditarFiscal("cfop", r, "nacional")} mensagemVazia="Nenhuma regra encontrada para os filtros selecionados." />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {regrasTrilhaFiscalTab === "simples" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Relação de anexos do Simples Nacional (I a V) — base nacional, compartilhada entre todas as empresas optantes.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_FISCAL.simples.placeholder} value={simplesBuscaNacional} onChange={(e) => setSimplesBuscaNacional(e.target.value)} className="w-56" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarFiscal("simples", "nacional")}>+ Adicionar anexo</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhas = filtrarPorBusca(simplesNacionalBase, simplesBuscaNacional, CAMPOS_BUSCA_FISCAL.simples.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {simplesNacionalBase.length} anexo{simplesNacionalBase.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={FISCAL_TIPOS.simples} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarFiscal("simples", r, "nacional")} mensagemVazia="Nenhum anexo encontrado para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </section>
          )}

          {/* ============ REGRAS POR TRILHA — DP ============ */}
          {section === "regras-trilha-dp" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Regras por trilha — DP</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Catálogos nacionais específicos da trilha DP — sindicato, rubrica e atualizações anuais. Vínculos por
                  empresa (Sindicato x Empresa e Sindicato x Rubrica x Conta) ficam em Parâmetros &gt; DP.
                </p>
              </div>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={regrasTrilhaDPTab === "sindicato"} onClick={() => setRegrasTrilhaDPTab("sindicato")}>Cadastro de sindicato</TabsTrigger>
                  <TabsTrigger active={regrasTrilhaDPTab === "rubrica"} onClick={() => setRegrasTrilhaDPTab("rubrica")}>Cadastro de rubrica</TabsTrigger>
                  <TabsTrigger active={regrasTrilhaDPTab === "atualizacoes"} onClick={() => setRegrasTrilhaDPTab("atualizacoes")}>Atualizações anuais</TabsTrigger>
                  <TabsTrigger active={regrasTrilhaDPTab === "vigencias"} onClick={() => setRegrasTrilhaDPTab("vigencias")}>Vigências</TabsTrigger>
                </TabsList>
              </Tabs>

              {regrasTrilhaDPTab === "sindicato" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>O sindicato determina jornada, férias e variáveis padrão — cada empresa vinculada pode ter exceções em Parâmetros &gt; DP.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_DP.sindicato.placeholder} value={sindicatoBuscaNacional} onChange={(e) => setSindicatoBuscaNacional(e.target.value)} className="w-56" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarDP("sindicato", "nacional")}>+ Adicionar sindicato</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhas = filtrarPorBusca(sindicatosNacional, sindicatoBuscaNacional, CAMPOS_BUSCA_DP.sindicato.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {sindicatosNacional.length} sindicato{sindicatosNacional.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={DP_TIPOS.sindicato} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarDP("sindicato", r, "nacional")} mensagemVazia="Nenhum sindicato encontrado para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {regrasTrilhaDPTab === "rubrica" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Catálogo de rubricas "Geral" — cadastro em dois modelos: referência (valor, horas, quantidade ou %) e fórmula (percentual sobre uma base). Rubricas específicas de sindicato/empresa nascem direto na amarração, em Parâmetros &gt; DP.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_DP.rubrica.placeholder} value={rubricaBuscaNacional} onChange={(e) => setRubricaBuscaNacional(e.target.value)} className="w-56" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarDP("rubrica", "nacional")}>+ Cadastrar rubrica</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhas = filtrarPorBusca(rubricasNacional, rubricaBuscaNacional, CAMPOS_BUSCA_DP.rubrica.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {rubricasNacional.length} rubrica{rubricasNacional.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={DP_TIPOS.rubrica} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarDP("rubrica", r, "nacional")} mensagemVazia="Nenhuma rubrica encontrada para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {regrasTrilhaDPTab === "atualizacoes" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Atualizações que rodam uma vez por ano — pró-labore, dissídio salarial, RAT e FAP. Cada uma versionada por competência.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: T.mutedForeground }}>Vigência</span>
                      <SelectField value={vigenciaDP} onChange={(e) => setVigenciaDP(e.target.value)} className="w-28">
                        <option>2027</option><option>2026</option><option>2025</option><option>2024</option>
                      </SelectField>
                      {hasPendingChangesDP && (
                        <Badge variant="warning" className="gap-1.5">
                          <span className="size-1.5 rounded-full" style={{ background: T.warningText }} />
                          Alterações não publicadas
                        </Badge>
                      )}
                    </div>
                    <Button variant={hasPendingChangesDP ? "default" : "outline"} disabled={isOperador || !hasPendingChangesDP} onClick={() => setPublicarAtualizacoesDialogOpen(true)}>Publicar vigência</Button>
                  </CardContent>
                  <CardContent>
                    <FiscalTable config={DP_TIPOS.atualizacao} linhas={atualizacoesData} isOperador={isOperador} onEditar={(r) => abrirEditarDP("atualizacao", r, "nacional")} />
                  </CardContent>
                  <CardFooter>
                    <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>RAT x FAP.</b> A alíquota efetiva do SAT é RAT x FAP — as duas atualizações entram juntas no cálculo da folha do período.</span>
                  </CardFooter>
                </Card>
              )}

              {regrasTrilhaDPTab === "vigencias" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Histórico de publicações das atualizações anuais do DP. Publicar uma nova vigência mantém as anteriores disponíveis para consulta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><tr><TableHead>Vigência</TableHead><TableHead>Publicada em</TableHead><TableHead>Publicada por</TableHead><TableHead>Status</TableHead><TableHead></TableHead></tr></TableHeader>
                      <TableBody>
                        {DP_VIGENCIAS_HIST.map((v) => (
                          <TableRow key={v.vig}>
                            <TableCell><b>{v.vig}</b></TableCell>
                            <TableCell>{v.data}</TableCell>
                            <TableCell>{v.por}</TableCell>
                            <TableCell><Badge variant={v.status === "vigente" ? "success" : "outline"}>{v.status}</Badge></TableCell>
                            <TableCell><span onClick={() => handleAbrirConsultaDP(v.vig)} className="text-xs font-medium cursor-pointer" style={{ color: T.infoText }}>consultar</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </section>
          )}
          {section === "fiscal" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Parâmetros Fiscais</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Parâmetros da trilha Fiscal definidos por empresa. Selecione uma empresa para ver e editar o que é específico
                  dela — CFOP nacional e Simples Nacional agora vivem em Regras por Trilha, aqui só as exceções e vínculos
                  próprios de cada empresa. Diferente de Regras Gerais, aqui não há conceito de vigência: as tabelas são
                  únicas por empresa e as alterações valem assim que salvas.
                </p>
              </div>

              <div className="flex items-end gap-3 flex-wrap p-3 rounded-lg" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Empresa</label>
                  <Combobox
                    value={empresaFiscalSel}
                    onChange={setEmpresaFiscalSel}
                    options={empresasOptions}
                    placeholder="Selecione uma empresa"
                    searchPlaceholder="Buscar empresa..."
                    emptyText="Nenhuma empresa encontrada."
                  />
                </div>
              </div>

              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertDescription>
                  <b>Esboço de estrutura.</b> Ainda não existe o mapa de regras formal da Jeniffer para Fiscal — os campos
                  abaixo são um ponto de partida e serão ajustados após validação com Elizandra e Jeisy.
                </AlertDescription>
              </Alert>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={fiscalTab === "cfop"} onClick={() => setFiscalTab("cfop")}>CFOP (exceções)</TabsTrigger>
                  <TabsTrigger active={fiscalTab === "fornecedor"} onClick={() => setFiscalTab("fornecedor")}>Fornecedor x Plano de Contas</TabsTrigger>
                  <TabsTrigger active={fiscalTab === "acumulador"} onClick={() => setFiscalTab("acumulador")}>Acumulador x Conta</TabsTrigger>
                  <TabsTrigger active={fiscalTab === "simples"} onClick={() => setFiscalTab("simples")}>Simples Nacional</TabsTrigger>
                </TabsList>
              </Tabs>

              {fiscalTab === "cfop" && (
                empresaFiscalSel ? (
                  <Card className="gap-4">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline">Exceção — {empresaFiscalNome}</Badge>
                      </div>
                      <CardDescription>Exceções de <b style={{ color: T.foreground }}>{empresaFiscalNome}</b> — sobrescrevem a base nacional de CFOP (em Regras por Trilha &gt; Fiscal) só para esta empresa.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                      <div className="flex gap-3 flex-wrap items-end">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                          <Input placeholder="CFOP, escopo..." value={cfopBuscaExcecao} onChange={(e) => setCfopBuscaExcecao(e.target.value)} className="w-48" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Categoria (escopo)</label>
                          <SelectField value={cfopEscopoFiltroExcecao} onChange={(e) => setCfopEscopoFiltroExcecao(e.target.value)} className="w-40">
                            <option value="Todas">Todas categorias</option>
                            <option value="Interna">Interna</option>
                            <option value="Interestadual">Interestadual</option>
                            <option value="Internacional">Internacional</option>
                          </SelectField>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarFiscal("cfop", "empresa")}>+ Adicionar exceção</Button>
                    </CardContent>
                    <CardContent>
                      {(() => {
                        const filtradas = filtrarLinhasCfop(fiscalDadosEmpresaAtual.cfopExcecoes, cfopBuscaExcecao, cfopEscopoFiltroExcecao);
                        const c = contarOrigemCfop(filtradas);
                        return (
                          <>
                            <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: T.mutedForeground }}>
                              <span>⇄ <b style={{ color: T.foreground }}>{c.total}</b> exceções</span>
                              <span>⚡ {c.automaticas} automáticas</span>
                              <span>◷ {c.manuais} manuais</span>
                            </div>
                            <FiscalTable config={FISCAL_TIPOS.cfop} linhas={filtradas} isOperador={isOperador} onEditar={(r) => abrirEditarFiscal("cfop", r, "empresa")} mensagemVazia="Nenhuma exceção cadastrada para esta empresa — usa só a base nacional." />
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="py-8 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                    <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                    <div className="text-sm font-medium">Selecione uma empresa</div>
                    <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                      Para ver ou cadastrar exceções específicas de uma empresa, escolha-a no seletor acima.
                    </div>
                  </Card>
                )
              )}

              {["fornecedor", "acumulador"].map((tipoAtual) => {
                if (fiscalTab !== tipoAtual) return null;
                const config = FISCAL_TIPOS[tipoAtual];
                if (!empresaFiscalSel) {
                  return (
                    <Card key={tipoAtual} className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                      <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                      <div className="text-sm font-medium">Selecione uma empresa</div>
                      <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                        {config.label} é definido por empresa. Escolha uma empresa no seletor acima para visualizar.
                      </div>
                    </Card>
                  );
                }
                const [busca, setBusca] = tipoAtual === "fornecedor" ? [fornecedorBusca, setFornecedorBusca] : [acumuladorBusca, setAcumuladorBusca];
                const { campos: camposBusca, placeholder: placeholderBusca } = CAMPOS_BUSCA_FISCAL[tipoAtual];
                const linhasTodas = fiscalDadosEmpresaAtual[tipoAtual];
                const linhas = filtrarPorBusca(linhasTodas, busca, camposBusca);
                const descricaoTipo = tipoAtual === "fornecedor"
                  ? `Inserir fornecedor e atrelar a CFOP/acumulador — define como as notas de ${empresaFiscalNome} daquele fornecedor são escrituradas.`
                  : `Um acumulador é o código do CFOP + um identificador que determina aquele CFOP para uma finalidade específica e a conta contábil de destino — um conjunto de regras de ${empresaFiscalNome}, padrão ou personalizado.`;
                const rotuloBotao = tipoAtual === "fornecedor" ? "+ Inserir fornecedor" : "+ Adicionar";
                return (
                  <Card className="gap-4" key={tipoAtual}>
                    <CardHeader>
                      <CardDescription>{descricaoTipo}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                        <Input placeholder={placeholderBusca} value={busca} onChange={(e) => setBusca(e.target.value)} className="w-56" />
                      </div>
                      <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarFiscal(tipoAtual)}>{rotuloBotao}</Button>
                    </CardContent>
                    <CardContent className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} registro{linhasTodas.length === 1 ? "" : "s"}</span>
                    </CardContent>
                    <CardContent>
                      <FiscalTable config={config} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarFiscal(tipoAtual, r)} mensagemVazia="Nenhum registro encontrado para a busca." />
                    </CardContent>
                    {tipoAtual === "acumulador" && (
                      <CardFooter>
                        <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                        <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Meta de enxugamento.</b> Hoje há tipicamente 7–8 acumuladores por conta contábil — a meta é manter só o que a empresa realmente usa.</span>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}

              {fiscalTab === "simples" && (
                !empresaFiscalSel ? (
                  <Card className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                    <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                    <div className="text-sm font-medium">Selecione uma empresa</div>
                    <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                      Simples Nacional é uma exceção por empresa. Escolha uma empresa no seletor acima para visualizar.
                    </div>
                  </Card>
                ) : !empresaFiscalOptanteSimples ? (
                  <Card className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                    <Receipt className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                    <div className="text-sm font-medium">Não habilitado para esta empresa</div>
                    <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                      {empresaFiscalNome} não é optante do Simples Nacional, então esta exceção não se aplica a ela.
                    </div>
                  </Card>
                ) : (
                  <Card className="gap-4">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline">Exceção — {empresaFiscalNome}</Badge>
                      </div>
                      <CardDescription>
                        Empresa optante — <b style={{ color: T.foreground }}>{empresaFiscalNome}</b> · Simples Nacional. A relação de
                        anexos (I a V) é a base nacional, em Regras por Trilha &gt; Fiscal; aqui fica só a exceção específica desta empresa.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">Usar somente um anexo (ignora classificação por nota)</span>
                        <span className="text-xs" style={{ color: T.mutedForeground }}>Quando ativo, todas as operações passam a usar o anexo selecionado, independentemente do CFOP/NCM da nota.</span>
                      </div>
                      <Switch checked={simplesConfigRascunho.usarApenasUmAnexo} onCheckedChange={(v) => setSimplesConfigRascunho((c) => ({ ...c, usarApenasUmAnexo: v }))} disabled={isOperador} />
                    </CardContent>
                    {simplesConfigRascunho.usarApenasUmAnexo && (
                      <CardContent className="flex flex-col gap-1.5 max-w-xs">
                        <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Anexo aplicado quando ativo</label>
                        <SelectField value={simplesConfigRascunho.anexoForcado} onChange={(e) => setSimplesConfigRascunho((c) => ({ ...c, anexoForcado: e.target.value }))} disabled={isOperador}>
                          {FISCAL_TIPOS.simples.campos[0].opcoes.map((a) => <option key={a}>{a}</option>)}
                        </SelectField>
                      </CardContent>
                    )}
                    <CardContent>
                      <Button size="sm" disabled={isOperador || !isSimplesConfigDirty} onClick={handleSalvarSimplesConfig}>Salvar</Button>
                    </CardContent>
                    <CardFooter>
                      <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                      <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Anexo único.</b> Ao ativar a opção acima, todas as operações passam a usar o anexo selecionado, independentemente do CFOP/NCM da nota.</span>
                    </CardFooter>
                  </Card>
                )
              )}
            </section>

          )}

          {/* ============ DP (PARÂMETROS, POR EMPRESA) ============ */}
          {section === "dp" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Parâmetros de folha</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Parâmetros da trilha DP definidos por empresa — qual sindicato ela segue, quais variáveis específicas
                  sobrescrevem o padrão da CCT, e a amarração de rubricas a contas contábeis. Cadastro de sindicato, de
                  rubrica e as atualizações anuais (nacionais) ficam em Regras por Trilha &gt; DP.
                </p>
              </div>

              <div className="flex items-end justify-between gap-3 flex-wrap p-3 rounded-lg" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Empresa</label>
                  <Combobox
                    value={empresaDPSel}
                    onChange={setEmpresaDPSel}
                    options={empresasOptions}
                    placeholder="Selecione uma empresa"
                    searchPlaceholder="Buscar empresa..."
                    emptyText="Nenhuma empresa encontrada."
                  />
                </div>
              </div>

              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertDescription>
                  <b>Esboço de estrutura.</b> Ainda não existe o mapa de regras formal para DP — os campos abaixo são um
                  ponto de partida e serão ajustados após validação com Jaqueline e Wender.
                </AlertDescription>
              </Alert>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={dpTab === "sindicatoEmpresa"} onClick={() => setDpTab("sindicatoEmpresa")}>Sindicato x Empresa</TabsTrigger>
                  <TabsTrigger active={dpTab === "sindicatoRubricaConta"} onClick={() => setDpTab("sindicatoRubricaConta")}>Sindicato x Rubrica x Conta</TabsTrigger>
                </TabsList>
              </Tabs>

              {dpTab === "sindicatoEmpresa" && (
                !empresaDPSel ? (
                  <Card className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                    <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                    <div className="text-sm font-medium">Selecione uma empresa</div>
                    <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                      O vínculo com sindicato é definido por empresa. Escolha uma empresa no seletor acima para visualizar.
                    </div>
                  </Card>
                ) : (
                  <Card className="gap-4">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline">{empresaDPNome}</Badge>
                      </div>
                      <CardDescription>O sindicato determina jornada, férias e variáveis — esta empresa pode ter exceções abaixo.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1.5 max-w-sm">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Sindicato / CCT</label>
                      <SelectField
                        value={sindicatoVinculoRascunho.sindicatoId ?? ""}
                        onChange={(e) => setSindicatoVinculoRascunho((v) => ({ ...v, sindicatoId: Number(e.target.value) }))}
                        disabled={isOperador}
                      >
                        <option value="" disabled>Selecione um sindicato</option>
                        {sindicatosNacional.map((s) => <option key={s.id} value={s.id}>{s.sindicato}</option>)}
                      </SelectField>
                    </CardContent>
                    {sindicatoVinculadoAtual ? (
                      <CardContent className="flex gap-6 flex-wrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Vigência CCT</span>
                          <span className="text-xs">{sindicatoVinculadoAtual.vigenciaCCT}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Jornada semanal</span>
                          <span className="text-xs">{sindicatoVinculadoAtual.jornadaSemanal}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Adicional HE</span>
                          <span className="text-xs">{sindicatoVinculadoAtual.adicionalHE}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Piso salarial</span>
                          <span className="text-xs">{sindicatoVinculadoAtual.pisoSalarial}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: T.mutedForeground }}>Regra de férias</span>
                          <span className="text-xs">{sindicatoVinculadoAtual.regraFerias}</span>
                        </div>
                      </CardContent>
                    ) : (
                      <CardContent>
                        <span className="text-xs" style={{ color: T.mutedForeground }}>Nenhum sindicato vinculado ainda — selecione um acima para ver jornada, HE, piso e férias padrão.</span>
                      </CardContent>
                    )}
                    <CardContent className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>Variáveis específicas</label>
                      <textarea
                        value={sindicatoVinculoRascunho.variaveisEspecificas}
                        onChange={(e) => setSindicatoVinculoRascunho((v) => ({ ...v, variaveisEspecificas: e.target.value }))}
                        disabled={isOperador}
                        placeholder="Ex.: adicional noturno diferenciado para o turno da madrugada"
                        className="w-full min-h-20 rounded-lg border px-3 py-2 text-sm outline-none"
                        style={{ background: "transparent", borderColor: T.input, color: T.foreground, boxShadow: T.shadowXs }}
                      />
                      <div>
                        <Button size="sm" disabled={isOperador || !isSindicatoVinculoDirty} onClick={handleSalvarVinculoSindicato}>Salvar vínculo</Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                      <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Exceção da exceção.</b> Variáveis aqui sobrescrevem o padrão da folha só para esta empresa.</span>
                    </CardFooter>
                  </Card>
                )
              )}

              {dpTab === "sindicatoRubricaConta" && (
                !empresaDPSel ? (
                  <Card className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                    <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                    <div className="text-sm font-medium">Selecione uma empresa</div>
                    <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                      A amarração de rubricas é definida por empresa. Escolha uma empresa no seletor acima para visualizar.
                    </div>
                  </Card>
                ) : (
                  <Card className="gap-4">
                    <CardHeader>
                      <CardDescription>Amarração de três vias: o sindicato determina a rubrica, e a rubrica é lançada numa conta contábil de <b style={{ color: T.foreground }}>{empresaDPNome}</b> — evita lançamentos em conta genérica.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                        <Input placeholder={CAMPOS_BUSCA_DP.sindicatoRubricaConta.placeholder} value={sindicatoRubricaContaBusca} onChange={(e) => setSindicatoRubricaContaBusca(e.target.value)} className="w-64" />
                      </div>
                      <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarDP("sindicatoRubricaConta", "empresa")}>+ Vincular sindicato x rubrica x conta</Button>
                    </CardContent>
                    <CardContent>
                      {(() => {
                        const linhasTodas = dpDadosEmpresaAtual.sindicatoRubricaConta;
                        const linhas = filtrarPorBusca(linhasTodas, sindicatoRubricaContaBusca, CAMPOS_BUSCA_DP.sindicatoRubricaConta.campos);
                        return (
                          <>
                            <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} registro{linhasTodas.length === 1 ? "" : "s"}</div>
                            <FiscalTable config={DP_TIPOS.sindicatoRubricaConta} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarDP("sindicatoRubricaConta", r, "empresa")} mensagemVazia="Nenhuma amarração cadastrada — rubricas sem conta caem em conta genérica." />
                          </>
                        );
                      })()}
                    </CardContent>
                    <CardFooter>
                      <AlertTriangle className="size-3.5 shrink-0" style={{ color: T.warningText }} />
                      <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Amarração DP.</b> Rubricas sem conta ou em conta genérica precisam de destino específico.</span>
                    </CardFooter>
                  </Card>
                )
              )}
            </section>
          )}

          {/* ============ CONTÁBIL (PARÂMETROS, POR EMPRESA) ============ */}
          {section === "contabil" && (
            <section className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Amarrações contábeis</h1>
                <p className="text-sm max-w-xl" style={{ color: T.mutedForeground }}>
                  Liga as origens do Fiscal (acumuladores) e do DP (rubricas) à conta contábil de destino, e ajusta o plano
                  de contas do cliente. Sem catálogo próprio aqui — o Contábil só referencia o que já existe nas outras
                  trilhas. Sem vigência: as alterações valem assim que salvas.
                </p>
              </div>

              <div className="flex items-end gap-3 flex-wrap p-3 rounded-lg" style={{ background: T.card, border: `1px solid ${T.border}` }}>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Empresa</label>
                  <Combobox
                    value={empresaContabilSel}
                    onChange={setEmpresaContabilSel}
                    options={empresasOptions}
                    placeholder="Selecione uma empresa"
                    searchPlaceholder="Buscar empresa..."
                    emptyText="Nenhuma empresa encontrada."
                  />
                </div>
              </div>

              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertDescription>
                  <b>Esboço de estrutura.</b> Fiel ao protótipo da Jeniffer, mas ainda sem o mapa de regras formal do
                  Contábil — os campos abaixo serão ajustados após validação com Thaís e Andressa.
                </AlertDescription>
              </Alert>

              <Tabs>
                <TabsList>
                  <TabsTrigger active={contabilTab === "acumuladorConta"} onClick={() => setContabilTab("acumuladorConta")}>Acumulador x Conta</TabsTrigger>
                  <TabsTrigger active={contabilTab === "rubricaConta"} onClick={() => setContabilTab("rubricaConta")}>Rubrica x Conta</TabsTrigger>
                  <TabsTrigger active={contabilTab === "adequacaoPlano"} onClick={() => setContabilTab("adequacaoPlano")}>Adequação</TabsTrigger>
                  <TabsTrigger active={contabilTab === "personalizacao"} onClick={() => setContabilTab("personalizacao")}>Personalização</TabsTrigger>
                </TabsList>
              </Tabs>

              {!empresaContabilSel && (
                <Card className="py-10 items-center text-center gap-1.5" style={{ boxShadow: "none" }}>
                  <Building2 className="size-5 mx-auto mb-1" style={{ color: T.mutedForeground }} />
                  <div className="text-sm font-medium">Selecione uma empresa</div>
                  <div className="text-xs max-w-sm mx-auto" style={{ color: T.mutedForeground }}>
                    {CONTABIL_TIPOS[contabilTab].label} é definido por empresa. Escolha uma empresa no seletor acima para visualizar.
                  </div>
                </Card>
              )}

              {empresaContabilSel && contabilTab === "acumuladorConta" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Liga o acumulador fiscal/DP à conta contábil de <b style={{ color: T.foreground }}>{empresaContabilNome}</b> — onde o lançamento cai. Resolve o problema de cair em conta genérica.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_CONTABIL.acumuladorConta.placeholder} value={contabilBuscaPorTipo.acumuladorConta} onChange={(e) => setContabilBuscaPorTipo((b) => ({ ...b, acumuladorConta: e.target.value }))} className="w-64" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarContabil("acumuladorConta")}>+ Adicionar</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhasTodas = contabilDadosEmpresaAtual.acumuladorConta;
                      const linhas = filtrarPorBusca(linhasTodas, contabilBuscaPorTipo.acumuladorConta, CAMPOS_BUSCA_CONTABIL.acumuladorConta.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} registro{linhasTodas.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={CONTABIL_TIPOS.acumuladorConta} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarContabil("acumuladorConta", r)} rotuloAcao={rotuloAcaoAmarracao} mensagemVazia="Nenhuma amarração encontrada para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                  <CardFooter>
                    <AlertTriangle className="size-3.5 shrink-0" style={{ color: T.warningText }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Amarração pendente.</b> Itens caindo em conta genérica precisam de conta específica.</span>
                  </CardFooter>
                </Card>
              )}

              {empresaContabilSel && contabilTab === "rubricaConta" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Liga cada rubrica de folha (DP) à conta contábil de destino de <b style={{ color: T.foreground }}>{empresaContabilNome}</b> — mesma lógica do acumulador fiscal.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_CONTABIL.rubricaConta.placeholder} value={contabilBuscaPorTipo.rubricaConta} onChange={(e) => setContabilBuscaPorTipo((b) => ({ ...b, rubricaConta: e.target.value }))} className="w-64" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarContabil("rubricaConta")}>+ Adicionar</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhasTodas = contabilDadosEmpresaAtual.rubricaConta;
                      const linhas = filtrarPorBusca(linhasTodas, contabilBuscaPorTipo.rubricaConta, CAMPOS_BUSCA_CONTABIL.rubricaConta.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} registro{linhasTodas.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={CONTABIL_TIPOS.rubricaConta} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarContabil("rubricaConta", r)} rotuloAcao={rotuloAcaoAmarracao} mensagemVazia="Nenhuma amarração encontrada para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                  <CardFooter>
                    <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Origem cruzada.</b> Acumuladores (Fiscal) e rubricas (DP) convergem aqui no plano de contas contábil.</span>
                  </CardFooter>
                </Card>
              )}

              {empresaContabilSel && contabilTab === "adequacaoPlano" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Adequação do plano de contas de <b style={{ color: T.foreground }}>{empresaContabilNome}</b> — ajustar estrutura, naturezas e contas ativas.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_CONTABIL.adequacaoPlano.placeholder} value={contabilBuscaPorTipo.adequacaoPlano} onChange={(e) => setContabilBuscaPorTipo((b) => ({ ...b, adequacaoPlano: e.target.value }))} className="w-64" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarContabil("adequacaoPlano")}>+ Nova conta</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhasTodas = contabilDadosEmpresaAtual.adequacaoPlano;
                      const linhas = filtrarPorBusca(linhasTodas, contabilBuscaPorTipo.adequacaoPlano, CAMPOS_BUSCA_CONTABIL.adequacaoPlano.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} conta{linhasTodas.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={CONTABIL_TIPOS.adequacaoPlano} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarContabil("adequacaoPlano", r)} rotuloAcao={rotuloAcaoAdequacao} mensagemVazia="Nenhuma conta encontrada para a busca." />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {empresaContabilSel && contabilTab === "personalizacao" && (
                <Card className="gap-4">
                  <CardHeader>
                    <CardDescription>Regra de exceção que sobrescreve o destino padrão de um acumulador ou rubrica para uma conta específica de <b style={{ color: T.foreground }}>{empresaContabilNome}</b>.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3 flex-wrap items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium" style={{ color: T.mutedForeground }}>Buscar</label>
                      <Input placeholder={CAMPOS_BUSCA_CONTABIL.personalizacao.placeholder} value={contabilBuscaPorTipo.personalizacao} onChange={(e) => setContabilBuscaPorTipo((b) => ({ ...b, personalizacao: e.target.value }))} className="w-64" />
                    </div>
                    <Button variant="outline" size="sm" disabled={isOperador} onClick={() => abrirAdicionarContabil("personalizacao")}>+ Adicionar</Button>
                  </CardContent>
                  <CardContent>
                    {(() => {
                      const linhasTodas = contabilDadosEmpresaAtual.personalizacao;
                      const linhas = filtrarPorBusca(linhasTodas, contabilBuscaPorTipo.personalizacao, CAMPOS_BUSCA_CONTABIL.personalizacao.campos);
                      return (
                        <>
                          <div className="text-xs mb-3" style={{ color: T.mutedForeground }}>{linhas.length} de {linhasTodas.length} registro{linhasTodas.length === 1 ? "" : "s"}</div>
                          <FiscalTable config={CONTABIL_TIPOS.personalizacao} linhas={linhas} isOperador={isOperador} onEditar={(r) => abrirEditarContabil("personalizacao", r)} mensagemVazia="Nenhuma personalização cadastrada — usa só o destino padrão." />
                        </>
                      );
                    })()}
                  </CardContent>
                  <CardFooter>
                    <Info className="size-3.5 shrink-0" style={{ color: T.mutedForeground }} />
                    <span className="text-xs" style={{ color: T.mutedForeground }}><b style={{ color: T.foreground }}>Exceção por empresa.</b> A personalização vale apenas para o cliente selecionado — não afeta a regra geral nem outras empresas.</span>
                  </CardFooter>
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
              <Combobox
                value={novoFeriado.municipio}
                onChange={(m) => setNovoFeriado((f) => ({ ...f, municipio: m }))}
                options={formMunicipiosDisponiveis.map((m) => ({ value: m, label: m }))}
                placeholder="Selecione um município"
                searchPlaceholder="Buscar município..."
                emptyText="Nenhum município encontrado."
                width="100%"
              />
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
                <Combobox
                  value={editFeriado.municipio}
                  onChange={(m) => setEditFeriado((f) => ({ ...f, municipio: m }))}
                  options={editFormMunicipiosDisponiveis.map((m) => ({ value: m, label: m }))}
                  placeholder="Selecione um município"
                  searchPlaceholder="Buscar município..."
                  emptyText="Nenhum município encontrado."
                  width="100%"
                />
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
          Há mudanças no rascunho da vigência {section === "regras-trilha-dp" ? vigenciaDP : vigencia} que ainda não foram publicadas. Você pode continuar editando aqui, ou sair e perder essas alterações.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleSairEPerder}>Sair sem publicar</Button>
          <Button onClick={handleContinuarEditando}>Continuar editando</Button>
        </div>
      </Dialog>

      {/* ================= DRAWER: ADICIONAR/EDITAR FISCAL (genérico p/ CFOP, Fornecedor x Plano de Contas, Acumulador x Conta, Simples Nacional) ================= */}
      {fiscalConfigAtual && fiscalForm && (
        <Sheet open={fiscalSheetOpen} onOpenChange={setFiscalSheetOpen}>
          <SheetHeader>
            <SheetTitle>{fiscalSheetModo === "add" ? `Adicionar ${fiscalConfigAtual.tituloSingular}` : `Editar ${fiscalConfigAtual.tituloSingular}`}</SheetTitle>
            <SheetDescription>
              {fiscalSheetEscopo === "nacional" && fiscalSheetTipo === "cfop"
                ? "Base nacional de CFOP (Regras por trilha) — a alteração vale para todas as empresas, não há publicação separada."
                : fiscalSheetEscopo === "nacional" && fiscalSheetTipo === "simples"
                ? "Tabela nacional do Simples Nacional (Regras por trilha) — a alteração vale para todas as empresas, não há publicação separada."
                : fiscalSheetTipo === "cfop"
                ? `Exceção de CFOP de ${empresaFiscalNome} — sobrescreve a base nacional só para esta empresa.`
                : `${fiscalConfigAtual.label} de ${empresaFiscalNome} — a alteração vale assim que salva, não há publicação separada.`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            {fiscalConfigAtual.campos.map((c) => (
              <div className="flex flex-col gap-1.5" key={c.chave}>
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>{c.label}</label>
                {c.tipoCampo === "select" ? (
                  <SelectField value={fiscalForm[c.chave]} onChange={(e) => setFiscalForm((f) => ({ ...f, [c.chave]: e.target.value }))}>
                    {c.opcoes.map((o) => <option key={o}>{o}</option>)}
                  </SelectField>
                ) : (
                  <Input placeholder={c.placeholder} value={fiscalForm[c.chave]} onChange={(e) => setFiscalForm((f) => ({ ...f, [c.chave]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setFiscalSheetOpen(false)}>Cancelar</Button>
            <Button disabled={fiscalSalvarDesabilitado} onClick={handleSalvarFiscal}>{fiscalSheetModo === "add" ? "Salvar" : "Salvar alterações"}</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DIALOG: CONFIRMAR PUBLICAR VIGÊNCIA (ATUALIZAÇÕES ANUAIS DP) ================= */}
      <Dialog open={publicarAtualizacoesDialogOpen} onOpenChange={setPublicarAtualizacoesDialogOpen}>
        <DialogHeader>
          <DialogTitle>Publicar vigência {vigenciaDP} do DP?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          A vigência anterior será movida para o histórico e os valores em "Novo" (pró-labore, dissídio, RAT/FAP) passam a
          valer oficialmente no cálculo da folha, para todas as empresas.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPublicarAtualizacoesDialogOpen(false)}>Cancelar</Button>
          <Button onClick={() => { handlePublicarAtualizacoes(); setPublicarAtualizacoesDialogOpen(false); }}>Publicar</Button>
        </div>
      </Dialog>

      {/* ================= DRAWER: CONSULTAR VIGÊNCIA DE ATUALIZAÇÕES DP (SOMENTE LEITURA) ================= */}
      {consultaDPDados && (
        <Sheet open={consultaDPOpen} onOpenChange={setConsultaDPOpen} width={640}>
          <SheetHeader>
            <SheetTitle>Atualizações anuais — vigência {consultaDPVig}</SheetTitle>
            <SheetDescription>Consulta somente leitura dos valores publicados nesta vigência.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            <Table>
              <TableHeader><tr><TableHead>Atualização</TableHead><TableHead>Periodicidade</TableHead><TableHead>Valor atual</TableHead><TableHead>Novo</TableHead></tr></TableHeader>
              <TableBody>
                {consultaDPDados.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.atualizacao}</TableCell>
                    <TableCell>{r.periodicidade}</TableCell>
                    <TableCell><b>{r.valorAtual}</b></TableCell>
                    <TableCell>{r.novo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setConsultaDPOpen(false)}>Fechar</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DRAWER: ADICIONAR/EDITAR DP (genérico p/ Sindicato, Rubrica, Atualização anual, Sindicato x Rubrica x Conta) ================= */}
      {dpConfigAtual && dpForm && (
        <Sheet open={dpSheetOpen} onOpenChange={setDpSheetOpen}>
          <SheetHeader>
            <SheetTitle>{dpSheetModo === "add" ? `Adicionar ${dpConfigAtual.tituloSingular}` : `Editar ${dpConfigAtual.tituloSingular}`}</SheetTitle>
            <SheetDescription>
              {dpSheetEscopo === "nacional"
                ? `${dpConfigAtual.label} (Regras por trilha) — a alteração vale para todas as empresas, não há publicação separada.`
                : `${dpConfigAtual.label} de ${empresaDPNome} — a alteração vale assim que salva, não há publicação separada.`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            {dpConfigAtual.campos.map((c) => (
              <div className="flex flex-col gap-1.5" key={c.chave}>
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>{c.label}</label>
                {c.tipoCampo === "select" ? (
                  <SelectField value={dpForm[c.chave]} onChange={(e) => setDpForm((f) => ({ ...f, [c.chave]: e.target.value }))}>
                    {c.opcoes.map((o) => <option key={o}>{o}</option>)}
                  </SelectField>
                ) : (
                  <Input placeholder={c.placeholder} value={dpForm[c.chave]} onChange={(e) => setDpForm((f) => ({ ...f, [c.chave]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setDpSheetOpen(false)}>Cancelar</Button>
            <Button disabled={dpSalvarDesabilitado} onClick={handleSalvarDP}>{dpSheetModo === "add" ? "Salvar" : "Salvar alterações"}</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= DRAWER: ADICIONAR/EDITAR CONTÁBIL (genérico p/ Acumulador x Conta, Rubrica x Conta, Adequação, Personalização) ================= */}
      {contabilConfigAtual && contabilForm && (
        <Sheet open={contabilSheetOpen} onOpenChange={setContabilSheetOpen}>
          <SheetHeader>
            <SheetTitle>{contabilSheetModo === "add" ? `Adicionar ${contabilConfigAtual.tituloSingular}` : `Editar ${contabilConfigAtual.tituloSingular}`}</SheetTitle>
            <SheetDescription>{contabilConfigAtual.label} de {empresaContabilNome} — a alteração vale assim que salva, não há publicação separada.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
            {contabilConfigAtual.campos.map((c) => (
              <div className="flex flex-col gap-1.5" key={c.chave}>
                <label className="text-xs font-medium" style={{ color: T.mutedForeground }}>{c.label}</label>
                {c.tipoCampo === "select" ? (
                  <SelectField value={contabilForm[c.chave]} onChange={(e) => setContabilForm((f) => ({ ...f, [c.chave]: e.target.value }))}>
                    {c.opcoes.map((o) => <option key={o}>{o}</option>)}
                  </SelectField>
                ) : (
                  <Input placeholder={c.placeholder} value={contabilForm[c.chave]} onChange={(e) => setContabilForm((f) => ({ ...f, [c.chave]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setContabilSheetOpen(false)}>Cancelar</Button>
            <Button disabled={contabilSalvarDesabilitado} onClick={handleSalvarContabil}>{contabilSheetModo === "add" ? "Salvar" : "Salvar alterações"}</Button>
          </SheetFooter>
        </Sheet>
      )}

      {/* ================= TOAST DE SUCESSO ================= */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}