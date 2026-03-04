import { Briefcase, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const careers = [
  {
    role: "AI/ML Engineer",
    skills: ["Python", "PyTorch", "TensorFlow", "Statistics"],
    growth: "High",
    salary: "₹8–30 LPA",
    path: "B.Tech CS/AI → Online certifications → Internship → Full-time",
  },
  {
    role: "Cybersecurity Specialist",
    skills: ["Networking", "Linux", "Ethical Hacking", "SIEM"],
    growth: "Very High",
    salary: "₹6–25 LPA",
    path: "B.Tech CS/IT → CEH/CompTIA → SOC Analyst → Specialist",
  },
  {
    role: "Data Scientist",
    skills: ["Python", "SQL", "Machine Learning", "Tableau"],
    growth: "High",
    salary: "₹7–28 LPA",
    path: "B.Tech/BSc Stats → Kaggle/Projects → Internship → Full-time",
  },
  {
    role: "Cloud Architect",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
    growth: "High",
    salary: "₹10–35 LPA",
    path: "B.Tech CS → Cloud certifications → DevOps role → Architect",
  },
  {
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    growth: "Steady",
    salary: "₹5–22 LPA",
    path: "B.Tech/BCA → Portfolio projects → Freelance/Intern → Full-time",
  },
  {
    role: "Product Manager",
    skills: ["Analytics", "UX Research", "Communication", "SQL"],
    growth: "High",
    salary: "₹10–35 LPA",
    path: "Engineering/MBA → APM programs → PM → Senior PM",
  },
];

const CareerLab = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">🚀 Career Lab</h1>
        <p className="mt-1 text-muted-foreground">Explore high-growth career paths and the skills you need.</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="rounded-lg border shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent">
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Key Skills</TableHead>
                <TableHead className="font-semibold">Growth</TableHead>
                <TableHead className="font-semibold">Salary Range</TableHead>
                <TableHead className="font-semibold">Career Path</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{c.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary">
                      <TrendingUp size={14} /> {c.growth}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{c.salary}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px]">{c.path}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {careers.map((c, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 shadow-card space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{c.role}</h3>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp size={12} /> {c.growth}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {c.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Salary</span>
              <span className="font-medium">{c.salary}</span>
            </div>
            <p className="text-xs text-muted-foreground">{c.path}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerLab;
