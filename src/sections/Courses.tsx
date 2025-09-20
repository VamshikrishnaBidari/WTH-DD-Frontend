// Desc: Component to display the services offered by the driving school
import { useState, forwardRef } from "react";
import { AuthModal } from "../components";
import "../index.css";

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

const Courses = forwardRef<HTMLElement>((_, ref) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginProp, setIsLoginProp] = useState(true);

  return (
    <section ref={ref}>
      <div className="min-h-screen bg-light dark:bg-gray-950 py-16 font-satoshi">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-main dark:text-mainLightest">
            Our Courses
          </h1>

          <div className="space-y-24">
            {courses.map((courses, index) => (
              <div
                key={courses.id}
                className={`flex flex-col rounded-sm bg-gradient-to-bl from-light via-blue-100 to-light dark:from-gray-950 dark:via-blue-950/60 dark:to-gray-950 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} 
                gap-8 md:gap-16 items-center courses-card`}
              >
                <div className="flex-1">
                  <img
                    src={courses.image}
                    alt={courses.alt}
                    className="rounded-sm shadow-xl w-full h-[150px] md:h-[300px] object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4 px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-mainDark dark:text-blue-300">
                    {courses.title}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-50 leading-relaxed">
                    {courses.description}
                  </p>
                  <button
                    className="start-learning-btn"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsLoginProp(false);
                    }}
                  >
                    {courses.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          isLoginProp={isLoginProp}
        />
      )}
    </section>
  );
});

export default Courses;
