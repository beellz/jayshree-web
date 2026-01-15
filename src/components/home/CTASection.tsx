import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 gradient-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">Ready to Partner with Us?</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Whether you're looking for career opportunities, business partnerships, or investment prospects, we'd love
            to hear from you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/careers">
                View Careers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/70">
            <a href="tel:+919960002836" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              +91 9960002836
            </a>
            <a
              href="mailto:info@jayashrigroup.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@jayashrigroup.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
