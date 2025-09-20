import { motion } from "framer-motion";
import { Car, CalendarCheck, Gamepad2, Gauge, User, Clock } from "lucide-react";
import { WhyUsCard } from "../components";
import { forwardRef } from "react";

const features = [
  {
    icon: Car,
    title: "Easy Pick-up & Drop",
    description: "Convenient door-to-door service for all our students.",
  },
  {
    icon: CalendarCheck,
    title: "Online Booking",
    description: "Book your classes anytime, anywhere with our online system.",
  },
  {
    icon: Gamepad2,
    title: "Simulator Training",
    description:
      "State-of-the-art simulators for safe practice. Learn without fear.",
  },
  {
    icon: Gauge,
    title: "Quick License",
    description: "Fast-track licensing process with high success rate.",
  },
  {
    icon: User,
    title: "Female Instructors",
    description: "Dedicated female instructors available for comfort.",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description:
      "Classes available at your convenient time. We work around your schedule.",
  },
];

const WhyUs = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="section-container bg-gradient-to-br from-light via-mainLightest/10 dark:from-gray-950 dark:via-mainDarkest/10 to-light dark:to-gray-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-main">Why Choose DearDriving?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <WhyUsCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

WhyUs.displayName = "WhyUs"; // Optional: Set a display name for debugging

export default WhyUs;
