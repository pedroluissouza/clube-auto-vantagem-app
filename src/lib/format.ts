/** Formatação de exibição — a API entrega ISO e number puros. */

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** "2026-08-04" -> "04/08/2026" */
export function formatarData(iso: string | null | undefined): string {
  if (!iso) return "—";
  const [ano, mes, dia] = iso.split("-");
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/** "2026-07" -> "Julho 2026" */
export function formatarMesReferencia(ref: string): string {
  const [ano, mes] = ref.split("-");
  const nome = MESES[Number(mes) - 1];
  return nome && ano ? `${nome} ${ano}` : ref;
}

export function rotuloStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
