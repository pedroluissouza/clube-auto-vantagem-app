import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, FileText, Gift, Receipt, Store, Car, Coins, Sparkles, Loader2, AlertCircle, LogIn } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { useSupabase } from "@/context/SupabaseContext";
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
  const navigate = useNavigate();
  const {
    user,
    profile,
    subscription,
    wallet,
    jobs,
    notifications,
    loading,
    error,
  } = useSupabase();

  // If loading, show spinner
  if (loading) {
    return (
      <Screen>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Sincronizando com o Supabase...</p>
        </div>
      </Screen>
    );
  }

  // If not authenticated, show login prompt or button to go to /login
  if (!user) {
    return (
      <Screen>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
          <div className="grid size-16 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Car size={32} />
          </div>
          <h2 className="text-xl font-bold text-foreground">Acesse sua conta</h2>
          <p className="text-xs text-muted-foreground max-w-xs">
            Faça login com a sua conta do Supabase para visualizar sua carteirinha, saldo de créditos e benefícios.
          </p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:brightness-110 transition-all"
          >
            <LogIn size={18} />
            Fazer Login
          </button>
        </div>
      </Screen>
    );
  }

  // Real user data from Supabase
  const nomeExibicao = profile?.full_name || user.email || "Associado";
  const primeiroNome = nomeExibicao.split(" ")[0];
  const codigoAssociado = `CAV-${user.id.slice(0, 8).toUpperCase()}`;
  const saldoCreditos = wallet?.balance ?? 0;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const statusPlano = subscription?.status === "active" ? "ativo" : (subscription?.status || "ativo");
  const ativo = statusPlano === "ativo";
  const valorPlano = subscription?.amount ?? 49.9;
  const vencimentoPlano = subscription?.current_period_end || "2026-12-31";

  return (
    <Screen>
      <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Bem-vindo de volta</p>
          <h1 className="truncate text-lg font-semibold">Olá, {primeiroNome}</h1>
        </div>
        <button className="relative grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:bg-accent transition-colors">
          <Bell size={18} />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950">
              {unreadNotifs}
            </span>
          )}
        </button>
      </header>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
          <AlertCircle size={16} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Realtime Credits & Wallet Card */}
      <section className="mb-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Coins size={18} className="animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">Créditos Supabase Realtime</span>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
            Ao vivo
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <p className="text-3xl font-bold tracking-tight text-white">{saldoCreditos} <span className="text-sm font-normal text-slate-400">créditos</span></p>
            <p className="mt-0.5 text-[11px] text-slate-400">Atualizado automaticamente via Supabase Realtime</p>
          </div>
        </div>
      </section>

      {/* Active AI / Generation Jobs Status Section */}
      {jobs.length > 0 && (
        <section className="mb-4 rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles size={18} className="text-cyan-400" />
              <span>Status de Gerações IA</span>
            </div>
            <span className="text-xs text-muted-foreground">{jobs.length} tarefas</span>
          </div>
          <div className="flex flex-col gap-2">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 p-2.5 text-xs">
                <div className="min-w-0 flex-1 truncate">
                  <p className="truncate font-medium text-foreground">{job.prompt || "Processando solicitação..."}</p>
                  <p className="text-[10px] text-muted-foreground">{formatarData(job.created_at)}</p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                    job.status === "completed"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : job.status === "processing"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 animate-pulse"
                      : job.status === "failed"
                      ? "bg-red-500/15 text-red-400 border border-red-500/20"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {job.status === "completed"
                    ? "Concluído"
                    : job.status === "processing"
                    ? "Processando..."
                    : job.status === "failed"
                    ? "Falhou"
                    : "Pendente"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Carteirinha Digital / Informações do Perfil */}
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
            {rotuloStatus(statusPlano as any)}
          </span>
        </div>
        <p className="text-sm font-medium">{nomeExibicao}</p>
        <p className="mb-4 text-xs text-muted-foreground">{codigoAssociado}</p>
        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-muted-foreground">E-mail</dt>
            <dd className="font-medium truncate">{user.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ID do Usuário</dt>
            <dd className="font-medium truncate">{user.id.slice(0, 8)}...</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Plano</dt>
            <dd className="font-medium text-primary">
              {subscription?.plan_name || "Básico"} ({formatarMoeda(valorPlano)}/mês)
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Vencimento</dt>
            <dd className="font-medium">{formatarData(vencimentoPlano)}</dd>
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
            <p className="text-xl font-semibold text-primary">{formatarMoeda(valorPlano)}</p>
            <p className="text-xs text-muted-foreground">
              Vence em {formatarData(vencimentoPlano)}
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
