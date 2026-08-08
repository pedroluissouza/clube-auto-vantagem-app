import { supabase } from "./client";
import type {
  Profile,
  Subscription,
  Wallet,
  CreditTransaction,
  Project,
  GenerationJob,
  GenerationResult,
  NotificationRecord,
} from "./types";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar profile:", error.message);
    return null;
  }
  return data;
}

export async function fetchSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar subscription:", error.message);
    return null;
  }
  return data;
}

export async function fetchWallet(userId: string): Promise<Wallet | null> {
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar wallet:", error.message);
    return null;
  }
  return data;
}

export async function fetchCreditTransactions(userId: string): Promise<CreditTransaction[]> {
  const { data, error } = await supabase
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar transações de crédito:", error.message);
    return [];
  }
  return data || [];
}

export async function fetchProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar projetos:", error.message);
    return [];
  }
  return data || [];
}

export async function fetchGenerationJobs(userId: string): Promise<GenerationJob[]> {
  const { data, error } = await supabase
    .from("generation_jobs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar jobs de geração:", error.message);
    return [];
  }
  return data || [];
}

export async function fetchGenerationResults(userId: string): Promise<GenerationResult[]> {
  const { data, error } = await supabase
    .from("generation_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar resultados de geração:", error.message);
    return [];
  }
  return data || [];
}

export async function fetchNotifications(userId: string): Promise<NotificationRecord[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar notificações:", error.message);
    return [];
  }
  return data || [];
}

export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  const { error } = await (supabase.from("notifications" as any) as any)
    .update({ read: true })
    .eq("id", notificationId);




  if (error) {
    console.error("Erro ao marcar notificação como lida:", error.message);
    return false;
  }
  return true;
}
