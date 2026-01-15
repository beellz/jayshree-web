import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ArrowRight, Calendar, Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIndustries } from "@/hooks/useIndustries";
import { useCompanies } from "@/hooks/useCompanies";
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

const Companies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedIndustry = searchParams.get("industry") || "all";

  const { data: industries = [] } = useIndustries();
  const { data: companies = [] } = useCompanies();

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === "all" || company.industry_id === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [companies, searchQuery, selectedIndustry]);

  const handleIndustryChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("industry");
    } else {
      searchParams.set("industry", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6">
              Our Group <span className="text-gradient">Companies</span>
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Explore our diverse portfolio of {companies.length} companies across {industries.length} industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No companies found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => {
                const Icon = company.industries?.icon 
                  ? iconMap[company.industries.icon] || Building2 
                  : Building2;

                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/companies/${company.slug}`}
                      className="block bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent transition-colors">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>

                      <h3 className="font-display text-lg text-foreground mb-2 line-clamp-2">
                        {company.name}
                      </h3>

                      {company.industries && (
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-accent/10 text-accent mb-4">
                          {company.industries.name}
                        </span>
                      )}

                      <div className="space-y-2 text-sm text-muted-foreground">
                        {company.incorporation_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Inc. {new Date(company.incorporation_date).getFullYear()}</span>
                          </div>
                        )}
                        {company.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{company.email}</span>
                          </div>
                        )}
                        {company.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{company.phone}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Companies;
