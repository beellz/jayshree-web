import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Calendar, Mail, Phone, FileText, 
  Building2, Laptop, Fuel, Briefcase, HardHat, Shirt, 
  Sun, Pill, Apple, Ship, Film, Hammer, Heart,
  MapPin, Globe
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompanies";
import { Skeleton } from "@/components/ui/skeleton";

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

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: company, isLoading } = useCompany(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Company Not Found</h1>
            <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/companies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Companies
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const Icon = company.industries?.icon 
    ? iconMap[company.industries.icon] || Building2 
    : Building2;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/companies" 
              className="inline-flex items-center text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Companies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Icon className="w-10 h-10 text-accent" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-3xl md:text-4xl text-primary-foreground mb-2">
                {company.name}
              </h1>
              {company.industries && (
                <span className="inline-block text-sm px-3 py-1 rounded-full bg-accent/20 text-accent">
                  {company.industries.name}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description || 
                    `${company.name} is a proud member of the Jayashri Group of Companies, 
                    operating in the ${company.industries?.name || "business"} sector. 
                    As part of our diversified conglomerate, we are committed to delivering 
                    excellence and creating value for all our stakeholders.`}
                </p>
              </motion.div>

              {/* Services */}
              {company.services && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="font-display text-xl text-foreground mb-4">Services</h2>
                  <p className="text-muted-foreground leading-relaxed">{company.services}</p>
                </motion.div>
              )}

              {/* Legal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-4">Legal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {company.cin && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">CIN Number</p>
                        <p className="text-foreground font-mono text-sm">{company.cin}</p>
                      </div>
                    </div>
                  )}
                  {company.incorporation_date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Incorporation Date</p>
                        <p className="text-foreground">
                          {new Date(company.incorporation_date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Contact Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-display text-xl text-foreground mb-4">Contact</h2>
                <div className="space-y-4">
                  {company.email && (
                    <a 
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Mail className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm break-all">{company.email}</span>
                    </a>
                  )}
                  {company.phone && (
                    <a 
                      href={`tel:${company.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Phone className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm">{company.phone}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm">Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h3 className="font-display text-lg text-foreground mb-2">
                  Interested in working with us?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get in touch to explore partnership opportunities.
                </p>
                <Button asChild className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyDetail;
