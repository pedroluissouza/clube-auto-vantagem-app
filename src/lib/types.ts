/** Tipos espelhando exatamente o contrato da API externa. */

export type StatusAssociado = "ativo" | "inadimplente" | "cancelado";
export type StatusFatura = "pago" | "pendente" | "atrasado";

export type LoginRequest = { identificador: string; senha: string };

export type LoginResponse = {
  token: string;
  associado: { id: string; nome: string };
};

export type Carteirinha = {
  codigo: string;
  nome: string;
  cpf: string;
  status: StatusAssociado;
  veiculo: { modelo: string; placa: string };
  plano: { nome: string; valor: number };
  /** ISO YYYY-MM-DD */
  vencimento: string;
};

export type Faturas = {
  proxima: {
    valor: number;
    vencimento: string;
    status: StatusFatura;
    link_pagamento: string | null;
  };
  historico: Array<{
    mes_referencia: string;
    valor: number;
    pago_em: string | null;
    status: StatusFatura;
  }>;
};

export type Contrato = {
  titulo: string;
  assinado_em: string;
  status: string;
  url_pdf: string;
  plano: {
    nome: string;
    valor_mensal: number;
    inicio: string;
    dia_vencimento: number;
  };
};

export type Beneficios = {
  beneficios: Array<{ titulo: string; descricao: string }>;
  parceiros: Array<{ nome: string; categoria: string }>;
};

export type ApiErro = { erro: string };
