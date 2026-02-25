import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VirtualTryOn from "@/components/VirtualTryOn";
import FoodPreview from "@/components/FoodPreview";
import MenuCatalog from "@/components/MenuCatalog";
import AIFeatures from "@/components/AIFeatures";
import TechStack from "@/components/TechStack";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VirtualTryOn />
      <FoodPreview />
      <MenuCatalog />
      <AIFeatures />
      <TechStack />
      <footer className="py-8 border-t border-border/50">
        <div className="container text-center text-sm text-muted-foreground font-body tracking-wide">
          © 2026 ARView — AI-Powered Augmented Reality Previews
        </div>
      </footer>
    </div>
  );
};

export default Index;
