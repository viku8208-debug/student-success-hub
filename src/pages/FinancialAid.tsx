import { useState } from "react";
import { IndianRupee, GraduationCap, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const scholarships = [
  {
    name: "PM-YASHASVI",
    amount: "₹75,000 – ₹1,25,000/year",
    eligibility: "OBC, EBC, DNT students; family income < ₹2.5 LPA",
    details: "Covers tuition, hostel, and maintenance. Apply via National Scholarship Portal (NSP).",
  },
  {
    name: "Bihar Post Matric Scholarship",
    amount: "Varies by course",
    eligibility: "BC, EBC, SC, ST students domiciled in Bihar",
    details: "Covers tuition fees and maintenance allowance for post-matric studies. Apply via Bihar state portal.",
  },
  {
    name: "PM-Vidyalaxmi (3% Interest Subvention)",
    amount: "3% interest subsidy on education loans",
    eligibility: "Students from families with income < ₹8 LPA; loan up to ₹10 lakh",
    details: "Government pays 3% of the interest on your education loan. Available at nationalized banks.",
  },
];

const FinancialAid = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [interest, setInterest] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);
    if (!isNaN(p) && !isNaN(r) && !isNaN(n)) {
      setInterest(p * r * n);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">💰 Financial Aid Navigator</h1>
        <p className="mt-1 text-muted-foreground">Find scholarships and calculate your loan costs.</p>
      </div>

      {/* Scholarships */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap size={20} className="text-primary" /> Scholarships & Schemes
        </h2>
        <div className="space-y-3">
          {scholarships.map((s, i) => (
            <Card key={i} className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <IndianRupee size={14} className="text-primary" />
                  <span className="text-sm font-semibold text-primary">{s.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground"><strong>Eligibility:</strong> {s.eligibility}</p>
                <p className="text-sm text-muted-foreground">{s.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Loan Calculator */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Calculator size={20} className="text-primary" /> Loan Interest Calculator
        </h2>
        <Card className="shadow-card">
          <CardContent className="pt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Simple Interest: <strong>I = P × r × n</strong></p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="principal" className="text-xs">Principal (₹)</Label>
                <Input id="principal" type="number" placeholder="e.g. 500000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="rate" className="text-xs">Rate (%/year)</Label>
                <Input id="rate" type="number" placeholder="e.g. 8.5" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="years" className="text-xs">Duration (years)</Label>
                <Input id="years" type="number" placeholder="e.g. 4" value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
            </div>
            <Button onClick={calculate} className="w-full sm:w-auto">Calculate Interest</Button>
            {interest !== null && (
              <div className="space-y-3">
                <div className="rounded-lg bg-accent p-4">
                  <p className="text-sm text-muted-foreground">Total Interest Payable</p>
                  <p className="text-2xl font-bold text-primary">₹{interest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Repayment: ₹{(parseFloat(principal) + interest).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                {parseFloat(rate) > 3 && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-primary">💡 PM-Vidyalaxmi Savings</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      With PM-Vidyalaxmi's 3% interest subvention, your effective rate drops to {(parseFloat(rate) - 3).toFixed(1)}%.
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-bold text-primary">You save ₹{(parseFloat(principal) * 0.03 * parseFloat(years)).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                      <span className="text-muted-foreground"> on interest!</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Example: On a ₹10L loan at 8% for 4 years, you save ₹1,20,000 with PM-Vidyalaxmi.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FinancialAid;
