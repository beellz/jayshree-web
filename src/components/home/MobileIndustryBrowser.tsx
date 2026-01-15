import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { useIndustries, Industry } from "@/hooks/useIndustries";
import { useCompanies, Company } from "@/hooks/useCompanies";
import { 
  Building2, Laptop, Fuel, Briefcase, HardHat, Shirt, 
  Sun, Pill, Apple, Ship, Film, Hammer, Heart 
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  laptop: Laptop,
  fuel: Fuel,
  briefcase: Briefcase,
  building: HardHat,
  shirt: Shirt,
  sun: Sun,
  pill: Pill,
  apple: Apple,
  ship: Ship,
  film: Film,
  hammer: Hammer,
};

export function MobileIndustryBrowser() {
  const navigate = useNavigate();
  const { data: industries = [] } = useIndustries();
  const { data: companies = [] } = useCompanies();
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  const getCompaniesForIndustry = (industryId: string) => {
    return companies.filter((c) => c.industry_id === industryId);
  };

  return (
    <div className="space-y-3">
      {industries.map((industry) => {
        const Icon = iconMap[industry.icon || "building"] || Building2;
        const industryCompanies = getCompaniesForIndustry(industry.id);
        const isExpanded = expandedIndustry === industry.id;

        return (
          <div
            key={industry.id}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <button
              onClick={() => setExpandedIndustry(isExpanded ? null : industry.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {industryCompanies.length} {industryCompanies.length === 1 ? "company" : "companies"}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border"
                >
                  <div className="p-2">
                    {industryCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => navigate(`/companies/${company.slug}`)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors group"
                      >
                        <span className="text-sm text-foreground">{company.name}</span>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
