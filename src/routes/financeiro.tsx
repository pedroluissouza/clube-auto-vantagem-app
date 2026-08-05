import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { mockCarteirinha, mockFaturas } from "@/lib/mock-data";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Próxima cobrança e histórico de pagamentos do seu plano de associado.",
      },
      { property: "og:title", content: "Financeiro — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Veja sua próxima cobrança e o histórico de faturas pagas.",
      },
    ],
  }),
  component: FinanceiroScreen,
});

function FinanceiroScreen() {
  const c = mockCarteirinha;

  return (
    <Screen title="Financeiro">
      <section className="rounded-2xl bg-primary/12 p-4">
        <p className="text-xs text-primary">Próxima cobrança</p>
        <p className="mt-1 text-2xl font-semibold text-primary">{c.valorMensal}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Vence em {c.vencimento}</span>
          <button className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Pagar agora
          </button>
        </div>
      </section>

      <p className="mt-6 mb-2 text-[13px] text-muted-foreground">Histórico de pagamentos</p>
      <ul className="flex flex-col gap-2">
        {mockFaturas.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              {f.status === "Pago" ? (
                <Check size={16} className="shrink-0 text-success" />
              ) : (
                <Clock size={16} className="shrink-0 text-muted-foreground" />
              )}
              <div className="min-w-0">
                <p className="truncate text-[13px]">{f.mes}</p>
                <p className="text-[11px] text-muted-foreground">
                  {f.pagoEm ? `Pago em ${f.pagoEm}` : "Pendente"}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-medium">{f.valor}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
