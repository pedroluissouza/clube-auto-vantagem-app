import { Link, Outlet } from "@tanstack/react-router";
import { Home, CreditCard, Wallet, Gift, User } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Início", icon: Home, exact: true },
  { to: "/carteirinha", label: "Carteirinha", icon: CreditCard, exact: false },
  { to: "/financeiro", label: "Financeiro", icon: Wallet, exact: false },
  { to: "/beneficios", label: "Benefícios", icon: Gift, exact: false },
  { to: "/perfil", label: "Perfil", icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[420px] items-stretch justify-between px-2 py-2">
        {nav.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact }}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[11px] text-muted-foreground transition-colors data-[status=active]:text-primary"
          >
            <Icon size={20} className="shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Screen({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto w-full max-w-[420px] px-4 pt-6">
        {title ? (
          <h1 className="mb-4 text-lg font-semibold text-foreground">{title}</h1>
        ) : null}
        {children}
      </div>
      <BottomNav />
    </div>
  );
}

export function AppLayout() {
  return <Outlet />;
}
