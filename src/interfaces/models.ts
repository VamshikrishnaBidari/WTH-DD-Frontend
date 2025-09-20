export enum GenderEnum {
  male = "male",
  female = "female",
  other = "other",
}

export enum OrderStatus {
  pending = "pending",
  success = "success",
  failed = "failed",
}

export enum UserType {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum LicenseStatus {
  Pending = "Pending",
  Completed = "Completed",
  InProgress = "InProgress",
}

export enum Rating {
  Poor = "Poor",
  Average = "Average",
  Good = "Good",
  Moderate = "Moderate",
  Excellent = "Excellent",
}

export enum Provider {
  google = "google",
  credentials = "credentials",
}

export enum StudentType {
  new = "new",
  old = "old",
}

export enum Holiday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
  None = "None",
}

export interface LicenseProcess {
  id?: string;
  userId?: string;
  user?: User;
  documentVerification?: string;
  llApplication?: string;
  llTestBooking?: string;
  llTestDay?: string;
  dlApplication?: string;
  dlTestBooking?: string;
  dlTestDay?: string;
  submitted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name?: string;
  age?: string;
  studentType?: "new" | "old";
  purpose?: string;
  phoneNumber?: string;
  image?: string;
  location?: Record<string, any>;
  password?: string;
  email?: string;
  clerkId?: string;
  gender?: GenderEnum;
  role?: string;
  refreshToken?: string;
  orders?: Order[];
  progress?: LicenseProcess;
  weekCalendar?: WeekCalendarUser;
  courses?: Course[];
  reviews?: Review[];
  schoolId?: string;
  googleId?: string;
  provider?: Provider;
  Document?: LicenseStatus;
  LL?: LicenseStatus;
  RTO?: LicenseStatus;
  License?: LicenseStatus;
  pushSubscription?: string;
  mockTestScore?: number;
  drivingLicense?: string;
  learnersLicense?: string;
  issues?: Issue[];
  school?: DrivingSchool;
  createdAt?: string;
  updatedAt?: string;
  llAppn?: LLAppn;
  dlAppn?: DLAppn;
  Holiday?: Holiday;
  courseFee?: number;
  licenseFee?: number;
  extraFee?: number;
  branchId?: string;
  branch?: Branch;
  optrAssistLogs?: OperatorAssistanceLog[];
  PaymentHistory?: PaymentHistory[];
  isReviewed?: boolean;
}

