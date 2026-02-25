import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Star, Clock, Flame, ChevronRight, RotateCcw, Camera } from "lucide-react";
import ARCameraView from "@/components/ARCameraView";

import wagyuImg from "@/assets/menu/wagyu-bowl.jpg";
import dragonRollImg from "@/assets/menu/dragon-roll.jpg";
import gardenSaladImg from "@/assets/menu/garden-salad.jpg";
import lavaCakeImg from "@/assets/menu/lava-cake.jpg";
import seafoodPaellaImg from "@/assets/menu/seafood-paella.jpg";
import matchaPannaCottaImg from "@/assets/menu/matcha-panna-cotta.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  rating: number;
  prepTime: string;
  calories: string;
  image: string;
  servingSize: string;
  plateDiameter: string;
  colors: { main: string; accent: string; plate: string };
  shapes: { type: "sphere" | "torus" | "cone"; args: number[] }[];
}

const menuItems: MenuItem[] = [
  {
    id: "1", name: "Truffle Wagyu Bowl",
    description: "A5 wagyu with black truffle shavings, served on saffron rice with micro greens.",
    price: "$42", category: "Main", rating: 4.9, prepTime: "25 min", calories: "680 cal",
    image: wagyuImg, servingSize: "Serves 1", plateDiameter: "26cm / 10in",
    colors: { main: "#d4a843", accent: "#22c55e", plate: "#1a1a1a" },
    shapes: [{ type: "sphere", args: [0.5, 16, 16] }, { type: "sphere", args: [0.25, 16, 16] }, { type: "sphere", args: [0.2, 16, 16] }],
  },
  {
    id: "2", name: "Dragon Roll Platter",
    description: "Tempura shrimp dragon roll with avocado, unagi sauce, and tobiko.",
    price: "$28", category: "Sushi", rating: 4.8, prepTime: "20 min", calories: "520 cal",
    image: dragonRollImg, servingSize: "Serves 1-2", plateDiameter: "30cm / 12in",
    colors: { main: "#ef4444", accent: "#d4a843", plate: "#1a1a1a" },
    shapes: [{ type: "torus", args: [0.6, 0.2, 16, 32] }, { type: "sphere", args: [0.15, 16, 16] }, { type: "sphere", args: [0.12, 16, 16] }],
  },
  {
    id: "3", name: "Garden Harvest Salad",
    description: "Mixed heirloom greens, roasted beets, goat cheese, and citrus vinaigrette.",
    price: "$18", category: "Salad", rating: 4.7, prepTime: "10 min", calories: "320 cal",
    image: gardenSaladImg, servingSize: "Serves 1", plateDiameter: "24cm / 9.5in",
    colors: { main: "#22c55e", accent: "#d4a843", plate: "#1a1a1a" },
    shapes: [{ type: "sphere", args: [0.35, 16, 16] }, { type: "sphere", args: [0.28, 16, 16] }, { type: "sphere", args: [0.22, 16, 16] }],
  },
  {
    id: "4", name: "Lava Chocolate Cake",
    description: "Molten dark chocolate center, vanilla bean ice cream, fresh berries.",
    price: "$16", category: "Dessert", rating: 4.9, prepTime: "15 min", calories: "450 cal",
    image: lavaCakeImg, servingSize: "Serves 1", plateDiameter: "20cm / 8in",
    colors: { main: "#92400e", accent: "#d4a843", plate: "#1a1a1a" },
    shapes: [{ type: "cone", args: [0.5, 0.7, 16] }, { type: "sphere", args: [0.3, 16, 16] }, { type: "sphere", args: [0.1, 16, 16] }],
  },
  {
    id: "5", name: "Seafood Paella",
    description: "Spanish saffron rice with prawns, mussels, chorizo, and roasted peppers.",
    price: "$36", category: "Main", rating: 4.8, prepTime: "30 min", calories: "750 cal",
    image: seafoodPaellaImg, servingSize: "Serves 2-3", plateDiameter: "32cm / 12.5in",
    colors: { main: "#d4a843", accent: "#ea580c", plate: "#1a1a1a" },
    shapes: [{ type: "sphere", args: [0.3, 16, 16] }, { type: "sphere", args: [0.2, 16, 16] }, { type: "torus", args: [0.4, 0.12, 16, 32] }],
  },
  {
    id: "6", name: "Matcha Panna Cotta",
    description: "Silky matcha cream with yuzu coulis, black sesame tuile, and edible flowers.",
    price: "$14", category: "Dessert", rating: 4.6, prepTime: "12 min", calories: "280 cal",
    image: matchaPannaCottaImg, servingSize: "Serves 1", plateDiameter: "18cm / 7in",
    colors: { main: "#4ade80", accent: "#d4a843", plate: "#1a1a1a" },
    shapes: [{ type: "cone", args: [0.45, 0.5, 16] }, { type: "sphere", args: [0.15, 16, 16] }, { type: "sphere", args: [0.1, 16, 16] }],
  },
];

const categories = ["All", "Main", "Sushi", "Salad", "Dessert"];

function DishModel({ item }: { item: MenuItem }) {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <group>
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.08, 32]} />
          <meshStandardMaterial color={item.colors.plate} metalness={0.7} roughness={0.3} />
        </mesh>
        {item.shapes.map((shape, i) => {
          const positions: [number, number, number][] = [[0, 0.3, 0], [0.5, 0.2, 0.3], [-0.4, 0.15, -0.25]];
          const color = i === 0 ? item.colors.main : i === 1 ? item.colors.accent : item.colors.main;
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

const MenuCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [arDish, setArDish] = useState<MenuItem | null>(null);

  const filtered = activeCategory === "All" ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  return (
    <section className="py-24 relative" id="menu">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-body tracking-widest uppercase">
            Interactive Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Explore the <span className="text-gradient-warm">Menu in 3D</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            Browse dishes and open the AR camera view to see them life-size on your table.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl glass overflow-hidden hover:glow-primary transition-all duration-500"
              >
                <div className="relative h-56 grid grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-background/60 text-foreground text-[10px] font-body font-medium backdrop-blur-sm">
                      📷 Photo
                    </span>
                  </div>
                  <div className="relative bg-gradient-to-b from-card to-background">
                    <Canvas camera={{ position: [0, 2, 3.5], fov: 45 }}>
                      <ambientLight intensity={0.7} />
                      <pointLight position={[3, 4, 3]} color={item.colors.main} intensity={0.8} />
                      <pointLight position={[-3, 2, -3]} color={item.colors.accent} intensity={0.4} />
                      <DishModel item={item} />
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} enablePan={false} />
                    </Canvas>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-body font-medium backdrop-blur-sm">
                      🧊 3D Model
                    </span>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-body">
                      <RotateCcw className="w-3 h-3" />
                      Rotate
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-body font-medium backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-lg">{item.name}</h3>
                    <span className="text-primary font-display font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-body">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-body">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-primary" /> {item.calories}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-body">
                    <span className="px-2 py-0.5 rounded bg-muted">{item.servingSize}</span>
                    <span className="px-2 py-0.5 rounded bg-muted">⌀ {item.plateDiameter}</span>
                  </div>
                </div>

                <div className="px-5 pb-4">
                  <button
                    onClick={() => setArDish(item)}
                    className="flex items-center gap-1.5 text-xs text-primary font-body font-medium group-hover:gap-2.5 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    View in AR Camera <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {arDish && (
          <ARCameraView dish={arDish} onClose={() => setArDish(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuCatalog;
export { menuItems };
export type { MenuItem };
