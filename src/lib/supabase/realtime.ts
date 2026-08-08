import { supabase } from "./client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type {
  Wallet,
  GenerationJob,
  GenerationResult,
  Project,
  Profile,
  Subscription,
  NotificationRecord,
} from "./types";

export interface RealtimeHandlers {
  onWalletChange?: (payload: { new: Wallet; old: Partial<Wallet> }) => void;
  onJobChange?: (payload: { new: GenerationJob; old: Partial<GenerationJob> }) => void;
  onResultChange?: (payload: { new: GenerationResult; old: Partial<GenerationResult> }) => void;
  onProjectChange?: (payload: { new: Project; old: Partial<Project> }) => void;
  onProfileChange?: (payload: { new: Profile; old: Partial<Profile> }) => void;
  onSubscriptionChange?: (payload: { new: Subscription; old: Partial<Subscription> }) => void;
  onNotificationChange?: (payload: { new: NotificationRecord; old: Partial<NotificationRecord> }) => void;
  onStatusChange?: (status: "SUBSCRIBED" | "CLOSED" | "CHANNEL_ERROR" | "TIMED_OUT") => void;
}

export function setupRealtimeSubscriptions(userId: string, handlers: RealtimeHandlers): () => void {
  if (!userId) return () => {};

  const channelName = `user-sync-${userId}-${Date.now()}`;
  const channel: RealtimeChannel = supabase.channel(channelName);

  // Wallets
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "wallets", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onWalletChange && payload.new) {
        handlers.onWalletChange(payload as any);
      }
    }
  );

  // Generation Jobs
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "generation_jobs", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onJobChange && payload.new) {
        handlers.onJobChange(payload as any);
      }
    }
  );

  // Generation Results
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "generation_results", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onResultChange && payload.new) {
        handlers.onResultChange(payload as any);
      }
    }
  );

  // Projects
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "projects", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onProjectChange && payload.new) {
        handlers.onProjectChange(payload as any);
      }
    }
  );

  // Profiles
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "profiles", filter: `id=eq.${userId}` },
    (payload) => {
      if (handlers.onProfileChange && payload.new) {
        handlers.onProfileChange(payload as any);
      }
    }
  );

  // Subscriptions
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onSubscriptionChange && payload.new) {
        handlers.onSubscriptionChange(payload as any);
      }
    }
  );

  // Notifications
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
    (payload) => {
      if (handlers.onNotificationChange && payload.new) {
        handlers.onNotificationChange(payload as any);
      }
    }
  );

  channel.subscribe((status) => {
    if (handlers.onStatusChange) {
      handlers.onStatusChange(status as any);
    }
  });

  return () => {
    supabase.removeChannel(channel);
  };
}
