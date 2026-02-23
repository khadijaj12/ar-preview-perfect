import { useParams, useNavigate } from "react-router-dom";
import { menuItems } from "@/components/MenuCatalog";
import ARCameraView from "@/components/ARCameraView";

const ARPreview = () => {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const dish = menuItems.find((m) => m.id === dishId);

  if (!dish) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Dish not found</h1>
          <p className="text-muted-foreground mb-4">The requested dish could not be found.</p>
          <button onClick={() => navigate("/")} className="text-primary font-display font-medium">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return <ARCameraView dish={dish} onClose={() => navigate("/")} />;
};

export default ARPreview;
