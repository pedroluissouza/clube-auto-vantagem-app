import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/api";

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
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    try {
      await login(usuario, senha);
      navigate({ to: "/" });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary/15">
            <Car size={28} className="text-primary" />
          </div>
          <p className="mt-3 text-base font-semibold">Clube Auto</p>
          <p className="text-[13px] tracking-[0.2em] text-primary">VANTAGEM</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">E-mail ou CPF</span>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="seu@email.com"
              className="rounded-xl border border-border bg-card px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-border bg-card px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </label>
          <button type="button" className="self-end text-xs text-primary">
            Esqueceu a senha?
          </button>
          <button
            type="submit"
            disabled={carregando}
            className="mt-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Acessar minha conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ainda não é membro?{" "}
          <button type="button" className="text-primary">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}
