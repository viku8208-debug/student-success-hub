import { Link, useLocation } from "react-router-dom";
import { Heart, Calculator, CalendarDays, Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/mental-health", label: "Mental Health", icon: Heart },
  { to: "/financial-aid", label: "Financial Aid", icon: Calculator },
  { to: "/exam-calendar", label: "Exam Calendar", icon: CalendarDays },
  { to: "/career-lab", label: "Career Lab", icon: Briefcase },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">SS</span>
            </div>
            <span className="text-lg font-bold text-foreground">StudentSathi</span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className="hidden gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <nav className="border-t bg-card px-4 py-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-card py-4 text-center text-xs text-muted-foreground">
        StudentSathi © 2026 — Built for Indian Students 🇮🇳
      </footer>
    </div>
  );
};

export default AppLayout;
