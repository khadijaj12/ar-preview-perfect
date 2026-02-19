import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { QrCode, RotateCcw, ZoomIn, Utensils } from "lucide-react";
import foodPreview from "@/assets/food-preview.jpg";

function FoodModel() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Plate */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Food items */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <MeshDistortMaterial color="#f97316" distort={0.2} speed={1.5} />
        </mesh>
        <mesh position={[0.6, 0.2, 0.3]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <MeshDistortMaterial color="#ef4444" distort={0.15} speed={2} />
        </mesh>
        <mesh position={[-0.5, 0.15, -0.2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <MeshDistortMaterial color="#22c55e" distort={0.2} speed={1} />
        </mesh>
      </group>
    </Float>
  );
}

const features = [
  { icon: QrCode, title: "QR Scan", desc: "Scan menu QR code to start" },
  { icon: RotateCcw, title: "360° View", desc: "Rotate and inspect dishes" },
  { icon: ZoomIn, title: "True Scale", desc: "Life-size portion preview" },
  { icon: Utensils, title: "Nutrition", desc: "AI-powered nutrition data" },
];

const FoodPreview = () => {
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
            3D Food Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Taste With Your <span className="text-gradient-primary">Eyes</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Preview any dish in life-size 3D right on your table before ordering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="relative rounded-2xl glass-strong gradient-border overflow-hidden aspect-square max-w-md mx-auto">
              <img
                src={foodPreview}
                alt="AR Food Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative w-full h-full">
                <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[5, 5, 5]} color="#22d3ee" intensity={0.8} />
                  <pointLight position={[-5, 3, -5]} color="#f97316" intensity={0.4} />
                  <FoodModel />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                </Canvas>
              </div>
              {/* AR overlay corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl glass group hover:glow-primary transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodPreview;
