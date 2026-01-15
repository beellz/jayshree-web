import { motion } from "framer-motion";
import { Target, Eye, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To build a diversified portfolio of companies that deliver exceptional value, foster innovation, and contribute to sustainable development across multiple industries.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be recognized as a leading conglomerate that shapes industries, empowers communities, and sets benchmarks for corporate excellence in India and beyond.",
  },
  {
    icon: Shield,
    title: "Our Values",
    description: "Integrity, Innovation, Excellence, and Sustainability form the cornerstone of everything we do. We believe in ethical business practices and long-term value creation.",
  },
];

export function AboutSection() {
  return (
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
            About <span className="text-accent">Jayashri Group</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Founded with a vision to create lasting impact, Jayashri Group has grown into a 
            multi-industry conglomerate with a portfolio spanning construction, technology, 
            healthcare, renewable energy, and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
