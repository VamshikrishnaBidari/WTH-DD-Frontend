import React, { JSX, useState, useEffect, useCallback } from "react";
// import { User } from '../../../interfaces/models';
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../../features/courseSlice";
import { RootState } from "../../../app/store";
import FirstDayQueries from "./FirstDayQueries";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { Course, User } from "../../../interfaces/models";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseUI {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  price: number;
  tag?: string;
  vehicle?: string;
  type?: string;
  govtType?: string;
  classes?: number;
  timePeriod?: number;
  LLamount?: number;
  LicenseAmount?: number;
  classesAmount?: number;
}

const TruckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="57"
      height="40"
      viewBox="0 0 57 40"
    >
      <g>
        <rect
          x="0"
          y="0"
          width="57"
          height="40"
          rx="0"
          fill="#000000"
          fillOpacity="0"
          style={{ mixBlendMode: "normal" }}
        />
        <g transform="matrix(1,0,0,-1,0,76)">
          <path
            d="M4.275,74Q2.49375,73.9297,1.24687,73.0156Q0.0890625,72.0312,0,70.625L0,48.125Q0.0890625,46.71875,1.24687,45.73438Q2.49375,44.82031,4.275,44.75L5.7,44.75Q5.78906,41.86719,8.19375,39.96875Q10.5984,38.0703125,14.25,38Q17.9016,38.0703125,20.3062,39.96875Q22.7109,41.86719,22.8,44.75L34.2,44.75Q34.2891,41.86719,36.6937,39.96875Q39.0984,38.0703125,42.75,38Q46.4016,38.0703125,48.8062,39.96875Q51.2109,41.86719,51.3,44.75L54.15,44.75Q55.3969,44.75,56.1984,45.38281Q57,46.01562,57,47Q57,47.98438,56.1984,48.6172Q55.3969,49.25,54.15,49.25L54.15,53.75L54.15,56L54.15,57.335899999999995Q54.15,59.164100000000005,52.4578,60.5L45.6,65.9141Q43.9078,67.25,41.5922,67.25L37.05,67.25L37.05,70.625Q36.9609,72.0312,35.8031,73.0156Q34.5562,73.9297,32.775,74L4.275,74ZM37.05,62.75L41.5922,62.75L37.05,62.75L41.5922,62.75L48.45,57.335899999999995L48.45,56L37.05,56L37.05,62.75ZM9.975,44.75Q10.0641,46.64844,12.1125,47.70312Q14.25,48.5469,16.3875,47.70312Q18.4359,46.64844,18.525,44.75Q18.4359,42.85156,16.3875,41.79688Q14.25,40.95312,12.1125,41.79688Q10.0641,42.85156,9.975,44.75ZM42.75,48.125Q45.1547,48.0547,46.4906,46.4375Q47.5594,44.75,46.4906,43.0625Q45.1547,41.44531,42.75,41.375Q40.3453,41.44531,39.0094,43.0625Q37.9406,44.75,39.0094,46.4375Q40.3453,48.0547,42.75,48.125Z"
            fill="#005EFF"
            fillOpacity="1"
            style={{ mixBlendMode: "normal" }}
          />
        </g>
      </g>
    </svg>
  );
};

const CarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <defs>
        <clipPath id="master_svg0_404_09927">
          <rect x="0" y="0" width="36" height="36" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_404_09927)">
        <g transform="matrix(1,0,0,-1,0,69.046875)">
          <g>
            <path
              d="M9.49219,60.046837499999995L7.66406,54.7734375L9.49219,60.046837499999995L7.66406,54.7734375L28.3359,54.7734375L26.5078,60.046837499999995Q25.9453,61.4531375,24.3984,61.5234375L11.6016,61.5234375Q10.0547,61.4531375,9.49219,60.046837499999995ZM2.8125,54.421837499999995L5.27344,61.5234375L2.8125,54.421837499999995L5.27344,61.5234375Q5.97656,63.562537500000005,7.73438,64.7578375Q9.42188,66.0234375,11.6016,66.0234375L24.3984,66.0234375Q26.5781,66.0234375,28.2656,64.7578375Q30.0234,63.562537500000005,30.7266,61.5234375L33.1875,54.421837499999995Q34.4531,53.9296375,35.2266,52.8046375Q36,51.6796375,36,50.2734375L36,40.1484375L36,36.7734375Q36,35.7890575,35.3672,35.1562495Q34.7344,34.5234375,33.75,34.5234375L31.5,34.5234375Q30.5156,34.5234375,29.8828,35.1562495Q29.25,35.7890575,29.25,36.7734375L29.25,40.1484375L6.75,40.1484375L6.75,36.7734375Q6.75,35.7890575,6.11719,35.1562495Q5.48438,34.5234375,4.5,34.5234375L2.25,34.5234375Q1.26562,34.5234375,0.632812,35.1562495Q0,35.7890575,0,36.7734375L0,40.1484375L0,50.2734375Q0,51.6796375,0.773438,52.8046375Q1.54688,53.9296375,2.8125,54.421837499999995ZM9,48.0234375Q9,49.0078375,8.36719,49.6406375Q7.73438,50.2734375,6.75,50.2734375Q5.76562,50.2734375,5.13281,49.6406375Q4.5,49.0078375,4.5,48.0234375Q4.5,47.0390375,5.13281,46.4062375Q5.76562,45.7734375,6.75,45.7734375Q7.73438,45.7734375,8.36719,46.4062375Q9,47.0390375,9,48.0234375ZM29.25,45.7734375Q30.2344,45.7734375,30.8672,46.4062375Q31.5,47.0390375,31.5,48.0234375Q31.5,49.0078375,30.8672,49.6406375Q30.2344,50.2734375,29.25,50.2734375Q28.2656,50.2734375,27.6328,49.6406375Q27,49.0078375,27,48.0234375Q27,47.0390375,27.6328,46.4062375Q28.2656,45.7734375,29.25,45.7734375Z"
              fill="#145CFF"
              fillOpacity="1"
              style={{ mixBlendMode: "normal" }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const BikeLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    version="1.1"
    width="45"
    height="36"
    viewBox="0 0 45 36"
    {...props}
  >
    <defs>
      <clipPath id="master_svg0_391_09397">
        <rect x="0" y="0" width="45" height="36" rx="0" />
      </clipPath>
    </defs>
    <g clipPath="url(#master_svg0_391_09397)">
      <g transform="matrix(1,0,0,-1,0,69.046875)">
        <g>
          <path
            d="M19.6875,66.0234375Q18.1406,65.8828375,18,64.3359375Q18.1406,62.7890375,19.6875,62.6484375L23.7656,62.6484375L24.8906,60.5390375L18,54.7734375L14.8359,57.937537500000005Q13.5,59.2734375,11.6016,59.2734375L4.5,59.2734375Q3.51562,59.2734375,2.88281,58.6406375Q2.25,58.0078375,2.25,57.0234375L2.25,54.7734375L9,54.7734375Q13.7812,54.6328375,16.9453,51.4687375Q20.1094,48.3046375,20.25,43.5234375Q20.25,42.3281275,20.0391,41.2734375L24.9609,41.2734375Q24.75,42.3281275,24.75,43.5234375Q24.75,46.3359375,25.9453,48.6562375Q27.1406,50.9765375,29.25,52.5234375L30.3047,50.4843375Q27.1406,47.8828375,27,43.5234375Q27.0703,39.7265575,29.6016,37.1249975Q32.2031,34.59375,36,34.5234375Q39.7969,34.59375,42.3984,37.1249975Q44.9297,39.7265575,45,43.5234375Q44.9297,47.3203375,42.3984,49.9218375Q39.7969,52.4531375,36,52.5234375Q34.5938,52.5234375,33.2578,52.1015375L29.3906,59.2734375L33.75,59.2734375Q34.7344,59.2734375,35.3672,59.9062375Q36,60.5390375,36,61.5234375L36,63.7734375Q36,64.7578375,35.3672,65.3906375Q34.7344,66.0234375,33.75,66.0234375L32.3438,66.0234375Q31.5,66.0234375,30.8672,65.5312375L27.5625,62.7187375L26.5781,64.5468375Q25.7344,65.9531375,24.1172,66.0234375L19.6875,66.0234375ZM32.5547,46.4062375L34.5234,42.7499975L32.5547,46.4062375L34.5234,42.7499975Q35.3672,41.4140575,36.7734,42.0468775Q38.1094,42.8906275,37.4766,44.2968775L35.5078,48.0234375Q35.7188,48.0234375,36,48.0234375Q37.8984,47.9531375,39.1641,46.6875375Q40.4297,45.4218375,40.5,43.5234375Q40.4297,41.6249975,39.1641,40.3593775Q37.8984,39.0937475,36,39.0234375Q34.1016,39.0937475,32.8359,40.3593775Q31.5703,41.6249975,31.5,43.5234375Q31.5,45.2109375,32.5547,46.4062375ZM13.1484,41.8359375Q12.6562,40.5703175,11.5312,39.7968775Q10.4062,39.0234375,9,39.0234375Q7.10156,39.0937475,5.83594,40.3593775Q4.57031,41.6249975,4.5,43.5234375Q4.57031,45.4218375,5.83594,46.6875375Q7.10156,47.9531375,9,48.0234375Q10.4062,48.0234375,11.5312,47.2500375Q12.6562,46.4765375,13.1484,45.2109375L17.8594,45.2109375Q17.1562,48.3750375,14.7656,50.4140375Q12.375,52.4531375,9,52.5234375Q5.20312,52.4531375,2.60156,49.9218375Q0.0703125,47.3203375,0,43.5234375Q0.0703125,39.7265575,2.60156,37.1249975Q5.20312,34.59375,9,34.5234375Q12.375,34.59375,14.7656,36.6328175Q17.1562,38.6718775,17.8594,41.8359375L13.1484,41.8359375ZM9,41.2734375Q9.98438,41.2734375,10.6172,41.9062475Q11.25,42.5390575,11.25,43.5234375Q11.25,44.5078175,10.6172,45.1406375Q9.98438,45.7734375,9,45.7734375Q8.01562,45.7734375,7.38281,45.1406375Q6.75,44.5078175,6.75,43.5234375Q6.75,42.5390575,7.38281,41.9062475Q8.01562,41.2734375,9,41.2734375Z"
            fill="#145CFF"
            fillOpacity="1"
          />
        </g>
      </g>
    </g>
  </svg>
);

const EnrollCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const user = useSelector(
    (state: RootState) => state.auth.user,
  ) as User | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isQueriesOpen, setIsQueriesOpen] = useState(false);

  // Check if user is already enrolled in a course for a specific vehicle
  const isEnrolledInVehicle = useCallback(
    (vehicle: string): boolean => {
      if (!user?.courses) return false;
      return user.courses.some((course) => course.vehicle === vehicle);
    },
    [user?.courses],
  );

  // Vehicle type mappings
  const getVehicleIcon = (vehicle: string): JSX.Element => {
    const vehicleLower = vehicle.toLowerCase();

    if (vehicleLower.includes("scooter") || vehicleLower.includes("activa")) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="50"
          height="50"
          viewBox="0 0 256 256"
          fill="#155cff"
        >
          <g
            className="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <path
              d="M 57.412 20.601 c -0.284 0 -0.57 -0.08 -0.824 -0.248 c -2.996 -1.975 -6.797 -2.098 -11.618 -0.378 c -0.781 0.28 -1.638 -0.128 -1.917 -0.909 s 0.128 -1.639 0.909 -1.917 c 5.769 -2.056 10.439 -1.829 14.276 0.699 c 0.691 0.456 0.883 1.386 0.428 2.078 C 58.377 20.364 57.899 20.601 57.412 20.601 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 64.544 25.451 l 3.271 -0.971 c 0.442 -0.131 0.745 -0.537 0.745 -0.998 v -5.698 c 0 -0.589 -0.494 -1.062 -1.083 -1.047 c -3.179 0.082 -5.184 1.631 -5.918 4.768 C 61.983 23.24 62.906 24.609 64.544 25.451 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 20.261 28.954 h 9.335 c 4.904 0 8.88 3.976 8.88 8.88 v 0.35 H 11.381 v -0.35 C 11.38 32.929 15.356 28.954 20.261 28.954 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 57.283 17.563 l -0.911 0.719 c -0.588 0.464 -0.719 1.298 -0.317 1.931 C 81.017 59.515 26.962 58.688 39.04 38.314 c 0.577 -0.974 -0.104 -2.208 -1.236 -2.208 H 11.926 c -0.119 0 -0.241 0.013 -0.357 0.039 C 4.155 37.833 1.516 46.108 0.022 54.671 c -0.156 0.892 0.528 1.71 1.433 1.71 H 4.72 c 0.059 0 0.118 -0.004 0.176 -0.011 l 22.254 -2.721 c 0.112 -0.014 0.225 -0.014 0.337 -0.002 l 3.693 0.41 c 0.539 0.06 1 0.415 1.196 0.921 L 34.315 60 c 0.216 0.56 0.755 0.93 1.356 0.93 H 64.53 c 0.498 0 0.962 -0.255 1.228 -0.676 l 5.552 -8.772 c 0.098 -0.155 0.166 -0.326 0.2 -0.506 l 1.62 -8.535 c 0.044 -0.23 0.033 -0.469 -0.033 -0.694 c -2.638 -9.016 -7.401 -17.456 -13.877 -24.073 C 58.702 17.146 57.863 17.105 57.283 17.563 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(87,134,204); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 87.007 51.142 l 2.232 -2.151 c 1.096 -1.057 0.998 -2.866 -0.235 -3.758 c -3.187 -2.306 -7.105 -3.666 -11.34 -3.666 c -9.735 0 -17.792 7.184 -19.159 16.54 c -0.217 1.488 0.945 2.824 2.449 2.824 l 5.878 0 c 1.173 0 2.193 -0.829 2.412 -1.981 c 1.246 -6.536 7.077 -8.291 15.695 -7.143 C 85.695 51.907 86.458 51.671 87.007 51.142 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 22.574 48.595 c -6.812 0 -12.335 5.522 -12.335 12.335 c 0 6.812 5.522 12.334 12.335 12.334 s 12.335 -5.522 12.335 -12.334 C 34.908 54.118 29.386 48.595 22.574 48.595 z M 22.574 65.909 c -2.75 0 -4.979 -2.229 -4.979 -4.979 c 0 -2.75 2.229 -4.979 4.979 -4.979 s 4.979 2.229 4.979 4.979 C 27.553 63.68 25.324 65.909 22.574 65.909 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,70,111); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 36.232 58.973 c 0.941 0 1.697 -0.813 1.598 -1.748 c -0.791 -7.509 -6.752 -13.068 -14.856 -13.068 c -7.917 0 -15.369 5.307 -18.531 12.554 c -0.465 1.066 0.297 2.263 1.46 2.263 h 3.298 H 36.232 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 77.664 48.595 c -6.812 0 -12.335 5.522 -12.335 12.335 c 0 6.812 5.522 12.334 12.335 12.334 c 6.812 0 12.335 -5.522 12.335 -12.334 C 89.999 54.118 84.477 48.595 77.664 48.595 z M 77.664 65.909 c -2.75 0 -4.979 -2.229 -4.979 -4.979 c 0 -2.75 2.229 -4.979 4.979 -4.979 c 2.75 0 4.979 2.229 4.979 4.979 C 82.644 63.68 80.414 65.909 77.664 65.909 z"
              className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,70,111); fill-rule: nonzero; opacity: 1;"
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
          </g>
        </svg>
      );
    } else if (
      vehicleLower.includes("bike") ||
      vehicleLower.includes("motorcycle")
    ) {
      return <BikeLogo />;
    } else if (
      vehicleLower.includes("truck") ||
      vehicleLower.includes("commercial") ||
      vehicleLower.includes("4-wheeler")
    ) {
      return <TruckIcon />;
    } else if (vehicleLower.includes("car")) {
      return <CarIcon />;
    } else {
      // Default icon
      return <CarIcon />;
    }
  };

  // const getVehicleTitle = (vehicle: string): string => {
  //   const vehicleLower = vehicle.toLowerCase();

  //   if (vehicleLower.includes('scooter') || vehicleLower.includes('activa')) {
  //     return 'Scooter/Activa';
  //   } else if (vehicleLower.includes('bike') || vehicleLower.includes('motorcycle')) {
  //     return 'Bike Learning';
  //   } else if (vehicleLower.includes('car')) {
  //     return 'Car Learning';
  //   } else if (vehicleLower.includes('truck') || vehicleLower.includes('commercial') || vehicleLower.includes('4-wheeler')) {
  //     return 'Commercial 4-Wheeler';
  //   } else {
  //     // Capitalize first letter of each word
  //     return vehicle.split(' ').map(word =>
  //       word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //     ).join(' ');
  //   }
  // };

  const getCourseGovtType = (vehicle: string): string => {
    const govtTypeMap: { [key: string]: string } = {
      "scooty-activa": "MCWOG",
      bike: "MCWG",
      motorcycle: "MCWG",
      scooter: "MCWOG",
      "scooter/activa": "MCWOG",
      activa: "MCWOG",
      car: "LMV",
      "car-personal": "LMV",
      "car-commercial": "LMV-TR",
    };

    return govtTypeMap[vehicle] || "";
  };

  const getCourseDescription = (vehicle: string): string => {
    const vehicleLower = vehicle.toLowerCase();

    if (vehicleLower.includes("scooter") || vehicleLower.includes("activa")) {
      return "Comprehensive training for scooter and activa driving.";
    } else if (
      vehicleLower.includes("bike") ||
      vehicleLower.includes("motorcycle")
    ) {
      return "Complete motorcycle training program with experienced instructors.";
    } else if (
      vehicleLower.includes("truck") ||
      vehicleLower.includes("commercial") ||
      vehicleLower.includes("4-wheeler")
    ) {
      return "Specialized training for commercial vehicle driving.";
    } else if (vehicleLower.includes("car")) {
      return "Complete car driving course covering safety & road rules.";
    } else {
      return `Professional ${vehicle} driving training with expert instructors.`;
    }
  };

  const getCourseTag = (vehicle: string): string | undefined => {
    const vehicleLower = vehicle.toLowerCase();

    if (vehicleLower.includes("car") && !vehicleLower.includes("commercial")) {
      return "POPULAR";
    }
    // else if (vehicleLower.includes('truck') || vehicleLower.includes('commercial') || vehicleLower.includes('4-wheeler')) {
    //   return 'COMING SOON';
    // }
    return undefined;
  };

  const getCourses = useCallback(async () => {
    if (!user?.schoolId || !import.meta.env.VITE_SCHOOL_ID) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/driving/get-syllabus`, {
        schoolId: user.schoolId || import.meta.env.VITE_SCHOOL_ID,
      });

      if (response.data.success && response.data.syllabus) {
        console.log("Syllabus data:", response.data);
        const syllabusData = response.data.syllabus?.syllabus || [];

        // Transform API data to UI format
        const transformedCourses: CourseUI[] = syllabusData.map(
          (course: any) => ({
            id: course.vehicle,
            icon: getVehicleIcon(course.vehicle),
            title: course.description,
            description: getCourseDescription(course.vehicle),
            price: course.classesAmount || course.price,
            tag: getCourseTag(course.vehicle),
            vehicle: course.vehicle,
            type: course.type,
            govtType: getCourseGovtType(course.vehicle),
            classes: course.classes,
            timePeriod: course.timePeriod,
            LLamount: course.LLamount,
            LicenseAmount: course.LicenseAmount,
            classesAmount: course.classesAmount,
          }),
        );
        console.log(transformedCourses);
        setCourses(transformedCourses);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const classStart = new Date();
  const expiresAtDate = new Date(classStart);
  expiresAtDate.setDate(classStart.getDate() + 120);
  const courseDataArray = selectedCourses.map((courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return {
      userId: user?.id,
      vehicle: courseId,
      type:
        course?.type ||
        (courseId === "bike" ||
        courseId === "scooter/activa" ||
        courseId.toLowerCase().includes("bike") ||
        courseId.toLowerCase().includes("scooter")
          ? "two-wheeler"
          : "four-wheeler"),
      amount: course?.classesAmount || 0,
      classesTotal: course?.classes || 15,
      schoolId: user?.schoolId || import.meta.env.VITE_SCHOOL_ID,
      installments: true,
      classStart: classStart.toISOString(),
      expiresAt: expiresAtDate.toISOString(),
      classDuration: Number(course?.timePeriod) || 60,
    };
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course to enroll.");
      return;
    }
    if (!user?.progress?.submitted) {
      for (const course of courseDataArray) {
        if (course) {
          dispatch(addCourse(course));
          setIsQueriesOpen(true);
          return;
        }
      }
    } else {
      try {
        for (const data of courseDataArray) {
          const response = await api.post("/courses/create", data);
          if (response.data.success) {
            dispatch(addCourse(response.data.data));
          }
        }
        toast.success("Courses enrolled successfully!");
        navigate("/user/bookings");
      } catch {
        toast.error("Failed to enroll in courses.");
      }
    }
  };

  const areAllCoursesCompleted = (courses: Course[]): boolean => {
    if (!courses || courses.length === 0) {
      return true; // If no courses, consider as "completed" state
    }

    return courses.every((course) => {
      // Check if course is marked as completed
      if (course.completed === true) {
        return true;
      }

      // Check if all classes are taken (classesTaken / classesTotal = 1)
      if (course.classesTaken === course.classesTotal) {
        return true;
      }

      return false;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-2 py-6 lg:p-6">
      {user?.courses && !areAllCoursesCompleted(user?.courses) && (
        <div className="fixed inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-30">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Already Enrolled in a Course!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Dear {user.name}, you are already enrolled in a course. <br />
              Please complete your current course before enrolling in a new one.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="flex mx-auto mt-4 items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="inline">Back</span>
            </button>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 text-center mb-12">
          Choose Your Course
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No courses available at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* Info: Only one of Scooter/Activa or Bike can be selected */}
            {selectedCourses.some((id) => {
              const course = courses.find((c) => c.id === id);
              return (
                course?.vehicle?.toLowerCase().includes("scooter") ||
                course?.vehicle?.toLowerCase().includes("activa") ||
                course?.vehicle?.toLowerCase().includes("bike")
              );
            }) && (
              <div className="mb-4 text-blue-600 dark:text-blue-400 text-center font-medium">
                You can select either <b>Scooter/Activa</b> or <b>Bike</b>, not
                both at the same time.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {courses.map((course) => {
                const isComingSoon = course.tag === "COMING SOON";
                const isEnrolled = isEnrolledInVehicle(
                  course.vehicle || course.id,
                );
                const isScooterOrBike =
                  course.vehicle?.toLowerCase().includes("scooter") ||
                  course.vehicle?.toLowerCase().includes("activa") ||
                  course.vehicle?.toLowerCase().includes("bike");

                return (
                  <div
                    key={course.id}
                    onClick={
                      isComingSoon || isEnrolled
                        ? undefined
                        : () => {
                            setSelectedCourses((prev) => {
                              // If the clicked course is scooter/bike type, ensure only one of them can be selected
                              if (isScooterOrBike) {
                                // Remove other scooter/bike courses if present
                                const filteredOthers = prev.filter((id) => {
                                  const otherCourse = courses.find(
                                    (c) => c.id === id,
                                  );
                                  return (
                                    !(
                                      otherCourse?.vehicle
                                        ?.toLowerCase()
                                        .includes("scooter") ||
                                      otherCourse?.vehicle
                                        ?.toLowerCase()
                                        .includes("activa") ||
                                      otherCourse?.vehicle
                                        ?.toLowerCase()
                                        .includes("bike")
                                    ) || id === course.id
                                  );
                                });

                                if (filteredOthers.includes(course.id)) {
                                  // Deselect if already selected
                                  return filteredOthers.filter(
                                    (id) => id !== course.id,
                                  );
                                } else {
                                  // Select this, ensure others are not present
                                  return [
                                    ...filteredOthers.filter(
                                      (id) => id !== course.id,
                                    ),
                                    course.id,
                                  ];
                                }
                              } else {
                                // For other courses, toggle as usual
                                return prev.includes(course.id)
                                  ? prev.filter((id) => id !== course.id)
                                  : [...prev, course.id];
                              }
                            });
                          }
                    }
                    className={`bg-white dark:bg-gray-900 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedCourses.includes(course.id)
                        ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg"
                        : "shadow-md hover:shadow-xl"
                    } ${isComingSoon || isEnrolled ? "opacity-50 cursor-not-allowed" : ""}`}
                    aria-disabled={isComingSoon || isEnrolled}
                  >
                    <div className="text-blue-600 dark:text-blue-400 justify-between items-center flex">
                      <span>{course.icon}</span>
                      {course.tag && !isEnrolled && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full uppercase mt-2">
                          {course.tag}
                        </span>
                      )}
                      {isEnrolled && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2.5 py-1 rounded-full uppercase mt-2">
                          ENROLLED
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 min-h-[48px]">
                      {isEnrolled
                        ? "You are currently enrolled in this course"
                        : course.description}
                    </p>
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        {
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        }
                        <span>
                          {course.type?.toUpperCase() ||
                            (course.vehicle
                              ?.toLowerCase()
                              .includes("scooter") ||
                            course.vehicle?.toLowerCase().includes("activa") ||
                            course.vehicle?.toLowerCase().includes("bike")
                              ? "Two-Wheeler"
                              : "Four-Wheeler")}
                          {course.vehicle &&
                            ` [${course.govtType?.toUpperCase()}]`}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{course.classes || 12} Sessions</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{course.timePeriod} minutes/session</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      Rs.{course.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-center">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-dark font-medium px-8 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedCourses.length === 0 || loading}
            onClick={handleSubmit}
          >
            Proceed to Booking
          </button>
        </div>
        {isQueriesOpen && (
          <FirstDayQueries
            vehicle={
              selectedCourses.length === 1
                ? selectedCourses[0]
                : selectedCourses.length > 1
                  ? selectedCourses.join(", ")
                  : undefined
            }
            isOpen={isQueriesOpen}
            onClose={() => setIsQueriesOpen(false)}
            mode={selectedCourses.length === 1 ? "single" : "multiple"}
          />
        )}
      </div>
    </div>
  );
};

export default EnrollCourses;
