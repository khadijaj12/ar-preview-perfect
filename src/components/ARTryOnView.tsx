import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { X, Scan, Ruler, ChevronRight, Check, RotateCcw, ZoomIn } from "lucide-react";
import tryonBg from "@/assets/tryon-bg.jpg";

function DressModel() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Torso */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 1.2, 16]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.08} speed={1} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Skirt */}
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.7, 1.4, 16]} />
          <MeshDistortMaterial color="#2563eb" distort={0.1} speed={1.2} roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Collar */}
        <mesh position={[0, 1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.05, 8, 16]} />
          <meshStandardMaterial color="#1e40af" roughness={0.5} />
        </mesh>
        {/* Left sleeve */}
        <mesh position={[-0.5, 0.9, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.05} speed={1} roughness={0.3} />
        </mesh>
        {/* Right sleeve */}
        <mesh position={[0.5, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.05} speed={1} roughness={0.3} />
        </mesh>
        {/* Belt */}
        <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.44, 0.03, 8, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

interface MeasurementData {
  label: string;
  value: string;
  position: string;
}

const measurements: MeasurementData[] = [
  { label: "Chest", value: '36"', position: "top-[28%] right-4" },
  { label: "Waist", value: '28"', position: "top-[45%] right-4" },
  { label: "Hips", value: '38"', position: "top-[60%] right-4" },
  { label: "Length", value: '42"', position: "top-[75%] left-4" },
];

const sizeOptions = [
  { size: "XS", fit: "Tight", confidence: 45 },
  { size: "S", fit: "Snug", confidence: 72 },
  { size: "M", fit: "Perfect", confidence: 96 },
  { size: "L", fit: "Loose", confidence: 68 },
];

interface ARTryOnViewProps {
  onClose: () => void;
}

const ARTryOnView = ({ onClose }: ARTryOnViewProps) => {
  const [scanComplete, setScanComplete] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);

  // Auto-trigger scan completion after 3s
  useState(() => {
    const t1 = setTimeout(() => setScanComplete(true), 3000);
    const t2 = setTimeout(() => setShowMeasurements(true), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95"
    >
      {/* Camera background */}
      <div className="absolute inset-0">
        <img src={tryonBg} alt="Fitting room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ar-scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      </div>

      {/* AR corner brackets */}
      <div className="absolute inset-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/70 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/70 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/70 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/70 rounded-br-lg" />
      </div>

      {/* Body outline silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: scanComplete ? 0 : [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[200px] h-[400px] border-2 border-dashed border-primary/40 rounded-[50%_50%_45%_45%/30%_30%_20%_20%]"
        />
      </div>

      {/* 3D Dress overlay */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={1} />
          <pointLight position={[-5, 3, -5]} color="#8b5cf6" intensity={0.6} />
          <spotLight position={[0, 8, 0]} intensity={0.5} />
          <DressModel />
          <OrbitControls enableZoom autoRotate autoRotateSpeed={0.5} enablePan={false} />
        </Canvas>
      </div>

      {/* Measurement lines (appear after scan) */}
      <AnimatePresence>
        {showMeasurements && measurements.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`absolute ${m.position} z-10`}
          >
            <div className="flex items-center gap-2 glass rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-display">
                <span className="text-muted-foreground">{m.label}:</span>{" "}
                <span className="text-foreground font-semibold">{m.value}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className={`w-3 h-3 rounded-full ${scanComplete ? "bg-primary" : "bg-destructive"} animate-pulse`} />
          <span className="text-xs font-display text-foreground/80 tracking-wider uppercase">
            {scanComplete ? "Scan Complete" : "Scanning Body..."}
          </span>
        </motion.div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
      >
        <div className="glass-strong rounded-2xl p-5 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Classic Blue Dress</h3>
              <p className="text-xs text-muted-foreground">AI Body Scan + Size Recommendation</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Scan className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary font-semibold">
                {scanComplete ? "Ready" : "Scanning..."}
              </span>
            </div>
          </div>

          {/* Size recommendation */}
          <AnimatePresence>
            {scanComplete && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div className="text-xs text-muted-foreground font-display uppercase tracking-wider">
                  Recommended Size
                </div>
                <div className="flex gap-2">
                  {sizeOptions.map((opt) => (
                    <div
                      key={opt.size}
                      className={`flex-1 p-2 rounded-lg text-center transition-all ${
                        opt.fit === "Perfect"
                          ? "bg-primary/20 border border-primary/40 glow-primary"
                          : "glass"
                      }`}
                    >
                      <div className={`text-sm font-display font-bold ${opt.fit === "Perfect" ? "text-primary" : "text-foreground"}`}>
                        {opt.size}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{opt.fit}</div>
                      <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${opt.confidence}%` }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className={`h-full rounded-full ${opt.fit === "Perfect" ? "bg-primary" : "bg-muted-foreground/40"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Best fit callout */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs text-foreground">
                    <span className="font-semibold">Size M</span> is your best fit with{" "}
                    <span className="text-primary font-semibold">96% confidence</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
            <RotateCcw className="w-3.5 h-3.5" />
            Drag to rotate
            <span className="mx-1">•</span>
            <ZoomIn className="w-3.5 h-3.5" />
            Scroll to zoom
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ARTryOnView;
