import { motion } from "framer-motion";
import { CustomerReviewsCard } from "../components";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "New Driver",
    review:
      "DriveWise Academy transformed my fear of driving into confidence. The instructors were patient, professional, and truly invested in my success. I passed my test on the first try!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
  },
  {
    name: "Michael Chen",
    role: "Corporate Client",
    review:
      "As a business owner, I enrolled my entire delivery team in DriveWise's commercial driving program. The comprehensive training and flexible scheduling made it a perfect choice.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
  },
  {
    name: "Emily Davis",
    role: "Parent of Teen Driver",
    review:
      "The structured curriculum and focus on safety gave me peace of mind while my teenager learned to drive. The online progress tracking was an excellent feature for parents.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150",
  },
];

export default function CustomerReviews() {
  return (
    <section className="section-container bg-gradient-to-br from-light via-mainLightest/10 dark:from-gray-950 dark:via-mainDarkest/10 to-light dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-main">
          Success Stories from Our Students
        </h2>
        <p className="section-subtitle dark:text-white my-6">
          Join thousands of satisfied students who have successfully completed
          their driver education with DriveWise Academy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CustomerReviewsCard {...review} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
