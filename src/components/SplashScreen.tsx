import logo from "figma:asset/fd4137f34a2286d10bfa9fbfcd8d577373b5669b.png";
import { motion } from "motion/react";

export default function SplashScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <motion.img
        src={logo}
        alt="Sharek Logo"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-32 h-32 object-contain"
      />
    </div>
  );
}
