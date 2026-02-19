import { motion } from "framer-motion";
import { Scan, User, ShoppingBag, Sparkles } from "lucide-react";
import tryonPreview from "@/assets/tryon-preview.jpg";

const steps = [
  {
    icon: ShoppingBag,
    title: "Browse & Select",
    description: "Find your item on any partnered e-commerce site and tap the AR icon.",
  },
  {
    icon: Scan,
    title: "Body Scan",
    description: "AI analyzes your body shape and measurements in real-time through the camera.",
  },
  {
    icon: User,
    title: "Virtual Try-On",
    description: "See a realistic 3D model of the clothing mapped onto your body with AR.",
  },
  {
    icon: Sparkles,
    title: "AI Styling",
    description: "Get personalized size recommendations and styling suggestions instantly.",
  },
];

const VirtualTryOn = () => {
  return (
    <section className="py-24 relative" id="try-on">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-display tracking-widest uppercase">
            Virtual Try-On
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Wear It <span className="text-gradient-primary">Virtually</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            AI-powered body scanning meets augmented reality for the ultimate online shopping experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-[280px] h-[560px] rounded-[2.5rem] glass-strong overflow-hidden gradient-border glow-primary">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-background rounded-b-2xl z-10" />
              {/* Screen content */}
              <img
                src={tryonPreview}
                alt="Virtual Try-On Preview"
                className="w-full h-full object-cover"
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary/60 animate-scan-line rounded-full blur-sm" />
              </div>
              {/* AR UI overlay */}
              <div className="absolute bottom-6 left-4 right-4 glass rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-xs text-primary font-display">Body Scan Active</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Size: M</span>
                  <span>Fit: 96%</span>
                  <span>Style: Match</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4 p-4 rounded-xl glass group hover:glow-primary transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTryOn;
