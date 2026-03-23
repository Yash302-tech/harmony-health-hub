import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground font-body animate-pulse">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
