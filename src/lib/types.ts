export type StatusAssociado = "ativo" | "inadimplente" | "cancelado";
export type StatusFatura = "pago" | "pendente" | "atrasado";
export type StatusContrato = "vigente" | "encerrado" | "cancelado";

export interface LoginRequest {
  identificador: string; // e-mail ou CPF
  senha: string;
}

export interface LoginResponse {
  token: string;
  associado: {
    id: string;
    nome: string;
  };
}

export interface Veiculo {
  modelo: string;
  placa: string;
}

export interface Plano {
  nome: string;
  valor: number;
}

export interface Carteirinha {
  codigo: string;
  nome: string;
  cpf: string;
  status: StatusAssociado;
  veiculo: Veiculo;
  plano: Plano;
  vencimento: string; // ISO date (YYYY-MM-DD)
}

export interface ProximaFatura {
  valor: number;
  vencimento: string; // ISO date
  status: StatusFatura;
  link_pagamento: string;
}

export interface FaturaHistorico {
  mes_referencia: string; // YYYY-MM
  valor: number;
  pago_em: string | null; // ISO date, null se ainda nao pago
  status: StatusFatura;
}

export interface Faturas {
  proxima: ProximaFatura;
  historico: FaturaHistorico[];
}

export interface PlanoContrato {
  nome: string;
  valor_mensal: number;
  inicio: string; // ISO date
  dia_vencimento: number;
}

export interface Contrato {
  titulo: string;
  assinado_em: string; // ISO date
  status: StatusContrato;
  url_pdf: string;
  plano: PlanoContrato;
}

export interface Beneficio {
  titulo: string;
  descricao: string;
}

export interface Parceiro {
  nome: string;
  categoria: string;
}

export interface Beneficios {
  beneficios: Beneficio[];
  parceiros: Parceiro[];
}

export interface ApiErro {
  erro: string;
}
