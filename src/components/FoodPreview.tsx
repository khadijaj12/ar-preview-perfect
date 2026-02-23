import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Camera, Smartphone, ArrowRight } from "lucide-react";
import ARCameraView from "@/components/ARCameraView";

const demoDish = {
  name: "Truffle Wagyu Bowl",
  servingSize: "Serves 1",
  plateDiameter: "26cm / 10in",
  colors: { main: "#f97316", accent: "#22c55e", plate: "#1e293b" },
  shapes: [
    { type: "sphere" as const, args: [0.5, 16, 16] },
    { type: "sphere" as const, args: [0.25, 16, 16] },
    { type: "sphere" as const, args: [0.2, 16, 16] },
  ],
};

const steps = [
  { icon: QrCode, title: "Scan QR", desc: "Point your phone at the menu QR code" },
  { icon: Camera, title: "Open Camera", desc: "Camera activates with AR overlay" },
  { icon: Smartphone, title: "See the Dish", desc: "Life-size 3D model on your table" },
];

const FoodPreview = () => {
  const [showAR, setShowAR] = useState(false);

  return (
    <section className="py-24 relative" id="food">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-display tracking-widest uppercase">
            QR → Camera → AR Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            See Your Dish <span className="text-gradient-cyan">Before Ordering</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Scan the QR code on the menu, and your phone camera shows a life-size 3D model of the dish right on your table — giving you a realistic feel for portion size and presentation.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl glass group hover:glow-primary transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Demo QR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto text-center"
        >
          <div
            onClick={() => setShowAR(true)}
            className="relative p-8 rounded-2xl glass-strong gradient-border cursor-pointer group hover:glow-cyan transition-all duration-500"
          >
            {/* Simulated QR code pattern */}
            <div className="w-40 h-40 mx-auto mb-4 relative">
              <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 gap-1">
                {Array.from({ length: 49 }).map((_, i) => {
                  const row = Math.floor(i / 7);
                  const col = i % 7;
                  const isCorner =
                    (row < 3 && col < 3) ||
                    (row < 3 && col > 3) ||
                    (row > 3 && col < 3);
                  const isFilled = isCorner || Math.random() > 0.4;
                  return (
                    <div
                      key={i}
                      className={`rounded-sm transition-colors duration-300 ${
                        isFilled
                          ? "bg-foreground group-hover:bg-primary"
                          : "bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>
              {/* Scanning overlay */}
              <div className="absolute inset-0 overflow-hidden rounded">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
                />
              </div>
            </div>
            <p className="font-display font-semibold text-sm mb-1">Tap to Try AR Demo</p>
            <p className="text-xs text-muted-foreground">Experience the camera view simulation</p>
          </div>
        </motion.div>
      </div>

      {/* AR Camera fullscreen view */}
      <AnimatePresence>
        {showAR && (
          <ARCameraView dish={demoDish} onClose={() => setShowAR(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FoodPreview;
