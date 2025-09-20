import { motion } from "framer-motion";
import { DivideIcon } from "lucide-react";

interface WhyUsCardProps {
  icon: typeof DivideIcon;
  title: string;
  description: string;
}

export default function WhyUsCard({
  icon: Icon,
  title,
  description,
}: WhyUsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-mainLightest/10 dark:bg-mainLightest/10 rounded-full mb-4">
          <Icon className="w-8 h-8 text-main dark:text-mainLight" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-dark dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}
