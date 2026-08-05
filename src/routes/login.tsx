import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Car, Fingerprint, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import { api, ApiError } from "@/lib/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Acesse sua conta de associado do Clube Auto Vantagem.",
      },
      { property: "og:title", content: "Entrar — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Portal do associado: carteirinha, faturas e benefícios.",
      },
    ],
  }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    try {
      await api.login(usuario, senha);
      navigate({ to: "/" });
    } catch (err) {
      if (err instanceof ApiError) {
        setErro(err.message);
      } else {
        setErro("Ocorreu um erro ao tentar entrar. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 font-sans text-slate-100">
      {/* Elementos flutuantes / Orbs animadas no fundo */}
      <div className="absolute top-1/4 -left-32 size-96 animate-pulse rounded-full bg-blue-600/20 blur-[100px] [animation-duration:4s]" />
      <div className="absolute bottom-1/4 -right-32 size-96 animate-pulse rounded-full bg-cyan-400/20 blur-[100px] [animation-duration:7s] [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-purple-600/10 blur-[120px] [animation-duration:10s]" />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Card com Glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-[0_0_80px_-20px_rgba(6,182,212,0.15)] backdrop-blur-xl">
          
          <div className="mb-10 flex flex-col items-center">
            <div className="relative mb-5 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-blue-400/20 blur-xl [animation-duration:3s]" />
              <Car size={32} className="relative z-10 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Clube Auto</h1>
            <p className="mt-1 text-xs font-semibold tracking-[0.4em] text-cyan-400">VANTAGEM</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Mensagem de Erro */}
            {erro && (
              <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-400 shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)] duration-300">
                <AlertCircle size={18} className="shrink-0" />
                <p>{erro}</p>
              </div>
            )}

            {/* Input de E-mail/CPF */}
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within:text-cyan-400">
                <Fingerprint size={20} />
              </div>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="E-mail ou CPF"
                className="w-full rounded-xl border border-white/5 bg-black/40 py-3.5 pr-4 pl-12 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition-all hover:border-white/10 focus:border-cyan-400/50 focus:bg-black/60 focus:ring-cyan-400/50"
                required
              />
            </div>

            {/* Input de Senha */}
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within:text-cyan-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full rounded-xl border border-white/5 bg-black/40 py-3.5 pr-4 pl-12 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition-all hover:border-white/10 focus:border-cyan-400/50 focus:bg-black/60 focus:ring-cyan-400/50"
                required
              />
            </div>

            <div className="mt-1 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-300">
                <input type="checkbox" className="rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/50" />
                <span className="text-xs">Lembrar de mim</span>
              </label>
              <button type="button" className="text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline hover:underline-offset-2">
                Esqueceu a senha?
              </button>
            </div>

            {/* Botão de Ação Futurista */}
            <button
              type="submit"
              disabled={carregando}
              className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {/* Efeito de luz passando no botão */}
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-12 bg-white/20 blur-sm" />
              </div>
              
              <span className="relative z-10 flex items-center gap-2">
                {carregando ? "Autenticando na matriz..." : "Acessar Portal"}
                {!carregando && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>
        </div>
          
        <p className="mt-8 text-center text-sm text-slate-500">
          Ainda não é associado?{" "}
          <button type="button" className="font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline hover:underline-offset-2">
            Conheça os planos
          </button>
        </p>
      </div>
    </div>
  );
}
