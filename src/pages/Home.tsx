import heroImg from "../assets/heroImg.jpg";
import logo1 from "../assets/logos/LogoDD.png";
import { useState, useRef, useEffect, forwardRef } from "react";
import { AuthModal } from "../components";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { motion } from "framer-motion";
import { Car, CalendarCheck, Gamepad2, Gauge, User, Clock } from "lucide-react";
import InteractiveGridPattern from "../components/magicui/interactive-grid-pattern";
import { cn } from "../lib/utils";
import "../index.css";

// Course data
const courses = [
  {
    id: 1,
    title: "4-Wheeler Driving Course",
    description:
      "Master the art of driving with our comprehensive program. Expert instructors guide you through theory and practical sessions for confident driving.",
    image:
      "https://images.unsplash.com/photo-1541412094143-627a222be46d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Driving lesson with instructor",
    button: "Start Learning",
  },
  {
    id: 2,
    title: "2-Wheeler Driving Course",
    description:
      "From basic motorcycle control to advanced riding techniques. Get certified with our structured motorcycle training program.",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Motorcycle training session",
    button: "Learn to Ride",
  },
  {
    id: 3,
    title: "Advanced Skills",
    description:
      "Learn advanced practices and defensive driving techniques. Protect yourself and others with our expert safety guidance.",
    image:
      "https://images.unsplash.com/photo-1522846931861-69b7a5f8ab83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Safety demonstration",
    button: "Enhance Skills",
  },
  {
    id: 4,
    title: "Licensing Assistance",
    description:
      "Get your driver's license and license assistance. We help you navigate the licensing process and prepare for the road test.",
    image:
      "https://images.unsplash.com/photo-1557395703-5c5592ae708c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Get your license",
    button: "Get Started",
  },
];

// Why Us features
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

// FAQ data
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
  {
    title: "Support & Technical Issues",
    data: [
      {
        question: "How do I contact customer support?",
        answer: "You can reach us through email at deardriving1@gmail.com.",
      },
    ],
  },
];

// Component for individual course cards
const CourseCard = forwardRef<
  HTMLDivElement,
  { course: (typeof courses)[0]; index: number; onEnrollClick: () => void }
