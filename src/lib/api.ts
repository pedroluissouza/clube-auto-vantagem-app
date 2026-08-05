/**
 * Camada de API do app do associado.
 * Base: VITE_API_URL. Autenticação: Authorization: Bearer {token} (localStorage).
 * Sem VITE_API_URL definido, as funções devolvem os mocks no mesmo formato do contrato.
 */
import {
  mockBeneficios,
  mockCarteirinha,
  mockContrato,
  mockFaturas,
  mockLogin,
} from "./mock-data";
import type {
  ApiErro,
  Beneficios,
  Carteirinha,
  Contrato,
  Faturas,
  LoginResponse,
} from "./types";

const API_URL = (import.meta.env["VITE_API_URL"] ?? "").replace(/\/$/, "");
const TOKEN_KEY = "cav_token";
const USE_MOCK = !API_URL;

export class ApiError extends Error {
  status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
    this.name = "ApiError";
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let mensagem = `Erro ${res.status}`;
    try {
      const corpo = (await res.json()) as ApiErro;
      if (corpo?.erro) mensagem = corpo.erro;
    } catch {
      /* resposta sem corpo JSON */
    }
    if (res.status === 401) clearToken();
    throw new ApiError(res.status, mensagem);
  }

  return (await res.json()) as T;
}

/** POST /associado/login */
export async function login(identificador: string, senha: string): Promise<LoginResponse> {
  const data = USE_MOCK
    ? mockLogin
    : await request<LoginResponse>("/associado/login", {
        method: "POST",
        body: JSON.stringify({ identificador, senha }),
      });
  setToken(data.token);
  return data;
}

/** GET /associado/me/carteirinha */
export async function minhaCarteirinha(): Promise<Carteirinha> {
  if (USE_MOCK) return mockCarteirinha;
  return request<Carteirinha>("/associado/me/carteirinha");
}

/** GET /associado/me/faturas */
export async function minhasFaturas(): Promise<Faturas> {
  if (USE_MOCK) return mockFaturas;
  return request<Faturas>("/associado/me/faturas");
}

/** GET /associado/me/contrato */
export async function meuContrato(): Promise<Contrato> {
  if (USE_MOCK) return mockContrato;
  return request<Contrato>("/associado/me/contrato");
}

/** GET /associado/me/beneficios */
export async function meusBeneficios(): Promise<Beneficios> {
  if (USE_MOCK) return mockBeneficios;
  return request<Beneficios>("/associado/me/beneficios");
}
