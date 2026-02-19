import { motion } from "framer-motion";

const techs = [
  "ARKit", "ARCore", "Computer Vision", "3D Rendering",
  "Machine Learning", "QR Integration", "Edge ML", "WebXR",
];

const TechStack = () => {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8 font-display tracking-widest uppercase"
        >
          Core Technologies
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-full glass text-sm text-muted-foreground font-display hover:text-primary hover:border-primary/30 transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
