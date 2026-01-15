import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIndustries } from "@/hooks/useIndustries";
import { useCompanies } from "@/hooks/useCompanies";
import {
  Building2,
  Laptop,
  Fuel,
  Briefcase,
  HardHat,
  Shirt,
  Sun,
  Pill,
  Apple,
  Ship,
  Film,
  Hammer,
  Heart,
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

export function IndustriesSection() {
  const { data: industries = [] } = useIndustries();
  const { data: companies = [] } = useCompanies();

  const getCompanyCount = (industryId: string) => {
    return companies.filter((c) => c.industry_id === industryId).length;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-8xl text-foreground mb-4">
            Diverse <span className="text-accent">Industries</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our portfolio spans across multiple sectors, each driven by expertise and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = iconMap[industry.icon || "building"] || Building2;
            const companyCount = getCompanyCount(industry.id);

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/companies?industry=${industry.id}`}
                  className="block p-6 rounded-lg bg-card border border-border hover:border-accent hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-1">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {companyCount} {companyCount === 1 ? "company" : "companies"}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/companies">
              View All Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

