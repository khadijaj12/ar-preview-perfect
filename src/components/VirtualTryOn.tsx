import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Camera, Scan, Sparkles, ArrowRight, Ruler } from "lucide-react";
import tryonPreview from "@/assets/tryon-preview.jpg";
import ARTryOnView from "@/components/ARTryOnView";

const steps = [
  {
    icon: QrCode,
    title: "Scan QR Code",
    description: "Scan the QR code on the product tag or website to begin.",
  },
  {
    icon: Camera,
    title: "Camera Opens",
    description: "Your phone camera activates with AR overlay and body detection.",
  },
  {
    icon: Scan,
    title: "Body Scan",
    description: "AI scans your body in real-time to capture precise measurements.",
  },
  {
    icon: Ruler,
    title: "Perfect Fit",
    description: "Get your exact size recommendation with confidence scoring.",
  },
];

const VirtualTryOn = () => {
  const [showAR, setShowAR] = useState(false);

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
          <p className="text-muted-foreground max-w-lg mx-auto">
            Scan the QR code, point your camera, and see a realistic 3D model of the clothing on you — with AI-powered body scanning for real-time measurements and perfect size recommendations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* QR + Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div
              onClick={() => setShowAR(true)}
              className="relative w-[280px] h-[560px] rounded-[2.5rem] glass-strong overflow-hidden gradient-border glow-primary cursor-pointer group"
            >
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-background rounded-b-2xl z-10" />
              {/* Screen content */}
              <img
                src={tryonPreview}
                alt="Virtual Try-On Preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* QR overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-center">
                  {/* Mini QR */}
                  <div className="w-24 h-24 mx-auto mb-3 relative">
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-0.5">
                      {Array.from({ length: 25 }).map((_, i) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        const isCorner = (row < 2 && col < 2) || (row < 2 && col > 2) || (row > 2 && col < 2);
                        const isFilled = isCorner || Math.random() > 0.35;
                        return (
                          <div
                            key={i}
                            className={`rounded-sm ${isFilled ? "bg-primary" : "bg-transparent"}`}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute inset-0 overflow-hidden rounded">
                      <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                      />
                    </div>
                  </div>
                  <p className="font-display font-semibold text-sm text-foreground">Tap to Try On</p>
                  <p className="text-xs text-muted-foreground">Experience AR camera demo</p>
                </div>
              </div>
              {/* Scan overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
          <div className="space-y-5">
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

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAR(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold glow-primary transition-all mt-2"
            >
              <Sparkles className="w-5 h-5" />
              Try AR Demo
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* AR fullscreen view */}
      <AnimatePresence>
        {showAR && <ARTryOnView onClose={() => setShowAR(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default VirtualTryOn;
