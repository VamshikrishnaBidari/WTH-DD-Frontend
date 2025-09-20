import React, { useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { User } from "../../../interfaces/models";

interface FAQ {
  title: string;
  data: {
    question: string;
    answer: string;
  }[];
}

const faqs: FAQ[] = [
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
          "Yes! We provide mock tests and practical exam preparation to help you pass on your first attempt. You will also get Reading Notes online with Practice Questions.",
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
          "You can reach us through chat support, email at deardriving1@gmail.com, or call our 24/7 helpline at 6366281509.",
      },
    ],
  },
];

const SupportCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("General");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [issueText, setIssueText] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [loading, setLoading] = useState<boolean>(false);

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(question)) {
      newExpanded.delete(question);
    } else {
      newExpanded.add(question);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleSubmitIssue = async () => {
    if (!issueText.trim()) {
      toast.error("Please describe the issue before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/users/issue", {
        userId: user?.id,
        schoolId: user?.schoolId,
        description: issueText,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Issue submitted successfully!");
        setIssueText("");
      } else {
        toast.error(
          response.data.message || "Failed to submit issue. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("An error occurred while submitting the issue.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 font-satoshi">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Support Center
          </h1>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
              <nav className="space-y-2">
                {faqs.map((category) => (
                  <button
                    key={category.title}
                    onClick={() => setSelectedCategory(category.title)}
                    className={`w-full font-bold text-left md:text-sm px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.title
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              {faqs
                .find((cat) => cat.title === selectedCategory)
                ?.data.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.question)}
                      className="w-full flex justify-between items-center py-4 text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedQuestions.has(faq.question)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {expandedQuestions.has(faq.question) && (
                      <p className="pb-4 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Support Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* Flag Issue Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 h-full">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Raise an issue
              </h3>
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                placeholder="Describe the issue... Please include your mobile number for faster resolution."
              />
              <button
                onClick={handleSubmitIssue}
                className="w-full mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-medium transition-colors"
              >
                Submit Issue
              </button>
            </div>
          </div>

          {/* Phone Support */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center h-full flex flex-col">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Phone className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Call Us
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    For tech issues:
                  </div>
                  <a
                    href="tel:6366281509"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    6366281509
                  </a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    For driving related:
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 text-center h-full flex flex-col">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Mail className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Email Support
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    For tech issues:
                  </div>
                  <a
                    href="mailto:deardriving1@gmail.com"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    deardriving1@gmail.com
                  </a>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    For driving related:
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
