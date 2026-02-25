import { useNavigate } from "react-router-dom";
import ARTryOnView from "@/components/ARTryOnView";

const TryOnPreview = () => {
  const navigate = useNavigate();
  return <ARTryOnView onClose={() => navigate("/")} />;
};

export default TryOnPreview;
