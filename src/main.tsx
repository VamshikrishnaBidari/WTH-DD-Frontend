import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  Home,
  UserDashboard,
  ChatBox,
  UserApp,
  // EnrollCourses,
  Progress,
  Payments,
  Licensing,
  LicenseStatus,
  AccountSecurity,
  SupportCenter,
  InstructorApp,
  InstructorDashboard,
  StudentsList,
  TeacherCalendar,
  Personal,
  PreClassOverview,
  LiveClass,
  UserCalendar,
  CoordinatorApp,
  Profile,
  MyStudentsList,
  AllStudentsList,
  OwnerApp,
  OwnerDashboard,
  CoordinatorsList,
  InstructorsList,
  InstructorProfileView,
  // Configuration,
  CourseManager,
  NewCourse,
  Recruitment,
  UserProfile,
  Holiday,
  OwnerProfile,
  CoordinatorHome,
  LearnAndTest,
  MockTest,
  ReadingMaterial,
  Reviews,
  PracticeQuestions,
  CoordLogin,
  InstLogin,
  StudentProfile,
  OwnerLogin,
  SetNewPassword,
  CoordProfileView,
  PaymentsInfo,
  EnrollCourses02,
  LicenseProcess02,
  NotFound404,
} from "./pages/index.ts";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SocketProvider } from "./context/SocketProvider.tsx";
import { store, persistor } from "./app/store.ts";
import { getCurrentUser } from "./features/authSlice.ts";
import { registerPWA } from "./utils/registerPWA.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate
      loading={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading ...</p>
          </div>
        </div>
      }
      persistor={persistor}
      onBeforeLift={() => {
        store.dispatch(getCurrentUser());
      }}
    >
      <SocketProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <Toaster />
          <Router>
            {/* <Analytics />
            <SpeedInsights /> */}
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="" element={<Home />} />
                <Route path="*" element={<NotFound404 />} />
              </Route>
              <Route path="/forgot-password" element={<SetNewPassword />} />
              <Route path="/user" element={<UserApp />}>
                <Route path="" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="courses" element={<EnrollCourses02 />} />
                <Route path="progress" element={<Progress />} />
                <Route path="payments" element={<Payments />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="licensing" element={<Licensing />} />
                <Route path="license-status" element={<LicenseStatus />} />
                <Route path="chats" element={<ChatBox />} />
                <Route path="account-security" element={<AccountSecurity />} />
                {/* <Route path="notification-settings" element={<NotificationSettings />} /> */}
                <Route path="support" element={<SupportCenter />} />
                <Route path="bookings" element={<UserCalendar />} />
                <Route path="signals-quizzes" element={<LearnAndTest />} />
                <Route path="mock-test" element={<MockTest />} />
                <Route path="payments" element={<Payments />} />
                <Route path="reading-material" element={<ReadingMaterial />} />
                <Route
                  path="practice-questions"
                  element={<PracticeQuestions />}
                />
              </Route>
              <Route path="/instructor-login" element={<InstLogin />} />
              <Route path="/instructor" element={<InstructorApp />}>
                <Route path="" element={<InstructorDashboard />} />
                <Route path="students" element={<StudentsList />} />
                <Route path="calendar" element={<TeacherCalendar />} />
                {/* <Route path="chats" element={<InstChatBox />} /> */}
                <Route path="personal" element={<Personal />} />
                <Route
                  path="pre-class-overview/:courseId"
                  element={<PreClassOverview />}
                />
                <Route path="live-class/:courseId" element={<LiveClass />} />
                <Route path="account-security" element={<AccountSecurity />} />
                <Route
                  path="student-profile/:userId"
                  element={<StudentProfile />}
                />
                {/* <Route path="notification-settings" element={<NotificationSettings />} /> */}
                {/* <Route path="support" element={<SupportCenter />} /> */}
              </Route>
              <Route path="/coordinator-login" element={<CoordLogin />} />
              <Route path="/coordinator" element={<CoordinatorApp />}>
                <Route path="" element={<CoordinatorHome />} />
                <Route path="license" element={<LicenseProcess02 />} />
                <Route path="students" element={<MyStudentsList />} />
                <Route path="payments" element={<PaymentsInfo />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="student-profile/:userId"
                  element={<StudentProfile />}
                />
                <Route path="account-security" element={<AccountSecurity />} />
                {/* <Route path="support" element={<SupportCenter />} /> */}
              </Route>
              <Route path="/school-login" element={<OwnerLogin />} />
              <Route path="/school" element={<OwnerApp />}>
                <Route path="" element={<OwnerDashboard />} />
                <Route path="students" element={<AllStudentsList />} />
                <Route path="profile" element={<OwnerProfile />} />
                <Route path="instructors" element={<InstructorsList />} />
                <Route
                  path="instructor-details/:teacherId"
                  element={<InstructorProfileView />}
                />
                <Route path="holiday" element={<Holiday />} />
                <Route path="coordinators" element={<CoordinatorsList />} />
                <Route
                  path="coordinator-details/:operatorId"
                  element={<CoordProfileView />}
                />
                <Route path="course-manager" element={<CourseManager />} />
                {/* <Route path='configuration' element={<Configuration />} /> */}
                <Route path="new-course/:schoolId" element={<NewCourse />} />
                <Route path="recruitment/:schoolId" element={<Recruitment />} />
                <Route
                  path="student-profile/:userId"
                  element={<StudentProfile />}
                />
                <Route path="account-security" element={<AccountSecurity />} />
                {/* <Route path="notification-settings" element={<NotificationSettings />} /> */}
                {/* <Route path="support" element={<SupportCenter />} /> */}
              </Route>
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </SocketProvider>
    </PersistGate>
  </Provider>,
);


// if (import.meta.env.PROD) {
//   registerPWA();
// }

registerPWA();