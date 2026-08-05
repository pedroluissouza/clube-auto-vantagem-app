/**
 * Camada de API — pronta para trocar mock por chamadas reais.
 * Base: VITE_API_URL. Token Bearer salvo no localStorage.
 */
import {
  mockCarteirinha,
  mockFaturas,
  mockContrato,
  mockBeneficios,
  type Carteirinha,
  type Fatura,
  type Contrato,
  type Beneficio,
} from "./mock-data";

const API_URL = import.meta.env["VITE_API_URL"] ?? "";
const TOKEN_KEY = "cav_token";
const USE_MOCK = !API_URL;

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
  if (!res.ok) throw new Error(`Erro ${res.status} ao chamar ${path}`);
  return (await res.json()) as T;
}

export async function login(usuario: string, senha: string): Promise<{ token: string }> {
  if (USE_MOCK) {
    const token = "mock-token";
    setToken(token);
    return { token };
  }
  const data = await request<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ usuario, senha }),
  });
  setToken(data.token);
  return data;
}

export async function minhaCarteirinha(): Promise<Carteirinha> {
  if (USE_MOCK) return mockCarteirinha;
  return request<Carteirinha>("/associado/carteirinha");
}

export async function minhasFaturas(): Promise<Fatura[]> {
  if (USE_MOCK) return mockFaturas;
  return request<Fatura[]>("/associado/faturas");
}

export async function meuContrato(): Promise<Contrato> {
  if (USE_MOCK) return mockContrato;
  return request<Contrato>("/associado/contrato");
}

export async function meusBeneficios(): Promise<Beneficio[]> {
  if (USE_MOCK) return mockBeneficios;
  return request<Beneficio[]>("/associado/beneficios");
}
