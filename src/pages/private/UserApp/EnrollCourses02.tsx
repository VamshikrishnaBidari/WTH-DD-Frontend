import React, { useState, useEffect, useCallback } from "react";
import api from "../../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { User } from "../../../interfaces/models.ts";
import { toast } from "sonner";
import { setUser } from "../../../features/authSlice.ts";
import axios from "axios";
import { Course as ReduxCourse } from "../../../interfaces/models.ts";
import { useNavigate } from "react-router-dom";

interface License {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  tag?: string;
}

interface LicensePreferencesData {
  userId?: string;
  person?: "new" | "old"; // new means no license, old means has a Driving license
  purpose?: string; // purpose of getting the license
  progress: {
    documentVerification: "done" | "pending" | "excluded";
    dlApplication: "done" | "pending" | "excluded";
    dlTestBooking: "done" | "pending" | "excluded";
    dlTestDay: "done" | "pending" | "excluded";
    llApplication: "done" | "pending" | "excluded";
    llTestBooking: "done" | "pending" | "excluded";
    llTestDay: "done" | "pending" | "excluded";
  };
}

interface CourseDataItem {
  userId: string;
  vehicle: string;
  type: "two-wheeler" | "four-wheeler";
  schoolId: string;
  amount: number;
  classesTotal: number;
  expiresAt: string; // ISO date string
  installments: boolean;
  classStart: string; // ISO date string
  classDuration: number; // minutes as a number
}

interface Course {
  id: string;
  title: string;
  licenseType: string;
  classes: number;
  timePerClass: string;
  details: string[];
  price: number;
  icon: React.ReactNode;
  tag?: string;
  noOfClassesV1?: number;
  noOfClassesV2?: number;
}

interface SelectedItem {
  id: string;
  title: string;
  price: number;
  type: "license" | "course";
  originalItem: License | Course; // Store the original item for more details
}

// SVG Icons from EnrollCourses.tsx
// const TruckIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       fill="none"
//       version="1.1"
//       width="36"
//       height="28"
//       viewBox="0 0 57 40"
//       className={className}
//     >
//       <g>
//         <rect
//           x="0"
//           y="0"
//           width="57"
//           height="40"
//           rx="0"
//           fill="#000000"
//           fillOpacity="0"
//           style={{ mixBlendMode: "normal" }}
//         />
//         <g transform="matrix(1,0,0,-1,0,76)">
//           <path
//             d="M4.275,74Q2.49375,73.9297,1.24687,73.0156Q0.0890625,72.0312,0,70.625L0,48.125Q0.0890625,46.71875,1.24687,45.73438Q2.49375,44.82031,4.275,44.75L5.7,44.75Q5.78906,41.86719,8.19375,39.96875Q10.5984,38.0703125,14.25,38Q17.9016,38.0703125,20.3062,39.96875Q22.7109,41.86719,22.8,44.75L34.2,44.75Q34.2891,41.86719,36.6937,39.96875Q39.0984,38.0703125,42.75,38Q46.4016,38.0703125,48.8062,39.96875Q51.2109,41.86719,51.3,44.75L54.15,44.75Q55.3969,44.75,56.1984,45.38281Q57,46.01562,57,47Q57,47.98438,56.1984,48.6172Q55.3969,49.25,54.15,49.25L54.15,53.75L54.15,56L54.15,57.335899999999995Q54.15,59.164100000000005,52.4578,60.5L45.6,65.9141Q43.9078,67.25,41.5922,67.25L37.05,67.25L37.05,70.625Q36.9609,72.0312,35.8031,73.0156Q34.5562,73.9297,32.775,74L4.275,74ZM37.05,62.75L41.5922,62.75L37.05,62.75L41.5922,62.75L48.45,57.335899999999995L48.45,56L37.05,56L37.05,62.75ZM9.975,44.75Q10.0641,46.64844,12.1125,47.70312Q14.25,48.5469,16.3875,47.70312Q18.4359,46.64844,18.525,44.75Q18.4359,42.85156,16.3875,41.79688Q14.25,40.95312,12.1125,41.79688Q10.0641,42.85156,9.975,44.75ZM42.75,48.125Q45.1547,48.0547,46.4906,46.4375Q47.5594,44.75,46.4906,43.0625Q45.1547,41.44531,42.75,41.375Q40.3453,41.44531,39.0094,43.0625Q37.9406,44.75,39.0094,46.4375Q40.3453,48.0547,42.75,48.125Z"
//             fill="#005EFF"
//             fillOpacity="1"
//             style={{ mixBlendMode: "normal" }}
//           />
//         </g>
//       </g>
//     </svg>
//   );
// };

const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="32"
      height="32"
      viewBox="0 0 36 36"
      className={className}
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

const BikeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    version="1.1"
    width="36"
    height="28"
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

const ScooterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
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

// Check icon component
const CheckIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Book and Clock icons
const BookIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

const SideBySideIcons: React.FC<{
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
}> = ({ leftIcon, rightIcon }) => (
  <div className="flex items-center gap-1">
    {/* Left icon circle */}
    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-300 flex items-center justify-center text-blue-700 dark:text-blue-300">
      <div className="w-4 h-4">{leftIcon}</div>
    </div>
    {/* Right icon circle */}
    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-300 flex items-center justify-center text-blue-700 dark:text-blue-300">
      <div className="w-4 h-4">{rightIcon}</div>
    </div>
  </div>
);

