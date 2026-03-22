import { useNavigate } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl mb-4" style={{ color: "var(--violet)" }}>
          404
        </h1>
        <h2 className="text-3xl mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg text-white flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          style={{ background: "var(--violet)" }}
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
