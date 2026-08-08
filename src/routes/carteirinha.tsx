import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Car, Download, QrCode, Share2, LogIn } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { useSupabase } from "@/context/SupabaseContext";
import { formatarData, formatarMoeda, rotuloStatus } from "@/lib/format";

export const Route = createFileRoute("/carteirinha")({
  head: () => ({
    meta: [
      { title: "Carteirinha digital — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Sua carteirinha digital do Clube Auto Vantagem com QR code, plano e veículo.",
      },
      { property: "og:title", content: "Carteirinha digital — Clube Auto Vantagem" },
      { property: "og:description", content: "Carteirinha digital do associado com QR code." },
    ],
  }),
  component: CarteirinhaScreen,
});

function CarteirinhaScreen() {
  const navigate = useNavigate();
  const { user, profile, subscription } = useSupabase();

  if (!user) {
    return (
      <Screen title="Carteirinha">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
          <Car size={32} className="text-cyan-400" />
          <p className="text-sm text-muted-foreground">Faça login para acessar sua carteirinha digital.</p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <LogIn size={18} />
            Fazer Login
          </button>
        </div>
      </Screen>
    );
  }

  const nome = profile?.full_name || user.email || "Associado";
  const codigo = `CAV-${user.id.slice(0, 8).toUpperCase()}`;
  const statusPlano = subscription?.status === "active" ? "ativo" : (subscription?.status || "ativo");
  const ativo = statusPlano === "ativo";
  const valorPlano = subscription?.amount ?? 49.9;

  const campos = [
    ["E-mail", user.email || "-"],
    ["ID do Usuário", user.id.slice(0, 12)],
    ["Plano", `${subscription?.plan_name || "Básico"} (${formatarMoeda(valorPlano)}/mês)`],
    ["Validade", subscription?.current_period_end ? formatarData(subscription.current_period_end) : "2026-12-31"],
  ] as const;

  return (
    <Screen title="Carteirinha">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Car size={18} className="shrink-0 text-primary" />
            <span className="truncate text-sm font-medium">Clube Auto Vantagem</span>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${
              ativo ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}
          >
            {rotuloStatus(statusPlano as any)}
          </span>
        </div>

        <p className="text-[15px] font-medium">{nome}</p>
        <p className="mb-4 text-xs text-muted-foreground">{codigo}</p>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          {campos.map(([label, valor]) => (
            <div key={label}>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className={label === "Plano" ? "font-medium text-primary truncate" : "font-medium truncate"}>
                {valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex justify-center border-t border-dashed border-border pt-5">
          <QrCode size={96} className="text-foreground" />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm hover:bg-accent transition-colors">
          <Share2 size={16} className="text-primary" /> Compartilhar
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm hover:bg-accent transition-colors">
          <Download size={16} className="text-primary" /> Baixar PDF
        </button>
      </div>
    </Screen>
  );
}
