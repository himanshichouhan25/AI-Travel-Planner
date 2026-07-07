import { Loader2 } from "lucide-react";

const ButtonLoader = ({ text = "Loading..." }) => {
  return (
    <span className="flex items-center justify-center gap-2">
      <Loader2
        size={18}
        className="animate-spin"
      />
      <span>{text}</span>
    </span>
  );
};

export default ButtonLoader;