import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSession, subscribeToAuthChanges, signOut as supabaseSignOut } from "@/lib/supabase/auth";
import {
  fetchProfile,
  fetchSubscription,
  fetchWallet,
  fetchProjects,
  fetchGenerationJobs,
  fetchGenerationResults,
  fetchNotifications,
  fetchCreditTransactions,
} from "@/lib/supabase/queries";
import { setupRealtimeSubscriptions } from "@/lib/supabase/realtime";
import type {
  Profile,
  Subscription,
  Wallet,
  Project,
  GenerationJob,
  GenerationResult,
  NotificationRecord,
  CreditTransaction,
} from "@/lib/supabase/types";

export type ConnectionStatus = "connected" | "connecting" | "reconnecting" | "offline" | "error";

interface SupabaseContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  wallet: Wallet | null;
  transactions: CreditTransaction[];
  projects: Project[];
  jobs: GenerationJob[];
  results: GenerationResult[];
  notifications: NotificationRecord[];
  
  // Connection & UI states
  loading: boolean;
  empty: boolean;
  error: string | null;
  isOffline: boolean;
  connectionStatus: ConnectionStatus;
  
  // Actions
  refreshData: () => Promise<void>;
  logout: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== "undefined" ? !navigator.onLine : false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");

  // Track online / offline browser status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setConnectionStatus("connected");
    };
    const handleOffline = () => {
      setIsOffline(true);
      setConnectionStatus("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch all user data in parallel
  const loadUserData = useCallback(async (userId: string) => {
    try {
      setError(null);
      const [
        profileRes,
        subRes,
        walletRes,
        txRes,
        projRes,
        jobsRes,
        resRes,
        notifRes,
      ] = await Promise.all([
        fetchProfile(userId),
        fetchSubscription(userId),
        fetchWallet(userId),
        fetchCreditTransactions(userId),
        fetchProjects(userId),
        fetchGenerationJobs(userId),
        fetchGenerationResults(userId),
        fetchNotifications(userId),
      ]);

      setProfile(profileRes);
      setSubscription(subRes);
      setWallet(walletRes);
      setTransactions(txRes);
      setProjects(projRes);
      setJobs(jobsRes);
      setResults(resRes);
      setNotifications(notifRes);
      setConnectionStatus("connected");
    } catch (err: any) {
      console.error("Erro ao carregar dados do usuário:", err);
      setError(err?.message || "Falha ao carregar dados do usuário");
      setConnectionStatus("error");
    }
  }, []);

  // Initial startup flow
  useEffect(() => {
    let unsubscribeRealtime: (() => void) | null = null;

    async function init() {
      setLoading(true);
      const currentSession = await getSession();
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await loadUserData(currentUser.id);

        // Register Realtime listeners
        unsubscribeRealtime = setupRealtimeSubscriptions(currentUser.id, {
          onWalletChange: (payload) => {
            if (payload.new) {
              setWallet(payload.new);
            }
          },
          onJobChange: (payload) => {
            if (payload.new) {
              setJobs((prev) => {
                const idx = prev.findIndex((j) => j.id === payload.new.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = payload.new;
                  return updated;
                }
                return [payload.new, ...prev];
              });
            }
          },
          onResultChange: (payload) => {
            if (payload.new) {
              setResults((prev) => [payload.new, ...prev.filter((r) => r.id !== payload.new.id)]);
            }
          },
          onProjectChange: (payload) => {
            if (payload.new) {
              setProjects((prev) => {
                const idx = prev.findIndex((p) => p.id === payload.new.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = payload.new;
                  return updated;
                }
                return [payload.new, ...prev];
              });
            }
          },
          onProfileChange: (payload) => {
            if (payload.new) setProfile(payload.new);
          },
          onSubscriptionChange: (payload) => {
            if (payload.new) setSubscription(payload.new);
          },
          onNotificationChange: (payload) => {
            if (payload.new) {
              setNotifications((prev) => [payload.new, ...prev.filter((n) => n.id !== payload.new.id)]);
            }
          },
          onStatusChange: (status) => {
            if (status === "SUBSCRIBED") {
              setConnectionStatus("connected");
            } else if (status === "CLOSED" || status === "TIMED_OUT") {
              setConnectionStatus("reconnecting");
            } else if (status === "CHANNEL_ERROR") {
              setConnectionStatus("error");
            }
          },
        });
      }
      setLoading(false);
    }

    init();

    // Listen to Auth state changes
    const authSub = subscribeToAuthChanges(async (event, newSession) => {
      setSession(newSession);
      const newUser = newSession?.user ?? null;
      setUser(newUser);

      if (event === "SIGNED_IN" && newUser) {
        setLoading(true);
        await loadUserData(newUser.id);

        if (unsubscribeRealtime) unsubscribeRealtime();
        unsubscribeRealtime = setupRealtimeSubscriptions(newUser.id, {
          onWalletChange: (p) => p.new && setWallet(p.new),
          onJobChange: (p) => {
            if (p.new) {
              setJobs((prev) => {
                const idx = prev.findIndex((j) => j.id === p.new.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = p.new;
                  return updated;
                }
                return [p.new, ...prev];
              });
            }
          },
          onResultChange: (p) => p.new && setResults((prev) => [p.new, ...prev.filter((r) => r.id !== p.new.id)]),
          onProjectChange: (p) => p.new && setProjects((prev) => [p.new, ...prev.filter((proj) => proj.id !== p.new.id)]),
          onProfileChange: (p) => p.new && setProfile(p.new),
          onSubscriptionChange: (p) => p.new && setSubscription(p.new),
          onNotificationChange: (p) => p.new && setNotifications((prev) => [p.new, ...prev.filter((n) => n.id !== p.new.id)]),
          onStatusChange: (status) => {
            if (status === "SUBSCRIBED") setConnectionStatus("connected");
            else if (status === "CLOSED" || status === "TIMED_OUT") setConnectionStatus("reconnecting");
            else if (status === "CHANNEL_ERROR") setConnectionStatus("error");
          },
        });
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        if (unsubscribeRealtime) unsubscribeRealtime();
        setProfile(null);
        setSubscription(null);
        setWallet(null);
        setTransactions([]);
        setProjects([]);
        setJobs([]);
        setResults([]);
        setNotifications([]);
      }
    });

    return () => {
      authSub.unsubscribe();
      if (unsubscribeRealtime) unsubscribeRealtime();
    };
  }, [loadUserData]);

  const refreshData = async () => {
    if (user) {
      setLoading(true);
      await loadUserData(user.id);
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabaseSignOut();
  };

  const empty = projects.length === 0 && jobs.length === 0 && notifications.length === 0;

  return (
    <SupabaseContext.Provider
      value={{
        session,
        user,
        profile,
        subscription,
        wallet,
        transactions,
        projects,
        jobs,
        results,
        notifications,
        loading,
        empty,
        error,
        isOffline,
        connectionStatus,
        refreshData,
        logout,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase deve ser utilizado dentro de um SupabaseProvider");
  }
  return context;
}
