import { Link } from "react-router-dom";

interface LinkItem {
  label: string;
  to: string;
}

interface SitemapSection {
  title: string;
  links: LinkItem[];
}

const SITEMAP: SitemapSection[] = [
  {
    title: "Courses & Services",
    links: [
      { label: "4-Wheeler Driving", to: "/" },
      { label: "2-Wheeler Driving", to: "/" },
      { label: "Advanced Skills", to: "/" },
      { label: "License Assistance", to: "/" },
    ],
  },
  {
    title: "Administration & Access",
    links: [
      // { label: "About", to: "/about" },
      { label: "Driving School Portal", to: "/school-login" },
      { label: "Instructor Portal", to: "/instructor-login" },
      { label: "Coordinator Portal", to: "/coordinator-login" },
    ],
  },
];

// const currentYear = new Date().getFullYear();

export default function Footer() {
  const handleAdminLinkClick = (to: string) => {
    // Navigate and then reload the page
    window.location.href = to;
  };

  return (
    <footer className="relative w-full bg-white dark:bg-gray-900">
      <div className="mx-auto w-full px-8 font-satoshi">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <h2 className="mb-4 font-satoshi font-medium uppercase text-blue-gray-900 opacity-50 dark:text-white dark:opacity-80 text-sm">
                {title}
              </h2>
              <ul className="space-y-1">
                {links.map((link, linkKey) => (
                  <li
                    key={linkKey}
                    className="font-satoshi text-blue-gray-900 dark:text-white"
                  >
                    {title === "Administration & Access" ? (
                      <button
                        onClick={() => handleAdminLinkClick(link.to)}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105 dark:hover:text-gray-300 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.to}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105 dark:hover:text-gray-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between dark:border-gray-700">
          <p className="mb-4 text-center font-satoshi text-blue-gray-900 dark:text-white md:mb-0">
            <Link
              to="/"
              className="font-satoshi font-bold text-blue-gray-900 dark:text-white"
            >
              Dear Driving
            </Link>
            {/* &copy; {currentYear} <Link to="/">Dear Driving</Link>. All Rights Reserved. */}
          </p>
        </div>
      </div>
    </footer>
  );
}
