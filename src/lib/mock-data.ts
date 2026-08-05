import type {
  Beneficios,
  Carteirinha,
  Contrato,
  Faturas,
  LoginResponse,
} from "./types";

/** Mocks no MESMO formato das respostas da API (ISO + number). */

export const mockLogin: LoginResponse = {
  token: "mock-token",
  associado: { id: "24926FE0", nome: "Livio Giulliano Viana Ferreira" },
};

export const mockCarteirinha: Carteirinha = {
  codigo: "CAV-24926FE0",
  nome: "Livio Giulliano Viana Ferreira",
  cpf: "431.320.573-04",
  status: "ativo",
  veiculo: { modelo: "Saveiro G1 AP 1.6 95", placa: "KFF1D83" },
  plano: { nome: "Basico", valor: 49.9 },
  vencimento: "2026-08-04",
};

export const mockFaturas: Faturas = {
  proxima: {
    valor: 49.9,
    vencimento: "2026-08-04",
    status: "pendente",
    link_pagamento: "https://mpago.la/xxxxx",
  },
  historico: [
    { mes_referencia: "2026-07", valor: 49.9, pago_em: "2026-07-04", status: "pago" },
    { mes_referencia: "2026-06", valor: 49.9, pago_em: "2026-06-04", status: "pago" },
    { mes_referencia: "2026-05", valor: 49.9, pago_em: "2026-05-05", status: "pago" },
    { mes_referencia: "2026-04", valor: 49.9, pago_em: "2026-04-04", status: "pago" },
  ],
};

export const mockContrato: Contrato = {
  titulo: "Contrato de adesao",
  assinado_em: "2026-03-04",
  status: "vigente",
  url_pdf: "https://exemplo.com/contratos/24926FE0.pdf",
  plano: { nome: "Basico", valor_mensal: 49.9, inicio: "2026-03-04", dia_vencimento: 4 },
};

export const mockBeneficios: Beneficios = {
  beneficios: [
    { titulo: "Lavagem inclusa", descricao: "2 lavagens gratis por mes" },
    { titulo: "Desconto em oficinas", descricao: "Ate 20% em parceiros" },
    { titulo: "Guincho 24h", descricao: "Cobertura ate 50km" },
    { titulo: "Assistencia eletrica", descricao: "Pane seca, bateria e chaveiro" },
  ],
  parceiros: [
    { nome: "Auto Center Silva", categoria: "oficina" },
    { nome: "Lava Rapido JM", categoria: "lavagem" },
    { nome: "Oficina Bom Motor", categoria: "oficina" },
    { nome: "Pneus & Cia", categoria: "pneus" },
  ],
};
