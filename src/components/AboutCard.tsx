import { motion } from "framer-motion";
import { DivideIcon } from "lucide-react";

interface AboutCardProps {
  icon: typeof DivideIcon;
  title: string;
  description: string;
}

export default function AboutCard({
  icon: Icon,
  title,
  description,
}: AboutCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-main dark:bg-mainLight rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-dark dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
