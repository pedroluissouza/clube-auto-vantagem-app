import { createFileRoute } from "@tanstack/react-router";
import { Car, Download, QrCode, Share2 } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { mockCarteirinha } from "@/lib/mock-data";
import { formatarMoeda, rotuloStatus } from "@/lib/format";

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
  const c = mockCarteirinha;
  const ativo = c.status === "ativo";
  const campos = [
    ["CPF", c.cpf],
    ["Veículo", c.veiculo.modelo],
    ["Placa", c.veiculo.placa],
    ["Plano", `${formatarMoeda(c.plano.valor)}/mês`],
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
            {rotuloStatus(c.status)}
          </span>
        </div>

        <p className="text-[15px] font-medium">{c.nome}</p>
        <p className="mb-4 text-xs text-muted-foreground">{c.codigo}</p>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          {campos.map(([label, valor]) => (
            <div key={label}>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className={label === "Plano" ? "font-medium text-primary" : "font-medium"}>
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
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm">
          <Share2 size={16} className="text-primary" /> Compartilhar
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm">
          <Download size={16} className="text-primary" /> Baixar PDF
        </button>
      </div>
    </Screen>
  );
}
