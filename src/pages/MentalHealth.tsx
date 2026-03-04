import { Phone, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const phases = [
  { name: "Phase 1: Preparing", desc: "Mentor and mentee are matched based on needs, interests, and goals. Initial training is provided." },
  { name: "Phase 2: Negotiating", desc: "Both parties set expectations, boundaries, communication frequency, and shared goals." },
  { name: "Phase 3: Growth", desc: "Active mentorship phase — regular check-ins, skill-building, emotional support, and guidance." },
  { name: "Phase 4: Closure", desc: "Reflecting on achievements, feedback exchange, and transitioning the mentee toward independence." },
];

const MentalHealth = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">🧠 Mental Health Sanctuary</h1>
        <p className="mt-1 text-muted-foreground">Your safe space. Help is always available — you are not alone.</p>
      </div>

      {/* Helplines */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Phone size={20} className="text-primary" /> 24/7 Helplines
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tele-MANAS</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:14416" className="text-2xl font-bold text-primary hover:underline">14416</a>
              <p className="mt-1 text-sm text-muted-foreground">Free, 24/7 mental health helpline by Govt. of India. Available in multiple languages.</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">NIMHANS</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:08046110007" className="text-2xl font-bold text-primary hover:underline">080-46110007</a>
              <p className="mt-1 text-sm text-muted-foreground">National Institute of Mental Health and Neuro-Sciences, Bangalore. Expert counselling.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Peer Mentorship */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Users size={20} className="text-primary" /> 4-Phase Peer Mentorship Program
        </h2>
        <p className="text-sm text-muted-foreground">A structured framework to connect juniors with senior mentors for academic and emotional support.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {phases.map((phase, i) => (
            <Card key={i} className="shadow-card">
              <CardContent className="pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-sm">{phase.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section>
        <Card className="border-primary/20 bg-accent shadow-card">
          <CardContent className="flex items-start gap-3 pt-4">
            <ShieldCheck size={24} className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-sm">Quick Self-Care Tips</p>
              <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground space-y-1">
                <li>Take 5-minute breathing breaks between study sessions</li>
                <li>Stay hydrated and maintain a sleep schedule</li>
                <li>Talk to a friend, family member, or counsellor regularly</li>
                <li>Limit social media to 30 minutes daily during exam season</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default MentalHealth;
