import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Camera, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

function FloatingOrb() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          wireframe
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="AR Preview Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* AR Grid overlay */}
      <div className="absolute inset-0 ar-grid opacity-40" />

      {/* 3D Canvas */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-60 hidden md:block">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#22d3ee" intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={0.5} />
          <FloatingOrb />
        </Canvas>
      </div>

      <div className="container relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-display tracking-widest uppercase">
              AI-Powered AR Preview
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
            See It{" "}
            <span className="text-gradient-primary">Before</span>
            <br />
            You Buy It
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
            Experience products in your real world using AI-powered augmented reality.
            Try on clothes, preview dishes, and shop with total confidence.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold glow-primary transition-all"
            >
              <Camera className="w-5 h-5" />
              Try AR Preview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-4 rounded-lg glass gradient-border font-display font-semibold transition-all"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              How It Works
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg"
        >
          {[
            { value: "98%", label: "Accuracy" },
            { value: "2M+", label: "Try-Ons" },
            { value: "<1s", label: "Load Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
