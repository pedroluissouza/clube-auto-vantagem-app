import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Droplet, ShieldCheck, Store, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { mockBeneficios } from "@/lib/mock-data";

export const Route = createFileRoute("/beneficios")({
  head: () => ({
    meta: [
      { title: "Benefícios — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Lavagem inclusa, desconto em oficinas, guincho 24h e parceiros próximos.",
      },
      { property: "og:title", content: "Benefícios — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Conheça os benefícios do seu plano e a rede de parceiros.",
      },
    ],
  }),
  component: BeneficiosScreen,
});

/** A API entrega só título/descrição; o ícone é escolhido no app. */
function iconeBeneficio(titulo: string): LucideIcon {
  const t = titulo.toLowerCase();
  if (t.includes("lavagem")) return Droplet;
  if (t.includes("oficina") || t.includes("desconto")) return Wrench;
  if (t.includes("guincho") || t.includes("reboque")) return Truck;
  return ShieldCheck;
}

function BeneficiosScreen() {
  const { beneficios, parceiros } = mockBeneficios;

  return (
    <Screen title="Benefícios">
      <ul className="flex flex-col gap-2">
        {beneficios.map((b) => {
          const Icon = iconeBeneficio(b.titulo);
          return (
            <li
              key={b.titulo}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15">
                <Icon size={18} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{b.titulo}</p>
                <p className="text-[11px] text-muted-foreground">{b.descricao}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
            </li>
          );
        })}
      </ul>

      <p className="mt-6 mb-2 text-[13px] text-muted-foreground">Parceiros próximos</p>
      <div className="grid grid-cols-2 gap-3">
        {parceiros.map((p) => (
          <div
            key={p.nome}
            className="flex items-center gap-2 rounded-xl border border-border bg-card p-3"
          >
            <Store size={16} className="shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="truncate text-xs">{p.nome}</p>
              <p className="truncate text-[11px] text-muted-foreground capitalize">
                {p.categoria}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
