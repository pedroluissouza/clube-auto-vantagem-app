import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, Car, ChevronRight, Headset, LogOut, User } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { useSupabase } from "@/context/SupabaseContext";
import { mockCarteirinha, mockContrato } from "@/lib/mock-data";
import { formatarData } from "@/lib/format";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Seus dados, veículo, notificações e suporte do Clube Auto Vantagem.",
      },
      { property: "og:title", content: "Perfil — Clube Auto Vantagem" },
      { property: "og:description", content: "Gerencie seus dados e preferências de associado." },
    ],
  }),
  component: PerfilScreen,
});

function PerfilScreen() {
  const navigate = useNavigate();
  const { user, profile, subscription, logout } = useSupabase();

  const nome = profile?.full_name || user?.email || mockCarteirinha.nome;
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const dataInicio = subscription?.current_period_start
    ? formatarData(subscription.current_period_start)
    : formatarData(mockContrato.plano.inicio);

  const itens = [
    { label: "Meus dados", icon: User },
    { label: "Meu veículo", icon: Car },
    { label: "Notificações", icon: Bell },
    { label: "Suporte / WhatsApp", icon: Headset },
  ] as const;

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  return (
    <Screen title="Perfil">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-medium text-primary">
          {iniciais}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{nome}</p>
          <p className="text-xs text-muted-foreground">
            Associado desde {dataInicio}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        {itens.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 border-b border-border bg-card p-3 text-left last:border-b-0"
          >
            <Icon size={16} className="shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-[13px]">{label}</span>
            <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 bg-card p-3 text-left hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={16} className="shrink-0 text-destructive" />
          <span className="flex-1 text-[13px] text-destructive">Sair da conta</span>
        </button>
      </div>
    </Screen>
  );
}
