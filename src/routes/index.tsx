import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, FileText, Gift, Receipt, Store, Car } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { mockCarteirinha } from "@/lib/mock-data";
import { formatarData, formatarMoeda, rotuloStatus } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — Clube Auto Vantagem" },
      {
        name: "description",
        content:
          "Portal do associado Clube Auto Vantagem: carteirinha digital, faturas, contrato e benefícios do seu plano.",
      },
      { property: "og:title", content: "Início — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Acesse sua carteirinha digital, faturas e benefícios do clube.",
      },
    ],
  }),
  component: HomeScreen,
});

const atalhos = [
  { to: "/financeiro", label: "Fatura", icon: Receipt },
  { to: "/contrato", label: "Contrato", icon: FileText },
  { to: "/beneficios", label: "Benefícios", icon: Gift },
  { to: "/beneficios", label: "Parceiros", icon: Store },
] as const;

function HomeScreen() {
  const c = mockCarteirinha;
  const primeiroNome = c.nome.split(" ")[0];
  const ativo = c.status === "ativo";

  return (
    <Screen>
      <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Bem-vindo de volta</p>
          <h1 className="truncate text-lg font-semibold">Olá, {primeiroNome}</h1>
        </div>
        <button className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-muted-foreground">
          <Bell size={18} />
        </button>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Car size={18} className="shrink-0 text-primary" />
            <span className="truncate text-sm font-medium">Clube Auto Vantagem</span>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${
              ativo ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}
          >
            {rotuloStatus(c.status)}
          </span>
        </div>
        <p className="text-sm font-medium">{c.nome}</p>
        <p className="mb-4 text-xs text-muted-foreground">{c.codigo}</p>
        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-muted-foreground">Veículo</dt>
            <dd className="font-medium">{c.veiculo.modelo}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Placa</dt>
            <dd className="font-medium">{c.veiculo.placa}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Plano</dt>
            <dd className="font-medium text-primary">{formatarMoeda(c.plano.valor)}/mês</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Vencimento</dt>
            <dd className="font-medium">{formatarData(c.vencimento)}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {atalhos.map(({ to, label, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-colors hover:bg-accent"
          >
            <Icon size={18} className="shrink-0 text-primary" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground">Próximo vencimento</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xl font-semibold text-primary">{formatarMoeda(c.plano.valor)}</p>
            <p className="text-xs text-muted-foreground">
              Vence em {formatarData(c.vencimento)}
            </p>
          </div>
          <Link
            to="/financeiro"
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Pagar
          </Link>
        </div>
      </section>
    </Screen>
  );
}
