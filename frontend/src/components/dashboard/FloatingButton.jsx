import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/planner")}
      className="
        fixed
        bottom-8
        right-8
        w-16
        h-16
        rounded-full
        bg-gradient-to-r
        from-purple-600
        to-indigo-600
        text-white
        shadow-2xl
        flex
        items-center
        justify-center
        hover:scale-110
        hover:shadow-purple-400/50
        transition-all
        duration-300
        z-50
      "
    >
      <Sparkles size={28} />
    </button>
  );
}