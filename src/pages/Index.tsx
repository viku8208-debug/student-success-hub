import { Link } from "react-router-dom";
import { Heart, Calculator, CalendarDays, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  {
    to: "/mental-health",
    icon: Heart,
    title: "Mental Health Sanctuary",
    desc: "24/7 helplines, peer mentorship, and self-care resources.",
    emoji: "🧠",
  },
  {
    to: "/financial-aid",
    icon: Calculator,
    title: "Financial Aid Navigator",
    desc: "Scholarships, govt schemes, and a loan interest calculator.",
    emoji: "💰",
  },
  {
    to: "/exam-calendar",
    icon: CalendarDays,
    title: "Exam Calendar 2026",
    desc: "JEE, NEET, UPSC dates with preparation tips.",
    emoji: "📅",
  },
  {
    to: "/career-lab",
    icon: Briefcase,
    title: "Career Lab",
    desc: "High-growth roles, required skills, and career paths.",
    emoji: "🚀",
  },
];

const Index = () => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-2xl gradient-hero px-6 py-12 text-center md:py-16">
        <h1 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
          StudentSathi
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/80 md:text-base">
          Your complete support platform — mental health, scholarships, exam prep, and career guidance for every Indian student.
        </p>
      </section>

      {/* Module Cards */}
      <section className="grid gap-4 sm:grid-cols-2">
        {modules.map((m) => (
          <Link key={m.to} to={m.to} className="group">
            <Card className="h-full shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5">
              <CardContent className="flex items-start gap-4 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-primary text-lg">
                  {m.emoji}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold group-hover:text-primary transition-colors">{m.title}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{m.desc}</p>
                </div>
                <ArrowRight size={18} className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Quick Info */}
      <section className="rounded-xl border bg-card p-5 shadow-card text-center">
        <p className="text-sm text-muted-foreground">
          🇮🇳 Designed for Indian students · Low-bandwidth friendly · No login required
        </p>
      </section>
    </div>
  );
};

export default Index;
