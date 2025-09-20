import { motion } from "framer-motion";
import { FAQCard } from "../components";

const faqs = [
  {
    title: "General",
    data: [
      {
        question: "How do I enroll for a driving course?",
        answer:
          "You can enroll by selecting a course, choosing an available instructor, booking a convenient time, and making a payment. You'll receive a confirmation once your booking is complete.",
      },
      {
        question: "What documents are required to enroll?",
        answer:
          "You typically need an ID proof, address proof, and passport-size photos. Some locations may have additional requirements.",
      },
      {
        question: "Can I select car and bike courses at once?",
        answer:
          "Yes! You can add both courses at once, but each course will be taught one after the other. If both are chosen, the bike course will be taught first, followed by the car course.",
      },
    ],
  },
  {
    title: "Classes & Scheduling",
    data: [
      {
        question: "How do I book a driving class?",
        answer:
          "Select your preferred date, time, and instructor, then confirm your booking.",
      },
      {
        question: "How do I reschedule a class?",
        answer:
          "Go to 'My Classes' on the website and select 'Reschedule.' You can choose a new time based on availability.",
      },
      {
        question: "What happens if I miss a class?",
        answer:
          "If you miss a class, you can reschedule based on instructor availability.",
      },
      {
        question: "Can I book extra practice sessions?",
        answer:
          "Yes! Extra practice sessions can be booked in the app under 'Additional Sessions.'",
      },
    ],
  },
  {
    title: "License & Certification",
    data: [
      {
        question: "How do I get my driving license?",
        answer:
          "Our courses prepare you for the official driving test. Once you complete the training, you can book a test at your local RTO.",
      },
      {
        question: "How long does it take to get a driving license?",
        answer:
          "It depends on your region, but typically, after completing your lessons and passing the test, it takes 2-4 weeks to receive your license.",
      },
      {
        question: "Do you offer test preparation?",
        answer:
          "Yes! We provide mock tests and practical exam preparation to help you pass on your first attempt.",
      },
      {
        question: "What happens if I fail the driving test?",
        answer:
          "Don't worry! You can book a retest and additional practice sessions through our website. Our instructors will help you improve.",
      },
    ],
  },
  // {
  //   title: "Payments & Refunds",
  //   data: [
  //     {
  //       question: "What payment methods do you accept?",
  //       answer: "We accept credit/debit cards, UPI, bank transfers, and digital wallets like Paytm and Google Pay."
  //     },
  //     {
  //       question: "Can I get a refund if I cancel my course?",
  //       answer: "Refunds depend on when you cancel. If you cancel within 24 hours of booking, you get a full refund. After that, partial refunds may apply."
  //     },
  //     {
  //       question: "Are there any hidden fees?",
  //       answer: "No, all fees are transparent and mentioned upfront. You'll only pay for additional services if you opt for them."
  //     }
  //   ]
  // },
  {
    title: "Support & Technical Issues",
    data: [
      // {
      //   question: "I didn't receive a confirmation email. What should I do?",
      //   answer: "Check your spam folder. If you still don't see it, contact us via chat, email, or call for assistance."
      // },
      // {
      //   question: "The website is not working properly. How can I fix it?",
      //   answer: "Try logging out and logging in again. If the issue persists, contact our support team for troubleshooting."
      // },
      {
        question: "How do I contact customer support?",
        answer:
          "You can reach us through chat support, email at support@drivingschool.com, or call our 24/7 helpline at 6366281509.",
      },
    ],
  },
];

export default function FAQs() {
  return (
    <section className="section-container bg-gradient-to-br from-light via-mainLightest/10 dark:from-gray-950 dark:via-mainDarkest/10 to-light dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-main">Frequently Asked Questions</h2>
        <div className="text-center">
          <p className="section-subtitle my-6 dark:text-white">
            Find answers to frequently asked questions about our driver
            education programs and services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map((group) => (
            <div key={group.title}>
              <h2 className="text-xl font-bold my-4">{group.title}</h2>
              {group.data.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FAQCard {...faq} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
