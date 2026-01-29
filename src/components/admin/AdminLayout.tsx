import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { user, loading, isAdmin, adminCheckComplete } = useAuth();

  // Show loading while checking auth or admin role
  if (loading || (user && !adminCheckComplete)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to admin login if not authenticated
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // Redirect to home if not admin (only after admin check is complete)
  if (adminCheckComplete && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
