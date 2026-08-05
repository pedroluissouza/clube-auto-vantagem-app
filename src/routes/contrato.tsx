import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye, FileText } from "lucide-react";
import { Screen } from "@/components/AppShell";
import { mockContrato } from "@/lib/mock-data";
import { formatarData, formatarMoeda, rotuloStatus } from "@/lib/format";

export const Route = createFileRoute("/contrato")({
  head: () => ({
    meta: [
      { title: "Contrato — Clube Auto Vantagem" },
      {
        name: "description",
        content: "Contrato de adesão do associado: status, plano, valor mensal e vencimento.",
      },
      { property: "og:title", content: "Contrato — Clube Auto Vantagem" },
      {
        property: "og:description",
        content: "Consulte e baixe o contrato de adesão do seu plano.",
      },
    ],
  }),
  component: ContratoScreen,
});

function ContratoScreen() {
  const ct = mockContrato;
  const linhas = [
    ["Plano", ct.plano.nome],
    ["Valor mensal", formatarMoeda(ct.plano.valor_mensal)],
    ["Início", formatarData(ct.plano.inicio)],
    ["Vencimento", `Dia ${ct.plano.dia_vencimento} de cada mês`],
  ] as const;

  return (
    <Screen title="Contrato">
      <section className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-6">
        <FileText size={40} className="mb-3 text-primary" />
        <p className="text-sm font-medium">{ct.titulo}</p>
        <p className="text-xs text-muted-foreground">
          Assinado em {formatarData(ct.assinado_em)}
        </p>
        <span className="mt-2 rounded-full bg-success/15 px-2.5 py-1 text-[11px] text-success">
          {rotuloStatus(ct.status)}
        </span>
      </section>

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={ct.url_pdf}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm"
        >
          <Eye size={16} className="text-primary" /> Visualizar contrato
        </a>
        <a
          href={ct.url_pdf}
          download
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm"
        >
          <Download size={16} className="text-primary" /> Baixar PDF
        </a>
      </div>

      <p className="mt-6 mb-2 text-[13px] text-muted-foreground">Dados do plano</p>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-[13px]">
          <tbody>
            {linhas.map(([label, valor], i) => (
              <tr key={label} className={i > 0 ? "border-t border-border" : ""}>
                <td className="px-3 py-2.5 text-muted-foreground">{label}</td>
                <td className="px-3 py-2.5 text-right font-medium">{valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Screen>
  );
}
