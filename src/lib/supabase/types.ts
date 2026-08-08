export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GenerationStatus = "pending" | "processing" | "completed" | "failed";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "unpaid";
export type TransactionType = "credit" | "debit" | "refund" | "bonus";

export interface Profile {
  id: string; // matches auth.uid()
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Subscription {
  id: string;
  user_id: string; // auth.uid()
  plan_name: string;
  status: SubscriptionStatus;
  amount: number;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string; // auth.uid()
  balance: number;
  currency: string;
  updated_at: string;
}

export interface CreditTransaction {
  id: string;
  wallet_id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FileRecord {
  id: string;
  user_id: string;
  project_id: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

export interface GenerationJob {
  id: string;
  user_id: string;
  project_id: string | null;
  status: GenerationStatus;
  prompt: string;
  parameters: Json | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface GenerationResult {
  id: string;
  job_id: string;
  user_id: string;
  result_type: string;
  url: string;
  metadata: Json | null;
  created_at: string;
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: {
          id?: string;
          user_id: string;
          plan_name: string;
          status: SubscriptionStatus;
          amount: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_name?: string;
          status?: SubscriptionStatus;
          amount?: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      wallets: {
        Row: Wallet;
        Insert: {
          id?: string;
          user_id: string;
          balance?: number;
          currency?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          balance?: number;
          currency?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      credit_transactions: {
        Row: CreditTransaction;
        Insert: {
          id?: string;
          wallet_id: string;
          user_id: string;
          amount: number;
          type: TransactionType;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          wallet_id?: string;
          user_id?: string;
          amount?: number;
          type?: TransactionType;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      files: {
        Row: FileRecord;
        Insert: {
          id?: string;
          user_id: string;
          project_id?: string | null;
          file_name: string;
          file_path: string;
          file_size: number;
          mime_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          project_id?: string | null;
          file_name?: string;
          file_path?: string;
          file_size?: number;
          mime_type?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      generation_jobs: {
        Row: GenerationJob;
        Insert: {
          id?: string;
          user_id: string;
          project_id?: string | null;
          status?: GenerationStatus;
          prompt: string;
          parameters?: Json | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          project_id?: string | null;
          status?: GenerationStatus;
          prompt?: string;
          parameters?: Json | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      generation_results: {
        Row: GenerationResult;
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          result_type: string;
          url: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          user_id?: string;
          result_type?: string;
          url?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: NotificationRecord;
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      generation_status: GenerationStatus;
      subscription_status: SubscriptionStatus;
      transaction_type: TransactionType;
    };
    CompositeTypes: Record<string, never>;
  };
}
