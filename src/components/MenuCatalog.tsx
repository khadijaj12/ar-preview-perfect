import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Star, Clock, Flame, ChevronRight, RotateCcw } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  rating: number;
  prepTime: string;
  calories: string;
  colors: { main: string; accent: string; plate: string };
  shapes: { type: "sphere" | "torus" | "cone"; args: number[] }[];
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Wagyu Bowl",
    description: "A5 wagyu with black truffle shavings, served on saffron rice with micro greens.",
    price: "$42",
    category: "Main",
    rating: 4.9,
    prepTime: "25 min",
    calories: "680 cal",
    colors: { main: "#f97316", accent: "#22c55e", plate: "#1e293b" },
    shapes: [
      { type: "sphere", args: [0.5, 16, 16] },
      { type: "sphere", args: [0.25, 16, 16] },
      { type: "sphere", args: [0.2, 16, 16] },
    ],
  },
  {
    id: "2",
    name: "Dragon Roll Platter",
    description: "Tempura shrimp dragon roll with avocado, unagi sauce, and tobiko.",
    price: "$28",
    category: "Sushi",
    rating: 4.8,
    prepTime: "20 min",
    calories: "520 cal",
    colors: { main: "#ef4444", accent: "#facc15", plate: "#1e293b" },
    shapes: [
      { type: "torus", args: [0.6, 0.2, 16, 32] },
      { type: "sphere", args: [0.15, 16, 16] },
      { type: "sphere", args: [0.12, 16, 16] },
    ],
  },
  {
    id: "3",
    name: "Garden Harvest Salad",
    description: "Mixed heirloom greens, roasted beets, goat cheese, and citrus vinaigrette.",
    price: "$18",
    category: "Salad",
    rating: 4.7,
    prepTime: "10 min",
    calories: "320 cal",
    colors: { main: "#22c55e", accent: "#a855f7", plate: "#1e293b" },
    shapes: [
      { type: "sphere", args: [0.35, 16, 16] },
      { type: "sphere", args: [0.28, 16, 16] },
      { type: "sphere", args: [0.22, 16, 16] },
    ],
  },
  {
    id: "4",
    name: "Lava Chocolate Cake",
    description: "Molten dark chocolate center, vanilla bean ice cream, fresh berries.",
    price: "$16",
    category: "Dessert",
    rating: 4.9,
    prepTime: "15 min",
    calories: "450 cal",
    colors: { main: "#92400e", accent: "#dc2626", plate: "#1e293b" },
    shapes: [
      { type: "cone", args: [0.5, 0.7, 16] },
      { type: "sphere", args: [0.3, 16, 16] },
      { type: "sphere", args: [0.1, 16, 16] },
    ],
  },
  {
    id: "5",
    name: "Seafood Paella",
    description: "Spanish saffron rice with prawns, mussels, chorizo, and roasted peppers.",
    price: "$36",
    category: "Main",
    rating: 4.8,
    prepTime: "30 min",
    calories: "750 cal",
    colors: { main: "#eab308", accent: "#ea580c", plate: "#1e293b" },
    shapes: [
      { type: "sphere", args: [0.3, 16, 16] },
      { type: "sphere", args: [0.2, 16, 16] },
      { type: "torus", args: [0.4, 0.12, 16, 32] },
    ],
  },
  {
    id: "6",
    name: "Matcha Panna Cotta",
    description: "Silky matcha cream with yuzu coulis, black sesame tuile, and edible flowers.",
    price: "$14",
    category: "Dessert",
    rating: 4.6,
    prepTime: "12 min",
    calories: "280 cal",
    colors: { main: "#4ade80", accent: "#fbbf24", plate: "#1e293b" },
    shapes: [
      { type: "cone", args: [0.45, 0.5, 16] },
      { type: "sphere", args: [0.15, 16, 16] },
      { type: "sphere", args: [0.1, 16, 16] },
    ],
  },
];

const categories = ["All", "Main", "Sushi", "Salad", "Dessert"];

function DishModel({ item }: { item: MenuItem }) {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <group>
        {/* Plate */}
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.08, 32]} />
          <meshStandardMaterial color={item.colors.plate} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Food elements */}
        {item.shapes.map((shape, i) => {
          const positions: [number, number, number][] = [
            [0, 0.3, 0],
            [0.5, 0.2, 0.3],
            [-0.4, 0.15, -0.25],
          ];
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
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

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
          <span className="text-accent text-sm font-display tracking-widest uppercase">
            Interactive Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Explore the <span className="text-gradient-warm">Menu in 3D</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse dishes and preview them as interactive 3D models before you order.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground glow-accent"
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
                className="group rounded-2xl glass overflow-hidden cursor-pointer hover:glow-warm transition-all duration-500"
                onClick={() => setSelectedDish(item)}
              >
                {/* 3D Preview */}
                <div className="relative h-56 bg-gradient-to-b from-card to-background">
                  <Canvas camera={{ position: [0, 2, 3.5], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <pointLight position={[3, 4, 3]} color={item.colors.main} intensity={0.8} />
                    <pointLight position={[-3, 2, -3]} color={item.colors.accent} intensity={0.4} />
                    <DishModel item={item} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} enablePan={false} />
                  </Canvas>
                  {/* Category badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-display font-medium backdrop-blur-sm">
                    {item.category}
                  </span>
                  {/* Rotate hint */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <RotateCcw className="w-3 h-3" />
                    Drag to rotate
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-lg">{item.name}</h3>
                    <span className="text-primary font-display font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-accent" />
                      {item.calories}
                    </span>
                  </div>
                </div>

                {/* Expand hint */}
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-1 text-xs text-primary font-display font-medium group-hover:gap-2 transition-all">
                    View in full 3D <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expanded 3D view modal */}
        <AnimatePresence>
          {selectedDish && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedDish(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl rounded-2xl glass-strong gradient-border overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-80 md:h-96">
                  <Canvas camera={{ position: [0, 2.5, 4], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[5, 5, 5]} color={selectedDish.colors.main} intensity={1} />
                    <pointLight position={[-5, 3, -5]} color={selectedDish.colors.accent} intensity={0.6} />
                    <spotLight position={[0, 8, 0]} intensity={0.3} />
                    <DishModel item={selectedDish} />
                    <OrbitControls enableZoom autoRotate autoRotateSpeed={1} enablePan={false} />
                  </Canvas>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-2xl">{selectedDish.name}</h3>
                    <span className="text-primary font-display font-bold text-2xl">{selectedDish.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedDish.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {selectedDish.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {selectedDish.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-accent" /> {selectedDish.calories}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Drag to rotate • Scroll to zoom
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuCatalog;
