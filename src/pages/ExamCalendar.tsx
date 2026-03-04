import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const exams = [
  {
    name: "JEE Main 2026 — Session 1",
    date: "January 21–30, 2026",
    status: "upcoming" as const,
    details: "B.E./B.Tech, B.Arch, B.Planning entrance. Apply via jeemain.nta.nic.in",
    tip: "Focus on NCERT + previous year papers. Start revision by November 2025.",
  },
  {
    name: "JEE Main 2026 — Session 2",
    date: "April 2026",
    status: "upcoming" as const,
    details: "Second attempt window. Best of two scores considered for JEE Advanced eligibility.",
    tip: "Analyze Session 1 performance. Target weak areas with mock tests.",
  },
  {
    name: "NEET UG 2026",
    date: "May 3, 2026",
    status: "upcoming" as const,
    details: "Single entrance for MBBS, BDS, AYUSH, and Nursing. Pen-and-paper exam.",
    tip: "Biology carries highest weightage. Practice 180 questions in 3 hours.",
  },
  {
    name: "UPSC Prelims 2026",
    date: "Late May 2026 (Tentative)",
    status: "upcoming" as const,
    details: "Civil Services Preliminary Examination — GS Paper I & CSAT.",
    tip: "Read The Hindu daily. Cover Laxmikanth (Polity) and NCERT Geography thoroughly.",
  },
];

const ExamCalendar = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">📅 Exam Calendar 2026</h1>
        <p className="mt-1 text-muted-foreground">Key exam dates at a glance. Plan your preparation wisely.</p>
      </div>

      <div className="space-y-3">
        {exams.map((exam, i) => (
          <Card key={i} className="shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center gap-3 gradient-primary px-4 py-3 sm:w-52 sm:flex-col sm:justify-center sm:gap-1">
                  <CalendarDays size={18} className="text-primary-foreground" />
                  <span className="text-sm font-bold text-primary-foreground">{exam.date}</span>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{exam.name}</h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{exam.details}</p>
                  <div className="rounded-md bg-accent px-3 py-2">
                    <p className="text-xs font-medium text-accent-foreground">💡 Tip: {exam.tip}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamCalendar;
