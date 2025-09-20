import { motion } from "framer-motion";
import { PartnerCard } from "../components";

const partners = [
  {
    name: "Toyota Safety Institute",
    logo: "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=200&h=100&q=80",
  },
  {
    name: "Honda Driving School",
    logo: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?auto=format&fit=crop&w=200&h=100&q=80",
  },
  {
    name: "BMW Driver Training",
    logo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&h=100&q=80",
  },
  {
    name: "Mercedes-Benz Driving Academy",
    logo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=200&h=100&q=80",
  },
];

export default function OurPartners() {
  return (
    <section className="section-container bg-light dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-main">
          Partnered with Industry Leaders
        </h2>
        <p className="section-subtitle dark:text-white">
          We collaborate with leading automotive brands to provide you with the
          best-in-class training vehicles and safety standards in driver
          education.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PartnerCard {...partner} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
