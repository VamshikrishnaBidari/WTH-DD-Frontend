import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, Navigate } from "react-router-dom";
import { Welcome } from "../../../components";
import api from "../../../utils/axiosInstance";
import { setUser } from "../../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { User } from "../../../interfaces/models";
import ReviewDialog from "./ReviewPopUpDialog";

const UserApp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState<boolean>(false);
  const [showWelcomeSlide, setShowWelcomeSlide] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const dispatch = useDispatch();

  useEffect(() => {
    // Set a timer to hide the welcome slide after 1.5 seconds
    const timer = setTimeout(() => {
      setShowWelcomeSlide(false);
    }, 1500); // 1.5 seconds in milliseconds

    // Cleanup function to clear the timer if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/users/current-user");
      if (response.data.success) {
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (user?.isReviewed === false) {
      setShowReviewDialog(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {showWelcomeSlide && <Welcome username={user?.name} />}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-200 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <Header />
        <main className="mx-2 lg:mx-0">
          {user ? <Outlet /> : <Navigate to="/" />}
          <ReviewDialog
            isOpen={showReviewDialog}
            onClose={() => setShowReviewDialog(false)}
          />
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 text-gray-600 dark:text-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  );
};

export default UserApp;

// Usage Flow:
/*

UserApp:

  - UserDashboard (Home):
    Reschedule/Cancel button: onClick -> goes to UserCalendar page.
    
  - EnrollCourses (Courses):
    User selects a course and clicks on Proceed to booking button.
    Proceed to booking button: onClick -> pop up opens for questionnaire.
    after filling the questionnaire, it goes to Licensing page (Licensing.tsx).

  - Licensing:
    > 'I have submitted my docs' button turns green after clicking. It will be disabled after that. This info should be stored in db.
      Sometimes, user may need to upload the docs online to us. (This feature is not implemented yet.)
    > 'Check licensing status' button -> goes to License Status page (LicenseStatus.tsx)
    
  - LicenseStatus:
    // Download button - to download the LL that is uploaded by coordinator from his end.
    // Address bill pay button - uploading bill for proof of address. (This feature is not implemented yet. I don't think we need this online.)
    After this, Book Slots button will be enabled.
    Book Slots button -> goes to UserCalendar page (Bookings.tsx).

  - UserCalendar (Bookings):
    Reschedule button: onClick -> a dropdown opens there only with options.
    Cancel button: onClick -> a dropdown opens there only with options.
    User selects instructor and date from the calendar and clicks on Confirm button.
    Now this generates a course booking and user is sent to payment page (Payment.tsx).
  
  // - Payment:
  //   Pay Now button -> goes to Payment Gateway (not yet implemented).
  //   Bill buttons -> to download the bill/invoice.
  
  - Progress:
    Go to calendar button -> goes to UserCalendar page (Bookings.tsx).
    Home -> to home page (UserDashboard.tsx).
*/

/*
TODO:
- In license status page, make the dynamic section ui and functionality for updating progress of status.
- Think about notification system and settings.
// - Add Payment Gateway page and functionality.
- How to update Quick Notes
*/