const EnrollCourses02: React.FC = () => {
  const [selectedComboLicense, setSelectedComboLicense] = useState<
    string | null
  >(null);
  const [selectedIndividualLicenses, setSelectedIndividualLicenses] = useState<
    string[]
  >([]);
  const [selectedComboCourse, setSelectedComboCourse] = useState<string | null>(
    null,
  );
  const [selectedIndividualCourses, setSelectedIndividualCourses] = useState<
    string[]
  >([]);
  const [comboLicenses, setComboLicenses] = useState<License[]>([]);
  const [individualLicenses, setIndividualLicenses] = useState<License[]>([]);
  const [comboCourses, setComboCourses] = useState<Course[]>([]);
  const [individualCourses, setIndividualCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLearningLicense, setHasLearningLicense] = useState<
    "yes" | "no" | null
  >(null);
  const [hasExistingLicense, setHasExistingLicense] = useState<
    "yes" | "no" | null
  >(null);

  const [courseDataArray, setCourseDataArray] = useState<CourseDataItem[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.auth.user,
  ) as User;
  const [existingCourses, setExistingCourses] = useState<ReduxCourse[]>([]);
  const schoolId = import.meta.env.VITE_SCHOOL_ID;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // New state for confirmation modal

  const getCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      if (!currentUser?.id) return;
      const response = await api.post(`/users/get-user`, {
        id: currentUser?.id,
      });
      if (response.data.success) {
        setExistingCourses(response.data.user.courses || []);
        dispatch(setUser(response.data.user)); // Update Redux store
      } else {
        toast.error("Failed to get user, please login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // Helper to determine vehicle type ("two-wheeler" or "four-wheeler")
  const getVehicleTypeFromString = (
    vehicleName: string,
  ): "two-wheeler" | "four-wheeler" => {
    const lowerVehicle = vehicleName.toLowerCase().trim();
    if (
      lowerVehicle.includes("scooter") ||
      lowerVehicle.includes("bike") ||
      lowerVehicle.includes("motorcycle")
    ) {
      return "two-wheeler";
    }
    // Assuming car, truck, etc., are four-wheelers
    return "four-wheeler";
  };

  // Helper to parse class duration string (e.g., "60 minutes", "2 hours") to minutes string ("60", "120")
  const parseClassDurationToMinutesString = (
    timePerClass: string | undefined,
  ): string => {
    if (!timePerClass) return "20"; // Default if undefined or empty
    const lowerTime = timePerClass.toLowerCase();
    const matchMinutes = lowerTime.match(/(\d+)\s*minutes?/);
    if (matchMinutes && matchMinutes[1]) {
      return matchMinutes[1];
    }
    const matchHours = lowerTime.match(/(\d+)\s*hours?/);
    if (matchHours && matchHours[1]) {
      return (parseInt(matchHours[1]) * 60).toString();
    }
    const matchNumberOnly = lowerTime.match(/^(\d+)$/); // If it's just a number, assume minutes
    if (matchNumberOnly && matchNumberOnly[1]) {
      return matchNumberOnly[1];
    }
    return "20"; // Default if parsing fails
  };

  // useEffect to update courseDataArray when selections change
  useEffect(() => {
    if (!currentUser?.id) {
      // console.warn("User not available for course data preparation.");
      setCourseDataArray([]);
      return;
    }

    if (!schoolId) {
      console.error("School ID is not configured.");
      setCourseDataArray([]);
      return;
    }

    const newCourseData: CourseDataItem[] = [];
    const classStartDate = new Date();
    const classStartISO = classStartDate.toISOString();
    const expiresAtDate = new Date(classStartDate);
    expiresAtDate.setMonth(expiresAtDate.getMonth() + 3);
    const expiresAtISO = expiresAtDate.toISOString();

    if (selectedComboCourse) {
      const combo = comboCourses.find((c) => c.id === selectedComboCourse);
      if (combo) {
        // Extract vehicle names from the formatted title (e.g., "Scooter + Car Training Bundle")
        // The original title from backend is like "Scooter+Car"
        // We need to find the original parts or parse the formatted title carefully.
        // Assuming combo.title is like "Scooter + Car Training Bundle"
        let vehiclesString = combo.title;
        if (vehiclesString.endsWith(" Training Bundle")) {
          vehiclesString = vehiclesString.substring(
            0,
            vehiclesString.length - " Training Bundle".length,
          );
        } else if (vehiclesString.endsWith(" Training")) {
          vehiclesString = vehiclesString.substring(
            0,
            vehiclesString.length - " Training".length,
          );
        }

        const vehicleNames = vehiclesString
          .split(" + ")
          .map((v) => v.trim())
          .filter((v) => v);

        const numVehicles = vehicleNames.length > 0 ? vehicleNames.length : 1;
        const pricePerVehicle = combo.price / numVehicles; // Split price among vehicles
        const classesPerVehicle = vehicleNames.map((v) => {
          if (v.toLowerCase() === "scooter" || v.toLowerCase() === "bike") {
            return combo.noOfClassesV1 || 10;
          } else return combo.noOfClassesV2 || 18; // Assuming noOfClassesV1 is for two-wheelers and noOfClassesV2 for four-wheelers
        })

        vehicleNames.forEach((vehicleName, index) => {
          newCourseData.push({
            userId: currentUser.id,
            vehicle: vehicleName, // e.g., "Scooter", "Car"
            type: getVehicleTypeFromString(vehicleName),
            schoolId: schoolId,
            amount: pricePerVehicle,
            classesTotal: classesPerVehicle[index], // Assuming combo.classes applies to each derived course
            expiresAt: expiresAtISO,
            installments: true,
            classStart: classStartISO,
            classDuration: Number(
              parseClassDurationToMinutesString(combo.timePerClass),
            ),
          });
        });
      }
    } else if (selectedIndividualCourses.length > 0) {
      selectedIndividualCourses.forEach((vehicleNameForCourse) => {
        // In individualCourses, id is the vehicle name
        const course = individualCourses.find(
          (c) => c.id === vehicleNameForCourse,
        );
        if (!currentUser.id) return; // Ensure currentUser is available
        if (course) {
          newCourseData.push({
            userId: currentUser.id,
            vehicle: course.id, // course.id is the vehicle name like "scooter", "car"
            type: getVehicleTypeFromString(course.id),
            schoolId: schoolId,
            amount: course.price,
            classesTotal: course.classes,
            expiresAt: expiresAtISO,
            installments: true,
            classStart: classStartISO,
            classDuration: Number(
              parseClassDurationToMinutesString(course.timePerClass),
            ),
          });
        }
      });
    }
    setCourseDataArray(newCourseData);
    console.log("Updated courseDataArray:", newCourseData); // For debugging
  }, [
    selectedComboCourse,
    selectedIndividualCourses,
    comboCourses,
    individualCourses,
    currentUser,
    schoolId,
  ]);

  // Helper function to format license title based on backend title and vehicle type
  const formatLicenseTitle = (title: string): string => {
    const titleLower = title.toLowerCase();

    // Handle combo titles with "+" separator
    if (titleLower.includes("+")) {
      const parts = title.split("+").map((part) => part.trim());
      const formattedParts = parts.map((part) => {
        const partLower = part.toLowerCase();

        if (
          partLower.includes("scooter") ||
          partLower.includes("activa") ||
          partLower.includes("scooty")
        ) {
          return "Scooter";
        } else if (
          partLower.includes("bike") ||
          partLower.includes("motorcycle")
        ) {
          return "Bike";
        } else if (partLower.includes("car")) {
          return "Car";
        } else if (partLower.includes("truck")) {
          return "Truck";
        }

        // Default: capitalize first letter
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      });

      // Create combo license title
      const vehicleTypes = formattedParts.join(" + ");

      // Add appropriate license types
      const licenseTypes: string[] = [];
      parts.forEach((part) => {
        const partLower = part.toLowerCase();
        if (
          partLower.includes("scooter") ||
          partLower.includes("activa") ||
          partLower.includes("scooty")
        ) {
          licenseTypes.push("MCWOG");
        } else if (
          partLower.includes("bike") ||
          partLower.includes("motorcycle")
        ) {
          licenseTypes.push("MCWG");
        } else if (partLower.includes("car")) {
          licenseTypes.push("LMV");
        } else if (partLower.includes("truck")) {
          licenseTypes.push("HMV");
        }
      });

      return `${vehicleTypes} Combo (${licenseTypes.join(" + ")})`;
    }

    // Map common patterns to proper display names for individual licenses
    const titleMappings: { [key: string]: string } = {
      "scooter-activa": "Scooter (MCWOG)",
      "scooty-activa": "Scooter (MCWOG)",
      "scooter/activa": "Scooter (MCWOG)",
      "car-personal": "Car (LMV)",
      "car-commercial": "Car Commercial (LMV-TR)",
      bike: "Bike (MCWG)",
      motorcycle: "Bike (MCWG)",
      truck: "Truck (HMV)",
      "heavy-vehicle": "Heavy Vehicle (HMV)",
      "commercial-vehicle": "Commercial Vehicle (PCMV)",
    };

    // Check for exact matches first
    if (titleMappings[titleLower]) {
      return titleMappings[titleLower];
    }

    // Check for partial matches
    if (
      titleLower.includes("scooter") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooty")
    ) {
      return "Scooter (MCWOG)";
    } else if (
      titleLower.includes("bike") ||
      titleLower.includes("motorcycle")
    ) {
      return "Bike (MCWG)";
    } else if (titleLower.includes("car")) {
      if (titleLower.includes("commercial")) {
        return "Car Commercial (LMV-TR)";
      }
      return "Car (LMV)";
    } else if (titleLower.includes("truck") || titleLower.includes("heavy")) {
      return "Truck (HMV)";
    } else if (titleLower.includes("commercial")) {
      return "Commercial Vehicle (PCMV)";
    }

    // If no specific mapping found, capitalize the title and try to infer license type
    const capitalizedTitle = title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Try to infer license type from the original title
    if (titleLower.includes("scooter") || titleLower.includes("activa")) {
      return `${capitalizedTitle} (MCWOG)`;
    } else if (titleLower.includes("bike")) {
      return `${capitalizedTitle} (MCWG)`;
    } else if (titleLower.includes("car")) {
      return `${capitalizedTitle} (LMV)`;
    } else {
      return capitalizedTitle;
    }
  };

  // Helper function to get vehicle icon based on title
  const getVehicleIcon = (title: string): React.ReactNode => {
    const titleLower = title.toLowerCase();

    if (
      titleLower.includes("scooter") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooty")
    ) {
      return <ScooterIcon className="w-8 h-8" />;
    } else if (titleLower.includes("bike")) {
      return <BikeIcon className="w-8 h-8" />;
    } else if (titleLower.includes("car")) {
      return <CarIcon className="w-8 h-8" />;
    } else {
      return <CarIcon className="w-8 h-8" />;
    }
  };

  // Helper function to get combo icon based on title
  const getComboIcon = (title: string): React.ReactNode => {
    const titleLower = title.toLowerCase();
    let leftIcon = <CarIcon className="w-4 h-4" />;
    let rightIcon = <CarIcon className="w-4 h-4" />;

    if (
      titleLower.includes("scooty") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooter")
    ) {
      leftIcon = <ScooterIcon className="w-4 h-4" />;
    } else if (titleLower.includes("bike")) {
      leftIcon = <BikeIcon className="w-4 h-4" />;
    }

    if (titleLower.includes("car")) {
      rightIcon = <CarIcon className="w-4 h-4" />;
    }

    return <SideBySideIcons leftIcon={leftIcon} rightIcon={rightIcon} />;
  };

  // Helper function to generate tag based on title
  const generateTag = (title: string): string => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes("+")) {
      // For combo offers, calculate savings percentage
      if (titleLower.includes("bike") && titleLower.includes("car")) {
        return "Save 15%";
      } else if (titleLower.includes("scooter") && titleLower.includes("car")) {
        return "Save 10%";
      }
      return "Combo Offer";
    }

    return "";
  };

  // Helper function to get custom license description based on formatted title
  const getCustomLicenseDescription = (formattedTitle: string): string => {
    const titleLower = formattedTitle.toLowerCase();

    if (titleLower.includes("scooter") && titleLower.includes("mcwog")) {
      return "Light motor vehicle license for scooters.";
    } else if (titleLower.includes("bike") && titleLower.includes("mcwg")) {
      return "Motor cycle with gear license.";
    } else if (titleLower.includes("car") && titleLower.includes("lmv")) {
      if (titleLower.includes("commercial")) {
        return "Commercial light motor vehicle license for business use.";
      }
      return "Light motor vehicle license for cars.";
    } else if (titleLower.includes("truck") && titleLower.includes("hmv")) {
      return "Heavy motor vehicle license for trucks.";
    } else if (
      titleLower.includes("commercial") &&
      titleLower.includes("pcmv")
    ) {
      return "Public carrier motor vehicle license.";
    }

    // Default description for combo licenses
    if (titleLower.includes("+")) {
      return "Combined license package with special discount.";
    }

    return "Professional driving license training program.";
  };

  // Helper function to get custom combo description
  const getCustomComboDescription = (formattedTitle: string): string => {
    const titleLower = formattedTitle.toLowerCase();

    if (titleLower.includes("bike") && titleLower.includes("car")) {
      return "Combined license for both bikes and cars with special discount.";
    } else if (titleLower.includes("scooter") && titleLower.includes("car")) {
      return "Combined license for both scooters and cars with special discount.";
    } else if (titleLower.includes("scooter") && titleLower.includes("bike")) {
      return "Combined license for both scooters and bikes with special discount.";
    }

    return "Combined license package with special discount.";
  };

  // Fetch individual licenses
  const fetchIndividualLicenses = async () => {
    try {
      const response = await api.post("/driving/get-license-syllabus", {
        schoolId: import.meta.env.VITE_SCHOOL_ID,
      });

      if (response.data.success && response.data.licenseSyllabus) {
        console.log(
          "Fetched individual licenses:",
          response.data.licenseSyllabus,
        );
        const transformedLicenses: License[] =
          response.data.licenseSyllabus.map((license: any) => {
            const formattedTitle = formatLicenseTitle(license.title);
            return {
              id: license.id,
              title: formattedTitle,
              description: getCustomLicenseDescription(formattedTitle),
              price: license.price,
              icon: getVehicleIcon(license.title),
            };
          });

        setIndividualLicenses(transformedLicenses);
      }
    } catch (error) {
      console.error("Error fetching individual licenses:", error);
    }
  };

  // Fetch combo licenses
  const fetchComboLicenses = async () => {
    try {
      const response = await api.post("/driving/get-license-combo", {
        schoolId: import.meta.env.VITE_SCHOOL_ID,
      });

      if (response.data.success && response.data.licenseCombo) {
        console.log("Fetched combo licenses:", response.data.licenseCombo);
        const transformedComboLicenses: License[] =
          response.data.licenseCombo.map((license: any) => {
            const formattedTitle = formatLicenseTitle(license.title);
            return {
              id: license.id,
              title: formattedTitle,
              description: getCustomComboDescription(formattedTitle),
              price: license.price,
              icon: getComboIcon(license.title),
              tag: generateTag(license.title),
            };
          });

        setComboLicenses(transformedComboLicenses);
      }
    } catch (error) {
      console.error("Error fetching combo licenses:", error);
    }
  };

  // Helper function to format course title based on backend title
  const formatCourseTitle = (title: string): string => {
    const titleLower = title.toLowerCase();

    // Handle combo titles with "+" separator
    if (titleLower.includes("+")) {
      const parts = title.split("+").map((part) => part.trim());
      const formattedParts = parts.map((part) => {
        const partLower = part.toLowerCase();

        if (
          partLower.includes("scooter") ||
          partLower.includes("activa") ||
          partLower.includes("scooty")
        ) {
          return "Scooter";
        } else if (
          partLower.includes("bike") ||
          partLower.includes("motorcycle")
        ) {
          return "Bike";
        } else if (partLower.includes("car")) {
          return "Car";
        } else if (partLower.includes("truck")) {
          return "Truck";
        }

        // Default: capitalize first letter
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      });

      return `${formattedParts.join(" + ")} Training Bundle`;
    }

    // Handle individual course titles
    if (
      titleLower.includes("scooter") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooty")
    ) {
      return "Scooter Training";
    } else if (titleLower.includes("bike")) {
      return "Bike Training";
    } else if (titleLower.includes("car")) {
      return "Car Training";
    } else if (titleLower.includes("truck")) {
      return "Truck Training";
    }

    // Default: capitalize first letter of each word and add "Training"
    return (
      title
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ") + " Training"
    );
  };

  // Helper function to get course license type
  const getCourseLicenseType = (title: string): string => {
    const titleLower = title.toLowerCase();

    // Handle combo courses with "+" separator
    if (titleLower.includes("+")) {
      const parts = title.split("+").map((part) => part.trim());
      const licenseTypes = parts
        .map((part) => {
          const partLower = part.toLowerCase();

          if (
            partLower.includes("scooter") ||
            partLower.includes("activa") ||
            partLower.includes("scooty")
          ) {
            return "MCWOG";
          } else if (
            partLower.includes("bike") ||
            partLower.includes("motorcycle")
          ) {
            return "MCWG";
          } else if (partLower.includes("car")) {
            return "LMV";
          } else if (partLower.includes("truck")) {
            return "HMV";
          }
          return "";
        })
        .filter((type) => type !== "");

      return licenseTypes.join(" + ");
    }

    // Handle individual courses
    if (
      titleLower.includes("scooter") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooty")
    ) {
      return "MCWOG";
    } else if (titleLower.includes("bike")) {
      return "MCWG";
    } else if (titleLower.includes("car")) {
      return "LMV";
    } else if (titleLower.includes("truck")) {
      return "HMV";
    }

    return "Training";
  };

  // Helper function to get custom course description
  const getCustomCourseDescription = (formattedTitle: string): string[] => {
    const titleLower = formattedTitle.toLowerCase();

    if (titleLower.includes("scooter")) {
      return [
        "Scooter handling techniques",
        "Traffic navigation skills",
        "Safety practices",
        "Theory classes included",
      ];
    } else if (titleLower.includes("bike")) {
      return [
        "Advanced riding techniques",
        "Gear shifting mastery",
        "Road safety training",
        "Complete theory course",
      ];
    } else if (titleLower.includes("car")) {
      return [
        "Car control mastery",
        "Parking techniques",
        "Road safety training",
        "Complete theory course",
      ];
    } else if (titleLower.includes("bundle") || titleLower.includes("+")) {
      return [
        "Complete training for both vehicles",
        "Shared theory sessions",
        "Priority scheduling",
        "Save 20% on combined price",
      ];
    }

    return [
      "Professional driving training",
      "Experienced instructors",
      "Safety focused curriculum",
      "Theory and practical sessions",
    ];
  };

  // Helper function to get course icon
  const getCourseIcon = (title: string): React.ReactNode => {
    const titleLower = title.toLowerCase();

    if (
      titleLower.includes("scooter") ||
      titleLower.includes("activa") ||
      titleLower.includes("scooty")
    ) {
      return <ScooterIcon className="w-8 h-8" />;
    } else if (titleLower.includes("bike")) {
      return <BikeIcon className="w-8 h-8" />;
    } else if (titleLower.includes("car")) {
      return <CarIcon className="w-8 h-8" />;
    }

    // For combo courses
    if (titleLower.includes("+")) {
      let leftIcon = <CarIcon className="w-4 h-4" />;
      let rightIcon = <CarIcon className="w-4 h-4" />;

      if (titleLower.includes("scooter") || titleLower.includes("activa")) {
        leftIcon = <ScooterIcon className="w-4 h-4" />;
      } else if (titleLower.includes("bike")) {
        leftIcon = <BikeIcon className="w-4 h-4" />;
      }

      if (titleLower.includes("car")) {
        rightIcon = <CarIcon className="w-4 h-4" />;
      }

      return <SideBySideIcons leftIcon={leftIcon} rightIcon={rightIcon} />;
    }

    return <CarIcon className="w-8 h-8" />;
  };

  // Fetch individual courses from syllabus
  const fetchIndividualCourses = async () => {
    try {
      const response = await api.post("/driving/get-syllabus", {
        schoolId: import.meta.env.VITE_SCHOOL_ID,
      });

      if (response.data.success && response.data.syllabus?.syllabus) {
        console.log(
          "Fetched individual courses:",
          response.data.syllabus.syllabus,
        );
        const syllabusData = response.data.syllabus.syllabus;
        const transformedCourses: Course[] = syllabusData.map((course: any) => {
          const formattedTitle = formatCourseTitle(course.vehicle);
          return {
            id: course.vehicle,
            title: formattedTitle,
            licenseType: getCourseLicenseType(course.vehicle),
            classes: course.classes || 15,
            timePerClass: `${course.timePeriod || 60} minutes`,
            details: getCustomCourseDescription(formattedTitle),
            price: course.classesAmount || course.price || 599,
            icon: getCourseIcon(course.vehicle),
          };
        });

        setIndividualCourses(transformedCourses);
      }
    } catch (error) {
      console.error("Error fetching individual courses:", error);
    }
  };

  // Fetch combo courses
  const fetchComboCourses = async () => {
    try {
      const response = await api.post("/driving/get-course-combo", {
        schoolId: import.meta.env.VITE_SCHOOL_ID,
      });

      if (response.data.success && response.data.courseCombo) {
        console.log("Fetched combo courses:", response.data.courseCombo);
        const transformedComboCourses: Course[] = response.data.courseCombo.map(
          (course: any) => {
            const formattedTitle = formatCourseTitle(course.title);
            return {
              id: course.id,
              title: formattedTitle,
              licenseType: getCourseLicenseType(course.title),
              classes: course.noOfClasses || 28, // Default for combo courses
              noOfClassesV1: course.noOfClassesV1 || 10, // Default for combo courses
              noOfClassesV2: course.noOfClassesV2 || 18, // Default for combo courses
              timePerClass: course.timePerSession || "30 min", // Default for combo courses
              details: getCustomCourseDescription(formattedTitle),
              price: course.price,
              icon: getCourseIcon(course.title),
              tag: "Best Value",
            };
          },
        );

        setComboCourses(transformedComboCourses);
      }
    } catch (error) {
      console.error("Error fetching combo courses:", error);
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchIndividualLicenses(),
        fetchComboLicenses(),
        fetchIndividualCourses(),
        fetchComboCourses(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Auto-select matching courses when license is selected
  useEffect(() => {
    if (selectedComboLicense) {
      const matchingCourse = comboCourses.find((course) => {
        const licenseTitle =
          comboLicenses.find((l) => l.id === selectedComboLicense)?.title || "";
        return (
          licenseTitle.toLowerCase().includes("scooter") &&
          licenseTitle.toLowerCase().includes("car") &&
          course.title.toLowerCase().includes("scooter") &&
          course.title.toLowerCase().includes("car")
        );
      });
      if (matchingCourse) {
        setSelectedComboCourse(matchingCourse.id);
        setSelectedIndividualCourses([]);
      }
    }
  }, [selectedComboLicense, comboCourses, comboLicenses]);

  useEffect(() => {
    if (selectedIndividualLicenses.length > 0) {
      // Find matching individual courses based on vehicle type
      const matchingCourseIds = selectedIndividualLicenses
        .map((licenseId) => {
          const license = individualLicenses.find((l) => l.id === licenseId);
          if (!license) return null;

          const licenseVehicle = license.title.toLowerCase();

          // Find corresponding course
          const matchingCourse = individualCourses.find((course) => {
            const courseVehicle = course.title.toLowerCase();

            return (
              (licenseVehicle.includes("scooter") &&
                courseVehicle.includes("scooter")) ||
              (licenseVehicle.includes("bike") &&
                courseVehicle.includes("bike")) ||
              (licenseVehicle.includes("car") && courseVehicle.includes("car"))
            );
          });

          return matchingCourse ? matchingCourse.id : null;
        })
        .filter((id) => id !== null) as string[];

      setSelectedIndividualCourses(matchingCourseIds);
      setSelectedComboCourse(null);
    } else {
      // Clear individual course selections when no individual licenses are selected
      setSelectedIndividualCourses([]);
    }
  }, [selectedIndividualLicenses, individualLicenses, individualCourses]);

  const handleComboLicenseSelect = (licenseId: string) => {
    if (selectedComboLicense === licenseId) {
      setSelectedComboLicense(null);
    } else {
      setSelectedComboLicense(licenseId);
      setSelectedIndividualLicenses([]);
    }
  };

  const handleIndividualLicenseSelect = (licenseId: string) => {
    if (selectedComboLicense) return;

    if (selectedIndividualLicenses.includes(licenseId)) {
      setSelectedIndividualLicenses((prev) =>
        prev.filter((id) => id !== licenseId),
      );
    } else {
      setSelectedIndividualLicenses((prev) => [...prev, licenseId]);
    }
  };

  const handleComboCourseSelect = (courseId: string) => {
    if (selectedComboCourse === courseId) {
      setSelectedComboCourse(null);
    } else {
      setSelectedComboCourse(courseId);
      setSelectedIndividualCourses([]);
    }
  };

  const handleIndividualCourseSelect = (courseId: string) => {
    if (selectedComboCourse) return;

    if (selectedIndividualCourses.includes(courseId)) {
      setSelectedIndividualCourses((prev) =>
        prev.filter((id) => id !== courseId),
      );
    } else {
      setSelectedIndividualCourses((prev) => [...prev, courseId]);
    }
  };

  const handleLearningLicenseSelect = (value: "yes" | "no") => {
    setHasLearningLicense(value);
    console.log("Learning license answer:", value);
  };

  const handleSendFeeAmount = useCallback(
    async (selectedItems: SelectedItem[]) => {
      if (!currentUser?.id) {
        toast.error("No student selected");
        return false;
      }

      if (!selectedItems || selectedItems.length === 0) {
        toast.error("No items selected to process fees");
        return false;
      }

      try {
        // Calculate course and license fees
        let courseFee = 0;
        let licenseFee = 0;

        selectedItems.forEach((item) => {
          if (item.type === "course") {
            courseFee += item.price;
          } else if (item.type === "license") {
            licenseFee += item.price;
          }
        });

        console.log("Fee calculation:", {
          courseFee,
          licenseFee,
          selectedItems: selectedItems.map((item) => ({
            title: item.title,
            type: item.type,
            price: item.price,
          })),
        });

        // Send to backend
        const response = await api.post("/users/set-amount", {
          userId: currentUser.id,
          courseFee: courseFee,
          licenseFee: licenseFee,
          extraFee: 0, // Set to 0 as requested
        });

        if (response.data.success) {
          toast.success(
            `Fee amount updated successfully! Course: ₹${courseFee}, License: ₹${licenseFee}`,
          );
          return true;
        } else {
          toast.error(response.data.message || "Failed to update fee amount");
          return false;
        }
      } catch (error) {
        console.error("Error sending fee amount:", error);
        if (error instanceof Error) {
          toast.error(`Error updating fee amount: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred while updating fee amount");
        }
        return false;
      }
    },
    [currentUser?.id],
  );

  const calculateTotal = () => {
    let total = 0;

    // License costs
    if (selectedComboLicense) {
      const combo = comboLicenses.find((l) => l.id === selectedComboLicense);
      total += combo ? combo.price : 0;
    } else {
      selectedIndividualLicenses.forEach((licenseId) => {
        const license = individualLicenses.find((l) => l.id === licenseId);
        total += license ? license.price : 0;
      });
    }

    // Course costs
    if (selectedComboCourse) {
      const combo = comboCourses.find((c) => c.id === selectedComboCourse);
      total += combo ? combo.price : 0;
    } else {
      selectedIndividualCourses.forEach((courseId) => {
        const course = individualCourses.find((c) => c.id === courseId);
        total += course ? course.price : 0;
      });
    }

    return total;
  };

  const getSelectedItems = (): SelectedItem[] => {
    const items: SelectedItem[] = [];

    // Licenses
    if (selectedComboLicense) {
      const license = comboLicenses.find((l) => l.id === selectedComboLicense);
      if (license) {
        items.push({
          id: license.id,
          title: license.title,
          price: license.price,
          type: "license",
          originalItem: license,
        });
      }
    } else if (selectedIndividualLicenses.length > 0) {
      selectedIndividualLicenses.forEach((licenseId) => {
        const license = individualLicenses.find((l) => l.id === licenseId);
        if (license) {
          items.push({
            id: license.id,
            title: license.title,
            price: license.price,
            type: "license",
            originalItem: license,
          });
        }
      });
    }

    // Courses
    if (selectedComboCourse) {
      const course = comboCourses.find((c) => c.id === selectedComboCourse);
      if (course) {
        items.push({
          id: course.id,
          title: course.title,
          price: course.price,
          type: "course",
          originalItem: course,
        });
      }
    } else if (selectedIndividualCourses.length > 0) {
      selectedIndividualCourses.forEach((courseId) => {
        // courseId is vehicle name for individual courses
        const course = individualCourses.find((c) => c.id === courseId);
        if (course) {
          items.push({
            id: course.id,
            title: course.title,
            price: course.price,
            type: "course",
            originalItem: course,
          });
        }
      });
    }
    return items;
  };

  const handleNext = async () => {
    if (!hasLearningLicense) {
      toast.error("Please answer the learning license question first.");
      return;
    }

    const selectedItems = getSelectedItems();
    const selectedLicenseItems = selectedItems.filter((item) => item.type === "license");
    const selectedCourseItems = selectedItems.filter((item) => item.type === "course");

    // New validation: License must be accompanied by course training
    if (selectedLicenseItems.length > 0 && selectedCourseItems.length === 0) {
      toast.error("License booking must be accompanied by course training. Please select a training course.");
      return;
    }

    // Allow course training without license (this is already working)
    if (selectedCourseItems.length === 0 && selectedLicenseItems.length === 0) {
      toast.info("Please select at least one service to continue.");
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = async () => {
    setShowConfirmationModal(false);
    setLoading(true);

    const selectedItems = getSelectedItems();
    const selectedLicenseItems = selectedItems.filter(
      (item) => item.type === "license",
    );
    const isLicenseServiceSelected = selectedLicenseItems.length > 0;
    let licensePreferencesSubmittedSuccessfully = false;

    // 1. Prepare License Preferences Data
    let licensePurpose = "";
    if (isLicenseServiceSelected) {
      if (selectedComboLicense) {
        const combo = comboLicenses.find((l) => l.id === selectedComboLicense);
        if (combo) {
          const comboTitleLower = combo.title.toLowerCase();
          if (
            comboTitleLower.includes("scooter") &&
            comboTitleLower.includes("car")
          ) {
            const twoWheelerPart = comboTitleLower.includes("scooter (mcwg)")
              ? "Scooter (MCWG)"
              : comboTitleLower.includes("scooter (mcwog)")
                ? "Scooter (MCWOG)"
                : "Scooter";
            const fourWheelerPart = comboTitleLower.includes("car (lmv)")
              ? "Car (LMV)"
              : "Car";
            licensePurpose = `License for two-wheeler (${twoWheelerPart}) and four-wheeler (${fourWheelerPart})`;
          } else if (
            comboTitleLower.includes("bike") &&
            comboTitleLower.includes("car")
          ) {
            const twoWheelerPart = comboTitleLower.includes("bike (mcwg)")
              ? "Bike (MCWG)"
              : comboTitleLower.includes("bike (mcwog)")
                ? "Bike (MCWOG)"
                : "Bike";
            const fourWheelerPart = comboTitleLower.includes("car (lmv)")
              ? "Car (LMV)"
              : "Car";
            licensePurpose = `License for two-wheeler (${twoWheelerPart}) and four-wheeler (${fourWheelerPart})`;
          } else {
            licensePurpose = `License for selected combination: ${combo.title}`;
          }
        }
      } else if (selectedIndividualLicenses.length > 0) {
        const vehicleNames = selectedLicenseItems.map((item) => {
          let name = item.title;
          if (name.toLowerCase().endsWith(" license")) {
            name = name.substring(0, name.length - " license".length);
          }
          return name;
        });
        licensePurpose = `License for ${vehicleNames.join(", ")} only`;
      }
    } else {
      if (hasLearningLicense === "yes") {
        licensePurpose = "No license assistance required";
      } else if (hasLearningLicense === "no") {
        licensePurpose = "Learning license assistance required";
      }
    }

    const personValue = hasLearningLicense === "no" ? "new" : "old";

    const licensePreferencesSubmitData: LicensePreferencesData = {
      userId: currentUser?.id || "",
      person: personValue,
      purpose: licensePurpose,
      progress: {
        documentVerification: "pending",
        dlApplication: isLicenseServiceSelected ? "pending" : "excluded",
        dlTestBooking: isLicenseServiceSelected ? "pending" : "excluded",
        dlTestDay: isLicenseServiceSelected ? "pending" : "excluded",
        llApplication: hasLearningLicense === "no" ? "pending" : "excluded",
        llTestBooking: hasLearningLicense === "no" ? "pending" : "excluded",
        llTestDay: hasLearningLicense === "no" ? "pending" : "excluded",
      },
    };

    // 2. Submit License Preferences (if applicable)
    // Only submit if there's a purpose (meaning some license interaction is needed)
    // or if they explicitly need LL assistance.
    const needsLicensePreferenceSubmission = true; // Always true in this context, as we always submit preferences if LL is 'no' or licenses are selected

    if (
      needsLicensePreferenceSubmission &&
      licensePreferencesSubmitData.userId
    ) {
      console.log(
        "Submitting License Preferences Data:",
        licensePreferencesSubmitData,
      );
      try {
        const response = await api.post(
          "/users/license-preferences",
          licensePreferencesSubmitData,
        );
        if (response && response.data && response.data.success === true) {
          toast.success("License preferences submitted successfully!");
          licensePreferencesSubmittedSuccessfully = true;
          // console.log("License preferences API response:", response.data);
          if (hasLearningLicense === "yes" && currentUser?.id) {
            console.log(
              "Attempting to set LL status to Completed for user:",
              currentUser.id,
            );
            try {
              const llStatusResponse = await api.post("/users/set-ll-status", {
                userId: currentUser.id,
                LL: "Completed",
              });
              if (llStatusResponse?.data?.success === true) {
                toast.success(
                  "Learning License status updated to 'Completed'.",
                );
              } else {
                toast.error(
                  llStatusResponse?.data?.message ||
                    "Could not update LL status. Proceeding anyway.",
                );
                console.warn(
                  "[handleConfirmBooking] LL status update API call was not successful or response format is unexpected.",
                  llStatusResponse ? llStatusResponse.data : "No response data",
                );
              }
            } catch (error) {
              console.warn(
                "[handleConfirmBooking] Error updating LL status:",
                error,
              );
              if (axios.isAxiosError(error)) {
                toast.error(
                  `Could not update LL status: ${error.response?.data?.message || error.message}. Proceeding anyway.`,
                );
              } else {
                toast.error(
                  "An unexpected error occurred while updating LL status. Proceeding anyway.",
                );
              }
            }
          }
        } else {
          toast.error(
            response.data?.message ||
              "Failed to submit license preferences. Please try again.",
          );
          console.error(
            "[handleConfirmBooking] License Preferences API call was not successful or response format is unexpected.",
            response ? response.data : "No response data",
          );
        }
      } catch (error) {
        console.error(
          "[handleConfirmBooking] Error submitting license preferences:",
          error,
        );
        if (axios.isAxiosError(error)) {
          const errorMsg =
            error.response?.data?.message ||
            error.message ||
            "An error occurred.";
          toast.error(`Failed to submit license preferences: ${errorMsg}`);
          if (error.code === "ERR_NETWORK") {
            toast.error("Network error. Please check your connection.");
          }
        } else {
          toast.error(
            "An unexpected error occurred while submitting license preferences.",
          );
        }
        setLoading(false);
        return; // Stop if license preferences fail and were required
      }
    } else if (!needsLicensePreferenceSubmission) {
      licensePreferencesSubmittedSuccessfully = true; // No submission needed, so consider it successful for proceeding
    }

    // 3. Create Courses (if any selected and license preferences were successful or not needed)
    if (licensePreferencesSubmittedSuccessfully && courseDataArray.length > 0) {
      console.log(
        "Submitting the following courses to backend:",
        courseDataArray,
      );
      let allCoursesCreated = true;
      const createdCourseDetails: any[] = [];
      const sortedCourseDataArray = [...courseDataArray].sort((a, b) => {
        if (a.type === "two-wheeler" && b.type === "four-wheeler") return -1;
        if (a.type === "four-wheeler" && b.type === "two-wheeler") return 1;
        return 0;
      });

      for (const courseItem of sortedCourseDataArray) {
        try {
          const courseResponse = await api.post("/courses/create", courseItem); // Corrected endpoint
          if (
            courseResponse &&
            courseResponse.data &&
            courseResponse.data.success
          ) {
            toast.success(
              `Successfully enrolled in course for ${courseItem.vehicle}.`,
            );
            createdCourseDetails.push(courseResponse.data.data);
          } else {
            allCoursesCreated = false;
            toast.error(
              courseResponse.data?.message ||
                `Failed to enroll in course for ${courseItem.vehicle}.`,
            );
            console.error(
              `[handleConfirmBooking] Course creation for ${courseItem.vehicle} failed.`,
              courseResponse ? courseResponse.data : "No response data",
            );
          }
        } catch (courseError) {
          allCoursesCreated = false;
          console.error(
            `[handleConfirmBooking] Error creating course for ${courseItem.vehicle}:`,
            courseError,
          );
          if (axios.isAxiosError(courseError)) {
            const errorMsg =
              courseError.response?.data?.message ||
              courseError.message ||
              "An error occurred.";
            toast.error(
              `Failed to enroll in course for ${courseItem.vehicle}: ${errorMsg}`,
            );
          } else {
            toast.error(
              `An unexpected error occurred while enrolling in course for ${courseItem.vehicle}.`,
            );
          }
        }
      }

      if (allCoursesCreated) {
        toast.success("All selected courses enrolled successfully!");
        const isSentFeeAmount = await handleSendFeeAmount(getSelectedItems());
        // Navigate or perform next actions, e.g., to a payment page or dashboard
        if (isSentFeeAmount) {
          navigate("/user/licensing");
        } else {
          console.warn(
            "Fee amount was not sent successfully, but courses were enrolled. Please check the fee status.",
          );
          toast.warning(
            "Courses enrolled, but fee amount was not sent successfully. Please check the fee status.",
          );
        }
      } else {
        toast.warning(
          "Some courses could not be enrolled. Please contact support.",
        );
      }
    } else if (
      licensePreferencesSubmittedSuccessfully &&
      courseDataArray.length === 0 &&
      needsLicensePreferenceSubmission
    ) {
      // Only license preferences were submitted, no courses
      toast.info(
        "License preferences have been saved. No courses were selected for enrollment.",
      );
    } else if (
      courseDataArray.length === 0 &&
      !needsLicensePreferenceSubmission
    ) {
      toast.info("No new services selected.");
    }

    setLoading(false);
  };

  useEffect(() => {
    // Log selected items whenever they change
    const selectedItems = getSelectedItems();
    console.log("Selected Items:", selectedItems);
  }, [
    selectedComboLicense,
    selectedIndividualLicenses,
    selectedComboCourse,
    selectedIndividualCourses,
  ]);

  const hasSelections =
    selectedComboLicense ||
    selectedIndividualLicenses.length > 0 ||
    selectedComboCourse ||
    selectedIndividualCourses.length > 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 dark:bg-gray-950 bg-gray-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-mainLight mb-6">
          Enroll in Courses
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : existingCourses.length > 0 ? (
          // Show enrolled courses table if user already has courses
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-6 text-center">
              Enrolled Courses
            </h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Vehicle
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Instructor
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100 font-medium">
                      {course.vehicle}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {course.teacher?.name || (
                        <span className="italic text-gray-400">
                          Not Assigned Yet
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-blue-700 dark:text-blue-400 font-semibold">
                      ₹{course.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              You are already enrolled in a course. New bookings are disabled.
            </div>
          </div>
        ) : (
          <>
            {/* Main Content */}
            <div className="space-y-8 lg:space-y-12 mb-8">
              {/* License Selection */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  Choose Your License Type
                </h2>

                {/* Combo Licenses */}
                {comboLicenses.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Combo Offers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      {comboLicenses.map((license) => (
                        <div
                          key={license.id}
                          className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                            selectedComboLicense === license.id
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                          } ${selectedIndividualLicenses.length > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            selectedIndividualLicenses.length === 0 &&
                            handleComboLicenseSelect(license.id)
                          }
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center justify-center">
                              {license.icon}
                            </div>
                            {selectedComboLicense === license.id ? (
                              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                <CheckIcon />
                              </div>
                            ) : (
                              license.tag && (
                                <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                  {license.tag}
                                </span>
                              )
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {license.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">
                            {license.description}
                          </p>
                          <div className="text-right">
                            <span className="text-blue-700 dark:text-blue-400 font-bold">
                              Rs. {license.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Individual Licenses */}
                {individualLicenses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Individual Plans
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {individualLicenses.map((license) => (
                        <div
                          key={license.id}
                          className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                            selectedIndividualLicenses.includes(license.id)
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                          } ${selectedComboLicense ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            !selectedComboLicense &&
                            handleIndividualLicenseSelect(license.id)
                          }
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-300 flex items-center justify-center text-blue-700 dark:text-blue-300">
                              {license.icon}
                            </div>
                            {selectedIndividualLicenses.includes(
                              license.id,
                            ) && (
                              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                <CheckIcon />
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {license.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {license.description}
                          </p>
                          <div className="text-right">
                            <span className="text-blue-700 dark:text-blue-400 font-bold">
                              Rs. {license.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Training Course Selection */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  Select Your Training Course
                </h2>

                {/* Course Combo Offers */}
                {comboCourses.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Course Bundles
                    </h3>
                    <div className="grid grid-cols-1 gap-4 lg:gap-6">
                      {comboCourses.map((course) => (
                        <div
                          key={course.id}
                          className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                            selectedComboCourse === course.id
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                          } ${selectedIndividualCourses.length > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            selectedIndividualCourses.length === 0 &&
                            handleComboCourseSelect(course.id)
                          }
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                            <div className="flex items-start mb-3 sm:mb-0">
                              <div className="mr-3 flex items-center justify-center">
                                {course.icon}
                              </div>
                              <div>
                                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                  {course.title}
                                </h3>
                                <div className="flex flex-wrap items-center text-xs text-gray-600 dark:text-gray-400 gap-2">
                                  <span className="flex items-center">
                                    <BookIcon />
                                    <span className="ml-1">
                                      {course.noOfClassesV1} + {course.noOfClassesV2} Classes
                                    </span>
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center">
                                    <ClockIcon />
                                    <span className="ml-1">
                                      {course.timePerClass}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            {selectedComboCourse === course.id ? (
                              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center self-end sm:self-start">
                                <CheckIcon />
                              </div>
                            ) : (
                              course.tag && (
                                <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full self-end sm:self-start">
                                  {course.tag}
                                </span>
                              )
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {course.details.map((detail, index) => (
                              <div key={index} className="flex items-start">
                                <div className="text-green-500 mt-0.5 mr-2 flex-shrink-0">
                                  <CheckIcon />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <span className="text-blue-700 dark:text-blue-400 font-bold">
                              Rs. {course.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Individual Courses */}
                {individualCourses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Individual Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      {individualCourses.map((course) => (
                        <div
                          key={course.id}
                          className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                            selectedIndividualCourses.includes(course.id)
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                          } ${selectedComboCourse ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            !selectedComboCourse &&
                            handleIndividualCourseSelect(course.id)
                          }
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-300 flex items-center justify-center text-blue-700 dark:text-blue-300">
                              {course.icon}
                            </div>
                            {selectedIndividualCourses.includes(course.id) && (
                              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                <CheckIcon />
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {course.title}
                          </h3>
                          <div className="flex mb-3">
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                              {course.licenseType}
                            </span>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                              <BookIcon />
                              <span className="ml-2">
                                {course.classes} Classes
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                              <ClockIcon />
                              <span className="ml-2">
                                {course.timePerClass} per class
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1 mb-3">
                            {course.details.slice(0, 2).map((detail, index) => (
                              <div key={index} className="flex items-start">
                                <div className="text-green-500 mt-0.5 mr-2 flex-shrink-0">
                                  <CheckIcon />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <span className="text-blue-700 dark:text-blue-400 font-bold">
                              Rs. {course.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="my-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                License Information
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Do you have a Learning License for the selected vehicle(s)?
              </p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleLearningLicenseSelect("yes")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      hasLearningLicense === "yes"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleLearningLicenseSelect("no")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      hasLearningLicense === "no"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  No
                </button>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Do you have a Driving License of any vehicle already?
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setHasExistingLicense("yes")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        hasExistingLicense === "yes"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasExistingLicense("no")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        hasExistingLicense === "no"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {showConfirmationModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Confirm Booking
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Are you sure you want to proceed with this booking? This
                    action cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowConfirmationModal(false)}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-blue-400"
                    >
                      {loading ? "Processing..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(selectedComboLicense || selectedIndividualLicenses.length > 0) && 
            (!selectedComboCourse && selectedIndividualCourses.length === 0) && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Course Training Required
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>
                        License services must be accompanied by course training. Please select a training course below to continue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary - Always at bottom */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 lg:p-6 border-t-2 border-blue-500">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Payment Summary
                </h2>

                {hasSelections ? (
                  <>
                    <div className="space-y-3 mb-6">
                      {getSelectedItems().map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <div>
                              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium block">
                                {item.title}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {item.type === "license"
                                  ? "License"
                                  : "Training"}
                              </span>
                            </div>
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            Rs. {item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          Rs. {calculateTotal()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Discount
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          Rs. 0
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Total
                        </span>
                        <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                          Rs. {calculateTotal()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      No items selected yet
                    </p>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full py-3 lg:py-4 rounded-lg font-medium transition-colors duration-200 ${
                    hasSelections && hasLearningLicense && hasExistingLicense
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={
                    !hasSelections || !hasLearningLicense || !hasExistingLicense
                  }
                >
                  {(() => {
                    if (!hasLearningLicense || !hasExistingLicense) {
                      return "Answer License Questions to Continue";
                    }
                    if (!hasSelections) {
                      return "Select Options to Continue";
                    }
                    
                    const selectedItems = getSelectedItems();
                    const selectedLicenseItems = selectedItems.filter((item) => item.type === "license");
                    const selectedCourseItems = selectedItems.filter((item) => item.type === "course");
                    
                    if (selectedLicenseItems.length > 0 && selectedCourseItems.length === 0) {
                      return "Select Training Course to Continue";
                    }
                    
                    return "Proceed to Booking";
                  })()}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollCourses02;
