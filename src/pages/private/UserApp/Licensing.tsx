import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GovernmentIdIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="33.75"
      height="30"
      viewBox="0 0 33.75 30"
    >
      <defs>
        <clipPath id="master_svg0_494_16001">
          <rect x="0" y="0" width="33.75" height="30" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_494_16001)">
        <g transform="matrix(1,0,0,-1,0,57.5390625)">
          <g>
            <path
              d="M0,51.26953125L33.75,51.26953125L0,51.26953125L33.75,51.26953125Q33.6914,52.85153125,32.6367,53.906231250000005Q31.582,54.96093125,30,55.01953125L3.75,55.01953125Q2.16797,54.96093125,1.11328,53.906231250000005Q0.0585938,52.85153125,0,51.26953125ZM0,49.39453125L0,32.51953125L0,49.39453125L0,32.51953125Q0.0585938,30.93750125,1.11328,29.88281125Q2.16797,28.82812505,3.75,28.76953125L30,28.76953125Q31.582,28.82812505,32.6367,29.88281125Q33.6914,30.93750125,33.75,32.51953125L33.75,49.39453125L0,49.39453125ZM3.75,33.16406125Q3.80859,34.45312125,4.6875,35.33203125Q5.56641,36.21094125,6.85547,36.26953125L13.7695,36.26953125Q15.0586,36.21094125,15.9375,35.33203125Q16.8164,34.45312125,16.875,33.16406125Q16.8164,32.57812125,16.2305,32.51953125L4.39453,32.51953125Q3.80859,32.57812125,3.75,33.16406125ZM10.3125,45.64453125Q12.4219,45.58593125,13.5352,43.76953125Q14.5898,41.89453125,13.5352,40.01953125Q12.4219,38.20312125,10.3125,38.14453125Q8.20312,38.20312125,7.08984,40.01953125Q6.03516,41.89453125,7.08984,43.76953125Q8.20312,45.58593125,10.3125,45.64453125ZM20.625,44.70703125Q20.6836,45.58593125,21.5625,45.64453125L29.0625,45.64453125Q29.9414,45.58593125,30,44.70703125Q29.9414,43.82813125,29.0625,43.76953125L21.5625,43.76953125Q20.6836,43.82813125,20.625,44.70703125ZM20.625,40.95703125Q20.6836,41.83593125,21.5625,41.89453125L29.0625,41.89453125Q29.9414,41.83593125,30,40.95703125Q29.9414,40.07813125,29.0625,40.01953125L21.5625,40.01953125Q20.6836,40.07813125,20.625,40.95703125ZM20.625,37.20703125Q20.6836,38.08594125,21.5625,38.14453125L29.0625,38.14453125Q29.9414,38.08594125,30,37.20703125Q29.9414,36.32812125,29.0625,36.26953125L21.5625,36.26953125Q20.6836,36.32812125,20.625,37.20703125Z"
              fill="#145CFF"
              fillOpacity="1"
              style={{ mixBlendMode: "passthrough" as any }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const PassportPhotoIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <defs>
        <clipPath id="master_svg0_494_15970">
          <rect x="0" y="0" width="30" height="30" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_494_15970)">
        <g transform="matrix(1,0,0,-1,0,57.5390625)">
          <g>
            <path
              d="M8.73047,53.08593125L8.14453,51.26953125L8.73047,53.08593125L8.14453,51.26953125L3.75,51.26953125Q2.16797,51.21093125,1.11328,50.156231250000005Q0.0585938,49.10153125,0,47.51953125L0,32.51953125Q0.0585938,30.93750125,1.11328,29.88281125Q2.16797,28.82812505,3.75,28.76953125L26.25,28.76953125Q27.832,28.82812505,28.8867,29.88281125Q29.9414,30.93750125,30,32.51953125L30,47.51953125Q29.9414,49.10153125,28.8867,50.156231250000005Q27.832,51.21093125,26.25,51.26953125L21.8555,51.26953125L21.2695,53.08593125Q20.5664,54.90233125,18.5742,55.01953125L11.4258,55.01953125Q9.43359,54.90233125,8.73047,53.08593125ZM15,45.64453125Q16.5234,45.64453125,17.8125,44.882831249999995Q19.1016,44.12113125,19.8633,42.83203125Q20.625,41.48433125,20.625,40.01953125Q20.625,38.55469125,19.8633,37.20703125Q19.1016,35.91797125,17.8125,35.15625125Q16.5234,34.39453125,15,34.39453125Q13.4766,34.39453125,12.1875,35.15625125Q10.8984,35.91797125,10.1367,37.20703125Q9.375,38.55469125,9.375,40.01953125Q9.375,41.48433125,10.1367,42.83203125Q10.8984,44.12113125,12.1875,44.882831249999995Q13.4766,45.64453125,15,45.64453125Z"
              fill="#145CFF"
              fillOpacity="1"
              style={{ mixBlendMode: "passthrough" as any }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const ProofOfAgeIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="26.25"
      height="30"
      viewBox="0 0 26.25 30"
    >
      <defs>
        <clipPath id="master_svg0_494_15932">
          <rect x="0" y="0" width="26.25" height="30" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_494_15932)">
        <g transform="matrix(1,0,0,-1,0,61.2890625)">
          <g>
            <path
              d="M7.5,60.64453125Q8.32031,60.64453125,8.84766,60.11723125Q9.375,59.58983125,9.375,58.76953125L9.375,56.89453125L16.875,56.89453125L16.875,58.76953125Q16.875,59.58983125,17.4023,60.11723125Q17.9297,60.64453125,18.75,60.64453125Q19.5703,60.64453125,20.0977,60.11723125Q20.625,59.58983125,20.625,58.76953125L20.625,56.89453125L23.4375,56.89453125Q24.6094,56.83593125,25.4297,56.07423125Q26.1914,55.25393125,26.25,54.08203125L26.25,51.26953125L0,51.26953125L0,54.08203125Q0.0585938,55.25393125,0.820312,56.07423125Q1.64062,56.83593125,2.8125,56.89453125L5.625,56.89453125L5.625,58.76953125Q5.625,59.58983125,6.15234,60.11723125Q6.67969,60.64453125,7.5,60.64453125ZM0,49.39453125L26.25,49.39453125L0,49.39453125L26.25,49.39453125L26.25,33.45703125Q26.1914,32.28515125,25.4297,31.46484325Q24.6094,30.70312505,23.4375,30.64453125L2.8125,30.64453125Q1.64062,30.70312505,0.820312,31.46484325Q0.0585938,32.28515125,0,33.45703125L0,49.39453125ZM3.75,44.70703125L3.75,42.83203125L3.75,44.70703125L3.75,42.83203125Q3.80859,41.95313125,4.6875,41.89453125L6.5625,41.89453125Q7.44141,41.95313125,7.5,42.83203125L7.5,44.70703125Q7.44141,45.58593125,6.5625,45.64453125L4.6875,45.64453125Q3.80859,45.58593125,3.75,44.70703125ZM11.25,44.70703125L11.25,42.83203125L11.25,44.70703125L11.25,42.83203125Q11.3086,41.95313125,12.1875,41.89453125L14.0625,41.89453125Q14.9414,41.95313125,15,42.83203125L15,44.70703125Q14.9414,45.58593125,14.0625,45.64453125L12.1875,45.64453125Q11.3086,45.58593125,11.25,44.70703125ZM19.6875,45.64453125Q18.8086,45.58593125,18.75,44.70703125L18.75,42.83203125Q18.8086,41.95313125,19.6875,41.89453125L21.5625,41.89453125Q22.4414,41.95313125,22.5,42.83203125L22.5,44.70703125Q22.4414,45.58593125,21.5625,45.64453125L19.6875,45.64453125ZM3.75,37.20703125L3.75,35.33203125L3.75,37.20703125L3.75,35.33203125Q3.80859,34.45312125,4.6875,34.39453125L6.5625,34.39453125Q7.44141,34.45312125,7.5,35.33203125L7.5,37.20703125Q7.44141,38.08594125,6.5625,38.14453125L4.6875,38.14453125Q3.80859,38.08594125,3.75,37.20703125ZM12.1875,38.14453125Q11.3086,38.08594125,11.25,37.20703125L11.25,35.33203125Q11.3086,34.45312125,12.1875,34.39453125L14.0625,34.39453125Q14.9414,34.45312125,15,35.33203125L15,37.20703125Q14.9414,38.08594125,14.0625,38.14453125L12.1875,38.14453125ZM18.75,37.20703125L18.75,35.33203125L18.75,37.20703125L18.75,35.33203125Q18.8086,34.45312125,19.6875,34.39453125L21.5625,34.39453125Q22.4414,34.45312125,22.5,35.33203125L22.5,37.20703125Q22.4414,38.08594125,21.5625,38.14453125L19.6875,38.14453125Q18.8086,38.08594125,18.75,37.20703125Z"
              fill="#145CFF"
              fillOpacity="1"
              style={{ mixBlendMode: "passthrough" as any }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const AddressProofIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="22.5"
      height="30"
      viewBox="0 0 22.5 30"
    >
      <defs>
        <clipPath id="master_svg0_494_15963">
          <rect x="0" y="0" width="22.5" height="30" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_494_15963)">
        <g transform="matrix(1,0,0,-1,0,61.171875)">
          <g>
            <path
              d="M12.6562,31.2890625Q14.2383,33.2226575,16.5234,36.5039075Q18.8086,39.7265575,20.625,43.1836375Q22.3828,46.6406375,22.5,49.2773375Q22.3828,54.0820375,19.2188,57.2461375Q16.0547,60.410137500000005,11.25,60.5273375Q6.44531,60.410137500000005,3.28125,57.2461375Q0.117188,54.0820375,0,49.2773375Q0.117188,46.6406375,1.875,43.1836375Q3.69141,39.7265575,5.97656,36.5039075Q8.26172,33.2226575,9.84375,31.2890625Q10.4297,30.5859375,11.25,30.5859375Q12.0703,30.5859375,12.6562,31.2890625ZM11.25,53.0273375Q13.3594,52.9687375,14.4727,51.1523375Q15.5273,49.2773375,14.4727,47.4023375Q13.3594,45.5859375,11.25,45.5273375Q9.14062,45.5859375,8.02734,47.4023375Q6.97266,49.2773375,8.02734,51.1523375Q9.14062,52.9687375,11.25,53.0273375Z"
              fill="#145CFF"
              fillOpacity="1"
              style={{ mixBlendMode: "passthrough" as any }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const Licensing: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  //TODO:  check this
  // const [documentsSubmitted, setDocumentsSubmitted] = useState(false);

  // const handleSubmitDocuments = () => {
  //   setShowConfirmDialog(true);
  // };

  const confirmSubmission = () => {
    // setDocumentsSubmitted(true);
    setShowConfirmDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-2 py-6 lg:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Currently Licensing is an Offline Process
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            To ensure smooth and verified processing, we handle license
            applications offline at our center.
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-yellow-50/30 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-700 dark:text-yellow-300 font-medium">
              As per Indian RTO rules, a Learner's License (LL) is mandatory
              before starting any practical driving training on public
              roads—even if you don't want a permanent license.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Documents Required
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Government ID Proof */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <GovernmentIdIcon />
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Government ID Proof
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aadhaar card
                </p>
              </div>
            </div>

            {/* Passport-size Photo */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <PassportPhotoIcon />
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Passport-size Photo
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2 recent photos
                </p>
              </div>
            </div>

            {/* Proof of Age */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ProofOfAgeIcon />
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Proof of Age
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  10th Marks card / Birth certificate / Pancard
                </p>
              </div>
            </div>

            {/* Proof of Address */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <AddressProofIcon />
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Proof of Address
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aadhaar card / Electricity bill / Water bill
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {/* <button
            onClick={handleSubmitDocuments}
            disabled={documentsSubmitted}
            className={`w-full mt-8 font-bold py-3 rounded-lg transition-colors ${
              documentsSubmitted
                ? 'bg-blue-500 text-white cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-blue-700'
            }`}
          >
            {documentsSubmitted ? 'Documents Submitted' : 'I Have Submitted My Documents'}
          </button> */}
        </div>

        {/* Notice Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Notice
          </h2>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Aadhaar must be linked to your mobile number.</li>
              <li>
                • If your Aadhaar address is different from your current
                residence, you must submit an electricity or water bill as proof
                of address.
              </li>
              <li>• Passport-size photos must be recent one.</li>
            </ul>
          </div>
        </div>

        {/* Status Check Button */}
        <button
          className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-lg transition-colors border border-gray-400 dark:border-gray-600"
          onClick={() => navigate("/user/license-status")}
        >
          Check Licensing Status
        </button>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Document Submission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure that you have submitted all required documents to
                the office? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmission}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Yes, I Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Licensing;