>(({ course, index, onEnrollClick }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col rounded-sm bg-gradient-to-bl from-light via-blue-100 to-light dark:from-gray-950 dark:via-blue-950/60 dark:to-gray-950 ${
      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
    } gap-8 md:gap-16 items-center courses-card`}
  >
    <div className="flex-1">
      <img
        src={course.image}
        alt={course.alt}
        className="rounded-sm shadow-xl w-full h-[150px] md:h-[300px] object-cover"
      />
    </div>
    <div className="flex-1 space-y-4 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-mainDark dark:text-blue-300">
        {course.title}
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-50 leading-relaxed">
        {course.description}
      </p>
      <button className="start-learning-btn" onClick={onEnrollClick}>
        {course.button}
      </button>
    </div>
  </div>
));

// Component for Why Us cards
const WhyUsCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
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

// Component for FAQ cards
const FAQCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-white">
          {question}
        </span>
        <span
          className={`transform transition-transform duration-200 text-main ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const Home = forwardRef<HTMLElement>(() => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginProp, setIsLoginProp] = useState(true);

  // Create all refs
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const coursesRef = useRef<HTMLElement>(null);

  // Individual course refs for specific navigation
  const courseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const course4WheelerRef = useRef<HTMLDivElement>(null);
  const course2WheelerRef = useRef<HTMLDivElement>(null);
  const courseAdvancedRef = useRef<HTMLDivElement>(null);
  const courseLicensingRef = useRef<HTMLDivElement>(null);

  // Set up course refs array
  useEffect(() => {
    courseRefs.current = [
      course4WheelerRef.current,
      course2WheelerRef.current,
      courseAdvancedRef.current,
      courseLicensingRef.current,
    ];
  }, []);

  // Expose scroll functions to global scope for header navigation
  useEffect(() => {
    // @ts-ignore
    window.scrollToHome = () => {
      homeRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToAbout = () => {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToCourses = () => {
      coursesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToCourse4Wheeler = () => {
      course4WheelerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToCourse2Wheeler = () => {
      course2WheelerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToCourseAdvanced = () => {
      courseAdvancedRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // @ts-ignore
    window.scrollToCourseLicensing = () => {
      courseLicensingRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return () => {
      // @ts-ignore
      delete window.scrollToHome;
      // @ts-ignore
      delete window.scrollToAbout;
      // @ts-ignore
      delete window.scrollToCourses;
      // @ts-ignore
      delete window.scrollToCourse4Wheeler;
      // @ts-ignore
      delete window.scrollToCourse2Wheeler;
      // @ts-ignore
      delete window.scrollToCourseAdvanced;
      // @ts-ignore
      delete window.scrollToCourseLicensing;
    };
  }, []);

  return (
    <main ref={homeRef}>
      {/* Hero Section */}
      <div
        className="relative sm:min-h-fit lg:min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-black dark:via-black dark:to-transparent dark:opacity-90 bg-gradient-to-r from-black/70 via-black/60 to-transparent opacity-100"></div>
        <div className="relative z-10 flex flex-col justify-center md:h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16">
          <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-white">
              Master the Art of Driving
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 dark:text-gray-300">
              Learn the skills you need to drive safely and confidently. Our
              expert instructors offer personalized lessons for every level.
            </p>
            <div className="flex">
              <RainbowButton
                className="w-full sm:w-auto hover:scale-105 transform transition-transform"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsLoginProp(false);
                }}
              >
                Start Your Journey
              </RainbowButton>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-light dark:bg-gray-950 dark:text-mainLightest font-satoshi">
        {/* Courses Section */}
        <section ref={coursesRef}>
          <div className="min-h-screen bg-light dark:bg-gray-950 py-16 font-satoshi">
            <div className="container mx-auto px-4 max-w-5xl">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-main dark:text-mainLightest">
                Our Courses
              </h1>
              <div className="space-y-24">
                {courses.map((course, index) => (
                  <div key={course.id}>
                    {/* Add separator before Licensing Assistance */}
                    {index === 3 && (
                      <div className="flex items-center justify-center my-16">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="px-6 py-2 text-lg font-semibold text-main dark:text-mainLight bg-white dark:bg-gray-900 rounded-full border border-gray-300 dark:border-gray-600">
                          Extra Support
                        </span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                    )}

                    <CourseCard
                      ref={
                        index === 0
                          ? course4WheelerRef
                          : index === 1
                            ? course2WheelerRef
                            : index === 2
                              ? courseAdvancedRef
                              : courseLicensingRef
                      }
                      course={course}
                      index={index}
                      onEnrollClick={() => {
                        setIsAuthModalOpen(true);
                        setIsLoginProp(false);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="section-container bg-gradient-to-br from-light via-mainLightest/10 dark:from-gray-950 dark:via-mainDarkest/10 to-light dark:to-gray-950 relative">
          <InteractiveGridPattern
            width={40}
            height={40}
            squares={[30, 20]}
            className={cn(
              "absolute inset-0 h-full w-full opacity-30 dark:opacity-20",
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            )}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="section-title text-mainLight">
              Why Choose DearDriving?
            </h2>
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

        {/* FAQs Section */}
        <section className="section-container bg-gradient-to-br from-light via-mainLightest/10 dark:from-gray-950 dark:via-mainDarkest/10 to-light dark:to-gray-950 relative">
          <InteractiveGridPattern
            width={50}
            height={50}
            squares={[25, 15]}
            className={cn(
              "absolute inset-0 h-full w-full opacity-20 dark:opacity-10",
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            )}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="section-title text-mainLight">
              Frequently Asked Questions
            </h2>
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

        {/* About Us Section */}
        <section
          ref={aboutRef}
          className="section-container bg-light dark:bg-gray-950 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="min-h-screen text-dark dark:text-light">
              <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-mainLight">
                      Start Driving with Confidence
                    </h1>

                    <div className="space-y-4 text-lg">
                      <p>
                        At DearDriving, we believe that learning to drive is
                        more than just mastering the rules of the road—it's
                        about building confidence, independence, and lifelong
                        safety skills.
                      </p>

                      <p>
                        Founded in 2025, our experienced instructors bring a
                        perfect blend of professionalism and patience to every
                        lesson, ensuring you receive the highest quality driving
                        education.
                      </p>

                      <p>
                        We pride ourselves on using modern teaching methods and
                        maintaining a fleet of well-maintained vehicles equipped
                        with the latest safety features. Our comprehensive
                        curriculum covers everything from basic vehicle control
                        to advanced defensive driving techniques.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <img
                      src={logo1}
                      alt="Professional driving instructor teaching a student"
                      className="rounded-2xl shadow-xl w-full object-cover aspect-4/3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          isLoginProp={isLoginProp}
        />
      )}
    </main>
  );
});

export default Home;
