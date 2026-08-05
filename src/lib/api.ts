import type {
  LoginResponse,
  Carteirinha,
  Faturas,
  Contrato,
  Beneficios,
  ApiErro,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://planos.clubeautovantagem.com.br/api";

function getToken(): string | null {
  return localStorage.getItem("cav_token");
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body: ApiErro = await res.json().catch(() => ({ erro: "Erro desconhecido" }));
    throw new ApiError(body.erro ?? "Erro na API", res.status);
  }

  return res.json() as Promise<T>;
}

export const api = {
  login: (identificador: string, senha: string) =>
    request<LoginResponse>("/associado/login", {
      method: "POST",
      body: JSON.stringify({ identificador, senha }),
    }).then((data) => {
      localStorage.setItem("cav_token", data.token);
      return data;
    }),

  logout: () => {
    localStorage.removeItem("cav_token");
  },

  minhaCarteirinha: () => request<Carteirinha>("/associado/me/carteirinha"),

  minhasFaturas: () => request<Faturas>("/associado/me/faturas"),

  meuContrato: () => request<Contrato>("/associado/me/contrato"),

  meusBeneficios: () => request<Beneficios>("/associado/me/beneficios"),
};

export { ApiError };
