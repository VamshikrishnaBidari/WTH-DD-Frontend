// Desc: About Us Section
import { forwardRef } from "react";
import logo1 from "../assets/logos/LogoDD.png";

const AboutUs = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref}>
      <div className="min-h-screen text-dark dark:text-light ">
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-main">
                Start Driving with Confidence
              </h1>

              <div className="space-y-4 text-lg">
                <p>
                  At DearDriving, we believe that learning to drive is more than
                  just mastering the rules of the road—it's about building
                  confidence, independence, and lifelong safety skills.
                </p>

                <p>
                  Founded in 2025, our experienced instructors bring a perfect
                  blend of professionalism and patience to every lesson,
                  ensuring you receive the highest quality driving education.
                </p>

                <p>
                  We pride ourselves on using modern teaching methods and
                  maintaining a fleet of well-maintained vehicles equipped with
                  the latest safety features. Our comprehensive curriculum
                  covers everything from basic vehicle control to advanced
                  defensive driving techniques.
                </p>
              </div>

              {/* <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-main hover:bg-mainDark text-white rounded-full transition-colors">
                Book a Lesson
              </button>
              <button className="px-6 py-3 bg-contraYellow hover:bg-contraYellow/90 text-dark rounded-full transition-colors">
                View Packages
              </button>
            </div> */}
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
    </section>
  );
});

export default AboutUs;