export interface LLAppn {
  id?: string;
  userId?: string;
  user?: User;
  status?: string;
  applicationNumber?: string;
  dateOfBirth?: string;
  testDate?: string;
  testTime?: string;
  testResult?: string;
  llPdfUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DLAppn {
  id?: string;
  userId?: string;
  user?: User;
  applicationNumber?: string;
  llnumber?: string;
  oldDlnumber?: string;
  dateOfBirth?: string;
  testDate?: string;
  testTime?: string;
  testResult?: string;
  dlPdfUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Teacher {
  id?: string;
  name?: string;
  age?: string;
  phoneNumber?: string;
  image?: string;
  location?: Record<string, any>;
  password?: string;
  gender?: GenderEnum;
  role?: string;
  email?: string;
  courses?: Course[];
  refreshToken?: string;
  attendence?: string[];
  schoolId?: string;
  school?: DrivingSchool;
  teacherId?: string;
  reviews?: Review[];
  teacherCalendar?: Calendar[];
  canceledClasses?: number;
  classesRescheduled?: number;
  experience?: number;
  availability?: Availability[];
  weekCalendar?: WeekCalendarTeacher;
  calendar?: TeacherCalendar;
  licenseNumber?: string;
  registrationNumber?: string[];
  vehicle?: string[];
  expertise?: string[];
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
  branchId?: string;
  branch?: Branch;
  Holiday?: Holiday;
}

export interface DrivingSchool {
  id?: string;
  name?: string;
  role?: string;
  location?: string;
  schoolName?: string;
  schoolEmail?: string;
  schoolLogo?: string;
  email?: string;
  image?: string;
  phoneNumber?: string;
  Holiday?: string;
  password?: string;
  expertiseIn?: string;
  yearsOfExperience?: number;
  dateJoined?: string;
  syllabus?: Syllabus[];
  vehicleSyllabus?: VSyllabus[];
  refreshToken?: string;
  termsAndCondition?: string;
  revenue?: number;
  teachers?: Teacher[];
  users?: User[];
  slots?: Slots[];
  calendar?: Calendar[];
  operator?: Operator[];
  teacherCount?: number;
  userCount?: number;
  issues?: Issue[];
  createdAt?: string;
  updatedAt?: string;
  courseCombos?: CourseCombo[];
  licenseSyllabus?: LicenseSyllabus[];
  licenseSyllabusCombos?: LicenseSyllabusCombo[];
  branches?: Branch[];
}

export interface Operator {
  id?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  image?: string;
  password?: string;
  schoolId?: string;
  role?: string;
  school?: DrivingSchool;
  refreshToken?: string;
  operatorId?: string;
  expertiseIn?: string;
  workingDays?: string;
  workingHours?: string;
  experience?: number;
  rating?: number;
  LLcount?: number;
  DLcount?: number;
  studentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  branchId?: string;
  branch?: Branch;
  Holiday?: Holiday;
  assistLogs?: OperatorAssistanceLog[];
}

export interface Availability {
  id?: string;
  workingDays?: string;
  workingHours?: string;
  teacherId?: string;
  teacher?: Teacher;
}

export interface Syllabus {
  id?: string;
  compId?: number;
  vehicle?: string;
  price?: number;
  classes?: number;
  theoryClasses?: number;
  practicalClasses?: number;
  LLamount?: number;
  classesAmount?: number;
  LicenseAmount?: number;
  timePeriod?: string;
  description?: string;
  schoolId?: string;
  school?: DrivingSchool;
  branchId?: string;
  branch?: Branch;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id?: string;
  rating?: number;
  comment?: string;
  userId?: string;
  user?: User;
  teacherId?: string;
  teacher?: Teacher;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id?: string;
  userId?: string;
  vehicle?: string;
  type?: string;
  user?: User;
  teacherId?: string;
  teacher?: Teacher;
  amount?: number;
  classesTaken?: number;
  classesTotal?: number;
  studentAttendence?: number;
  teacherAttendence?: number;
  pendingAmount?: number;
  installments?: boolean;
  completed?: boolean;
  stars?: number;
  userCalendar?: UserCalendar;
  history?: ClassHistory[];
  classDuration?: number;
  canceledClasses?: number;
  classesRescheduled?: number;
  order?: Order[];
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string;
  classStart?: string;
  weekClassLimit?: number;
  isReviewed?: boolean;
}

export interface Order {
  id?: string;
  userId?: string;
  type?: string;
  user?: User;
  courseId?: string;
  course?: Course;
  razorpayId?: string;
  status?: OrderStatus;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleSyllabus {
  id?: string;
  day?: number;
  title?: string;
  keyPoints?: string;
  description?: string;
  syllabusId?: string;
  syllabus?: VSyllabus;
}

export interface VSyllabus {
  id?: string;
  vehicle?: string;
  schoolId?: string;
  school?: DrivingSchool;
  branchId?: string;
  branch?: Branch;
  vehicleSyllabus?: VehicleSyllabus[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WeekCalendarUser {
  id?: string;
  slots?: string[];
  userId?: string;
  user?: User;
  originalSlots?: string[];
  canceledSlots?: string[];
  holidaySlots?: string[];
  addClassSlots?: string[];
}

export interface WeekCalendarTeacher {
  id?: string;
  slots?: string[];
  teacherId?: string;
  teacher?: Teacher;
}

export interface TeacherCalendar {
  id?: string;
  slots?: string[];
  teacherId?: string;
  teacher?: Teacher;
}

export interface ClassHistory {
  id?: string;
  rating?: Rating;
  feedback?: string;
  courseId?: string;
  course?: Course;
  createdAt?: string;
}

export interface Slots {
  id?: string;
  day?: string;
  slotNumber?: string;
  time?: string;
  schoolId?: string;
  school?: DrivingSchool;
  branchId?: string;
  branch?: Branch;
}

export interface UserCalendar {
  id?: string;
  courseId?: string;
  course?: Course;
  slots?: string[];
}

export interface Calendar {
  id?: string;
  teacherId?: string;
  teacher?: Teacher;
  schoolId?: string;
  school?: DrivingSchool;
  branchId?: string;
  branch?: Branch;
  slots?: CalendarSlots[];
  weeklySlots?: WeeklySlot[];
  canceledSlots?: CanceledSlot[];
  availableDates?: string[];
  bookedDates?: BookedDate[];
  holidaySlots?: string[];
  addClassSlots?: AddClassSlot[];
}

export interface CalendarSlots {
  id?: string;
  day?: string;
  availableDates?: string[];
  bookedDates?: BookedDate[];
  calendarId?: string;
  calendar?: Calendar;
}

export interface BookedDate {
  id?: string;
  slot?: string;
  courseId?: string;
  userId?: string;
  slotId?: string;
  calendarSlot?: CalendarSlots;
}

export interface CanceledSlot {
  id?: string;
  slot?: string;
  courseId?: string;
  userId?: string;
  calendarId?: string;
  calendar?: Calendar;
}

export interface WeeklySlot {
  id?: string;
  slot?: string;
  courseId?: string;
  userId?: string;
  calendarId?: string;
  calendar?: Calendar;
}

export interface Chat {
  id?: string;
  senderId?: string;
  senderType?: UserType;
  receiverId?: string;
  receiverType?: UserType;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Issue {
  id?: string;
  userId?: string;
  schoolId?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  school?: DrivingSchool;
  branchId?: string;
  branch?: Branch;
}

export interface PaymentHistory {
  id?: string;
  feeType?: string;
  amount?: number;
  paymentMethod?: string;
  Date?: string;
  description?: string;
  userId?: string;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseCombo {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  schoolId?: string;
  school?: DrivingSchool;
  createdAt?: string;
  updatedAt?: string;
}

export interface LicenseSyllabus {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  schoolId?: string;
  school?: DrivingSchool;
  createdAt?: string;
  updatedAt?: string;
}

export interface LicenseSyllabusCombo {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  schoolId?: string;
  school?: DrivingSchool;
  createdAt?: string;
  updatedAt?: string;
}

export interface Branch {
  id?: string;
  name?: string;
  location?: string;
  phoneNumber?: string;
  branchNo?: number;
  email?: string;
  image?: string;
  branchManager?: string;
  schoolId?: string;
  school?: DrivingSchool;
  isActive?: boolean;
  revenue?: number;
  Holiday?: Holiday;
  teachers?: Teacher[];
  users?: User[];
  operators?: Operator[];
  syllabus?: Syllabus[];
  vSyllabus?: VSyllabus[];
  slots?: Slots[];
  calendars?: Calendar[];
  issues?: Issue[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddClassSlot {
  id?: string;
  slot?: string;
  courseId?: string;
  userId?: string;
  calendarId?: string;
  calendar?: Calendar;
}

export interface OperatorAssistanceLog {
  id?: string;
  operatorId?: string;
  operator?: Operator;
  studentId?: string;
  student?: User;
  assistedAt?: string;
}
