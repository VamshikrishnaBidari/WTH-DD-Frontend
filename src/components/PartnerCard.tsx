import { motion } from "framer-motion";

interface PartnerCardProps {
  name: string;
  logo: string;
}

export default function PartnerCard({ name, logo }: PartnerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-xl p-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
    >
      <img
        src={logo}
        alt={name}
        className="max-h-36 object-contain hover:grayscale-0 grayscale-0 transition-all duration-300 dark:hover:brightness-150 dark:brightness-100 rounded-sm"
      />
    </motion.div>
  );
}
