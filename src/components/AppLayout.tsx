import { Link, useLocation } from "react-router-dom";
import { Heart, Calculator, CalendarDays, Briefcase, BookOpen, Menu, X, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
{ to: "/mental-health", label: "Mental Health", icon: Heart },
{ to: "/financial-aid", label: "Financial Aid", icon: Calculator },
{ to: "/exam-calendar", label: "Exam Calendar", icon: CalendarDays },
{ to: "/career-lab", label: "Career Lab", icon: Briefcase },
{ to: "/resources", label: "Resources", icon: BookOpen }];


const AppLayout = ({ children }: {children: React.ReactNode;}) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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
            aria-label="Toggle menu">
            
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden items-center gap-1 md:flex">
            <nav className="flex gap-1">
              {navItems.map((item) =>
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.to ?
                "bg-accent text-accent-foreground" :
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`
                }>
                
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )}
            </nav>
            {user &&
            <Link
              to="/profile"
              className="ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              
                <UserCircle size={16} /> Profile
              </Link>
            }
            {user &&
            <button
              onClick={logout}
              className="ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
              
                <LogOut size={16} /> Logout
              </button>
            }
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen &&
        <nav className="border-t bg-card px-4 py-2 md:hidden">
            {navItems.map((item) =>
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            location.pathname === item.to ?
            "bg-accent text-accent-foreground" :
            "text-muted-foreground hover:bg-accent"}`
            }>
            
                <item.icon size={18} />
                {item.label}
              </Link>
          )}
            {user &&
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent">
                <UserCircle size={18} /> Profile
              </Link>
          }
            {user &&
          <button onClick={() => {logout();setMenuOpen(false);}} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <LogOut size={18} /> Logout
              </button>
          }
          </nav>
        }
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-card py-4 text-center text-xs text-muted-foreground">
        StudentSathi © 2026 — Built for Indian Students 🇮🇳
                  _made with love by Viku_    
                  
                 
                
               
              
             
            
           
          
         
        
 

      </footer>
    </div>);};export default AppLayout;