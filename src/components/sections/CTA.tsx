"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-primary text-primary-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Report a Cybercrime?</h2>
        <p className="text-primary-foreground/80 mb-8">
          Don&apos;t let cybercriminals get away. Take action now and help make the internet safer for everyone.
        </p>
        <Button variant="secondary" size="lg" className="rounded-full">
          Start Your Report Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
