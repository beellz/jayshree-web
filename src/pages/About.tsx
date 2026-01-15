import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Shield, Award, Users, Leaf, Clock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We conduct our business with the highest standards of ethics and transparency.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, setting industry benchmarks.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We are committed to sustainable practices that benefit communities and the environment.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and building strong partnerships.",
  },
];

const milestones = [
  { year: "2023", event: "Founded Jayashri Group with first company registrations" },
  { year: "2024", event: "Expanded into IT, Construction, and Consultancy sectors" },
  { year: "2025", event: "Rapid growth to 18+ companies across 12 industries" },
  { year: "Future", event: "Continued expansion and innovation across sectors" },
];

const About = () => {
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
              About <span className="text-gradient">Jayashri Group</span>
            </h1>
            <p className="text-lg text-primary-foreground/70">
              A visionary conglomerate dedicated to building businesses that create lasting impact, 
              foster innovation, and drive sustainable growth across multiple industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-lg border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To build a diversified portfolio of companies that deliver exceptional value, 
                foster innovation, and contribute to sustainable development across multiple industries. 
                We aim to be the catalyst for economic growth while maintaining the highest standards 
                of corporate governance and social responsibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-lg border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as a leading conglomerate that shapes industries, empowers communities, 
                and sets benchmarks for corporate excellence in India and beyond. We envision a future 
                where our group companies are synonymous with quality, innovation, and trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Our Core <span className="text-accent">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every action we take.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border border-border text-center hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Our <span className="text-accent">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to a multi-industry conglomerate.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent-foreground" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-accent font-display text-xl font-bold">
                    {milestone.year}
                  </span>
                  <p className="text-foreground mt-2">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">
              Corporate Governance
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed">
              At Jayashri Group, we are committed to maintaining the highest standards of 
              corporate governance. Our board of directors ensures transparency, accountability, 
              and ethical business practices across all our companies. We comply with all 
              regulatory requirements including timely filing of annual returns, maintenance 
              of statutory registers, and adherence to company law provisions.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
