import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Coins, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { useSupabase } from "@/context/SupabaseContext";
import { mockFaturas } from "@/lib/mock-data";
import { formatarData, formatarMesReferencia, formatarMoeda } from "@/lib/format";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Próxima cobrança, créditos em tempo real e histórico de movimentações.",
      },
      { property: "og:title", content: "Financeiro — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Veja sua próxima cobrança, saldo de créditos e histórico de transações.",
      },
    ],
  }),
  component: FinanceiroScreen,
});

function FinanceiroScreen() {
  const { subscription, wallet, transactions } = useSupabase();
  const { proxima, historico } = mockFaturas;

  const valorCobranca = subscription?.amount ?? proxima.valor;
  const dataVencimento = subscription?.current_period_end
    ? formatarData(subscription.current_period_end)
    : formatarData(proxima.vencimento);

  return (
    <Screen title="Financeiro">
      {/* Realtime Wallet Balance */}
      <section className="mb-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Coins size={18} />
          <span className="text-xs font-semibold uppercase tracking-wider">Carteira de Créditos (Realtime)</span>
        </div>
        <p className="mt-2 text-3xl font-bold text-white">{wallet?.balance ?? 0} <span className="text-sm font-normal text-slate-400">créditos</span></p>
        <p className="mt-1 text-[11px] text-slate-400">Sincronizado automaticamente com seu MVP web</p>
      </section>

      {/* Próxima Cobrança */}
      <section className="rounded-2xl bg-primary/12 p-4">
        <p className="text-xs text-primary">Próxima cobrança do plano</p>
        <p className="mt-1 text-2xl font-semibold text-primary">{formatarMoeda(valorCobranca)}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Vence em {dataVencimento}
          </span>
          <a
            href={proxima.link_pagamento ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Pagar agora
          </a>
        </div>
      </section>

      {/* Credit Transactions (if available from Supabase) */}
      {transactions.length > 0 && (
        <>
          <p className="mt-6 mb-2 text-[13px] text-muted-foreground">Histórico de Transações de Crédito</p>
          <ul className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {tx.type === "credit" || tx.type === "bonus" ? (
                    <ArrowDownLeft size={16} className="shrink-0 text-emerald-400" />
                  ) : (
                    <ArrowUpRight size={16} className="shrink-0 text-red-400" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{tx.description || tx.type}</p>
                    <p className="text-[11px] text-muted-foreground">{formatarData(tx.created_at)}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[13px] font-medium ${
                    tx.type === "credit" || tx.type === "bonus" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "credit" || tx.type === "bonus" ? `+${tx.amount}` : `-${tx.amount}`}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Histórico de Pagamentos de Fatura */}
      <p className="mt-6 mb-2 text-[13px] text-muted-foreground">Histórico de Faturas do Plano</p>
      <ul className="flex flex-col gap-2">
        {historico.map((f) => (
          <li
            key={f.mes_referencia}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              {f.status === "pago" ? (
                <Check size={16} className="shrink-0 text-success" />
              ) : (
                <Clock size={16} className="shrink-0 text-muted-foreground" />
              )}
              <div className="min-w-0">
                <p className="truncate text-[13px]">{formatarMesReferencia(f.mes_referencia)}</p>
                <p className="text-[11px] text-muted-foreground">
                  {f.pago_em ? `Pago em ${formatarData(f.pago_em)}` : "Pendente"}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-medium">{formatarMoeda(f.valor)}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
