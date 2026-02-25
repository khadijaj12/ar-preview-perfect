import { motion } from "framer-motion";
import { Brain, Ruler, Palette, Sun, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Ruler,
    title: "Smart Size Detection",
    description: "AI analyzes body measurements through the camera for accurate size recommendations.",
  },
  {
    icon: Palette,
    title: "Style Combinations",
    description: "Get intelligent outfit suggestions based on the item you're viewing and current trends.",
  },
  {
    icon: Sun,
    title: "Lighting Adaptation",
    description: "AR adjusts to real-world lighting conditions for the most realistic product visualization.",
  },
  {
    icon: Brain,
    title: "Learning Engine",
    description: "The AI improves with every interaction, personalizing suggestions to your preferences.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All body scanning data is processed on-device. Nothing is stored or shared.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Edge ML models deliver sub-second AR rendering for seamless real-time previews.",
  },
];

const AIFeatures = () => {
  return (
    <section className="py-24 relative" id="ai">
      <div className="absolute inset-0 ar-grid opacity-20" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">
            AI Intelligence
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Powered by <span className="gold-shimmer">AI</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            Machine learning and computer vision work together to deliver hyper-realistic previews.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl glass hover:glow-primary transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
