import React from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";

export function ConnectionBanner() {
  const { isOffline, connectionStatus, error } = useSupabase();

  if (isOffline) {
    return (
      <div className="bg-amber-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-2 animate-in fade-in">
        <WifiOff size={16} />
        <span>Você está offline. Os dados exibidos podem estar desatualizados.</span>
      </div>
    );
  }

  if (connectionStatus === "reconnecting") {
    return (
      <div className="bg-cyan-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-2 animate-in fade-in">
        <RefreshCw size={16} className="animate-spin" />
        <span>Reconectando ao Supabase Realtime...</span>
      </div>
    );
  }

  if (connectionStatus === "error" && error) {
    return (
      <div className="bg-red-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-2 animate-in fade-in">
        <AlertTriangle size={16} />
        <span>Erro de conexão com o Supabase: {error}</span>
      </div>
    );
  }

  return null;
}
