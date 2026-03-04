import { BookOpen, ExternalLink, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    name: "SWAYAM",
    desc: "Free online courses from IITs, IIMs, and top universities. Covers engineering, humanities, science, and more.",
    link: "https://swayam.gov.in",
  },
  {
    name: "NPTEL",
    desc: "Video lectures and course materials from IIT & IISc professors. Ideal for engineering and science students.",
    link: "https://nptel.ac.in",
  },
  {
    name: "e-Pathshala (NCERT)",
    desc: "Free NCERT textbooks, audio, video, and flipbooks in Hindi and English. Class 1 to 12.",
    link: "https://epathshala.nic.in",
  },
  {
    name: "DIKSHA",
    desc: "QR-code based learning platform by Govt. of India. Works offline after initial download.",
    link: "https://diksha.gov.in",
  },
];

const Resources = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">📚 Free Resources</h1>
        <p className="mt-1 text-muted-foreground">Government-backed learning platforms — free, lightweight, and accessible offline.</p>
      </div>

      <div className="rounded-lg bg-accent px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
          <Wifi size={16} /> All platforms below work on low-bandwidth connections and most support offline access.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {resources.map((r, i) => (
          <Card key={i} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen size={16} className="text-primary" /> {r.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{r.desc}</p>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Visit {r.name} <ExternalLink size={12} />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;
