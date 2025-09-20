import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface CustomerReviewsCardProps {
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export default function CustomerReviewsCard({
  name,
  role,
  review,
  rating,
  image,
}: CustomerReviewsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg text-dark dark:text-white">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-main text-main dark:fill-mainLight dark:text-mainLight"
          />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{review}</p>
    </motion.div>
  );
}
