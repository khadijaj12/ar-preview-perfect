import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { RotateCcw, ZoomIn, X, Ruler, Users } from "lucide-react";
import arTableBg from "@/assets/ar-table-bg.jpg";

interface DishData {
  name: string;
  servingSize: string;
  plateDiameter: string;
  colors: { main: string; accent: string; plate: string };
  shapes: { type: "sphere" | "torus" | "cone"; args: number[] }[];
}

function ARDishModel({ dish }: { dish: DishData }) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.08, 32]} />
          <meshStandardMaterial color={dish.colors.plate} metalness={0.7} roughness={0.3} />
        </mesh>
        {dish.shapes.map((shape, i) => {
          const positions: [number, number, number][] = [
            [0, 0.3, 0],
            [0.5, 0.2, 0.3],
            [-0.4, 0.15, -0.25],
          ];
          const color = i === 0 ? dish.colors.main : i === 1 ? dish.colors.accent : dish.colors.main;
          return (
            <mesh key={i} position={positions[i]}>
              {shape.type === "sphere" && <sphereGeometry args={shape.args as [number, number, number]} />}
              {shape.type === "torus" && <torusGeometry args={shape.args as [number, number, number, number]} />}
              {shape.type === "cone" && <coneGeometry args={shape.args as [number, number, number]} />}
              <MeshDistortMaterial color={color} distort={0.15} speed={1.5} roughness={0.4} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

interface ARCameraViewProps {
  dish: DishData;
  onClose: () => void;
}

const ARCameraView = ({ dish, onClose }: ARCameraViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95"
    >
      {/* Camera viewfinder background */}
      <div className="absolute inset-0">
        <img
          src={arTableBg}
          alt="Restaurant table"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>

      {/* AR scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="ar-scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      </div>

      {/* AR corner brackets */}
      <div className="absolute inset-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/70 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/70 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/70 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/70 rounded-br-lg" />
      </div>

      {/* 3D dish overlaid on table */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 3, 5], fov: 40 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} color={dish.colors.main} intensity={1} />
          <pointLight position={[-5, 3, -5]} color={dish.colors.accent} intensity={0.6} />
          <spotLight position={[0, 8, 0]} intensity={0.4} />
          <ARDishModel dish={dish} />
          <OrbitControls enableZoom autoRotate autoRotateSpeed={0.8} enablePan={false} />
        </Canvas>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs font-display text-foreground/80 tracking-wider uppercase">AR Camera Active</span>
        </motion.div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dish info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <div className="glass-strong rounded-2xl p-5 max-w-md mx-auto">
          <h3 className="font-display font-bold text-lg mb-3">{dish.name}</h3>

          {/* Portion info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Ruler className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Plate Size</div>
                <div className="font-display font-semibold text-sm">{dish.plateDiameter}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Serving</div>
                <div className="font-display font-semibold text-sm">{dish.servingSize}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
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

export default ARCameraView;
