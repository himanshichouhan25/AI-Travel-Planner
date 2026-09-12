import { Sparkles, X } from "lucide-react";

export default function FloatingButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close AI Travel Assistant" : "Open AI Travel Assistant"}
      className="
        fixed
        bottom-20
        md:bottom-8
        right-6
        md:right-8
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
        cursor-pointer
      "
    >
      {isOpen ? (
        <X size={28} className="transition-transform duration-200" />
      ) : (
        <Sparkles size={28} />
      )}
    </button>
  );
}