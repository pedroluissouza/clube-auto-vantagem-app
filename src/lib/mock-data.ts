export type StatusAssociado = "Ativo" | "Inadimplente";

export type Carteirinha = {
  nome: string;
  codigo: string;
  cpf: string;
  veiculo: string;
  placa: string;
  plano: string;
  valorMensal: string;
  status: StatusAssociado;
  vencimento: string;
  associadoDesde: string;
};

export type Fatura = {
  id: string;
  mes: string;
  pagoEm: string | null;
  valor: string;
  status: "Pago" | "Pendente";
};

export type Contrato = {
  nome: string;
  assinadoEm: string;
  status: string;
  plano: string;
  valorMensal: string;
  inicio: string;
  vencimento: string;
};

export type Beneficio = {
  id: string;
  icone: "droplet" | "wrench" | "truck" | "shield";
  titulo: string;
  descricao: string;
};

export const mockCarteirinha: Carteirinha = {
  nome: "Livio Giulliano Viana Ferreira",
  codigo: "CAV-24926FE0",
  cpf: "431.320.573-04",
  veiculo: "Saveiro G1 1.6",
  placa: "KFF1D83",
  plano: "Básico",
  valorMensal: "R$ 49,90",
  status: "Ativo",
  vencimento: "04/08/2026",
  associadoDesde: "março 2026",
};

export const mockFaturas: Fatura[] = [
  { id: "1", mes: "Julho 2026", pagoEm: "04/07/2026", valor: "R$ 49,90", status: "Pago" },
  { id: "2", mes: "Junho 2026", pagoEm: "04/06/2026", valor: "R$ 49,90", status: "Pago" },
  { id: "3", mes: "Maio 2026", pagoEm: "05/05/2026", valor: "R$ 49,90", status: "Pago" },
  { id: "4", mes: "Abril 2026", pagoEm: "04/04/2026", valor: "R$ 49,90", status: "Pago" },
];

export const mockContrato: Contrato = {
  nome: "Contrato de adesão",
  assinadoEm: "04/03/2026",
  status: "Vigente",
  plano: "Básico",
  valorMensal: "R$ 49,90",
  inicio: "04/03/2026",
  vencimento: "Dia 4 de cada mês",
};

export const mockBeneficios: Beneficio[] = [
  {
    id: "1",
    icone: "droplet",
    titulo: "Lavagem inclusa",
    descricao: "2 lavagens grátis por mês",
  },
  {
    id: "2",
    icone: "wrench",
    titulo: "Desconto em oficinas",
    descricao: "Até 20% em parceiros credenciados",
  },
  { id: "3", icone: "truck", titulo: "Guincho 24h", descricao: "Cobertura até 50km" },
  {
    id: "4",
    icone: "shield",
    titulo: "Assistência elétrica",
    descricao: "Pane seca, bateria e chaveiro",
  },
];

export const mockParceiros = [
  "Auto Center Silva",
  "Lava Rápido Aurora",
  "Oficina Bom Motor",
  "Pneus & Cia",
];
