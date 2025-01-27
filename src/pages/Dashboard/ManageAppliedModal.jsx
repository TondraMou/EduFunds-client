import PropTypes from "prop-types";
import { FaXmark } from "react-icons/fa6";

const ManageAppliedModal = ({ info }) => {
  const {
    applicant_name,
    district_name,
    country_name,
    village_name,
    applicant_photo,
    university_name,
    scholarship_name,
    scholarship_category,
    subject,
    degree_name,
    ssc_result,
    hsc_result,
    service_charge,
    application_fees,
    apply_date,
  } = info;
  return (
    <div className="modal-box md:max-w-3xl bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-end">
        <form method="dialog">
          <button
            className="text-xl p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-200"
            aria-label="Close Modal"
          >
            <FaXmark />
          </button>
        </form>
      </div>

      <div className="mt-5 text-center">
        <h2 className="font-bold text-3xl text-primary">
          Applicant Information
        </h2>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <img
          className="w-36 h-36 rounded-full object-cover shadow-md"
          src={applicant_photo || "default-avatar.jpg"}
          alt="Applicant Photo"
        />
        <p className="text-sm text-primary mt-2">Applicant Photo</p>
      </div>

      <div className="mt-8 space-y-4">
        <section>
          <h3 className="text-xl font-bold text-primary border-b pb-2">
            Personal Information
          </h3>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">Name:</span>
            <span className={applicant_name ? "text-black" : "text-red-600"}>
              {applicant_name || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Address:</span>
            <span className={village_name ? "text-black" : "text-red-600"}>
              {village_name || "Missing"}
            </span>
            ,
            <span className={district_name ? "text-black" : "text-red-600"}>
              {district_name || "Missing"}
            </span>
            ,
            <span className={country_name ? "text-black" : "text-red-600"}>
              {country_name || "Missing"}
            </span>
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-primary border-b pb-2">
            Institution Details
          </h3>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">University:</span>
            <span className={university_name ? "text-black" : "text-red-600"}>
              {university_name || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Scholarship:</span>
            <span className={scholarship_name ? "text-black" : "text-red-600"}>
              {scholarship_name || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Subject:</span>
            <span className={subject ? "text-black" : "text-red-600"}>
              {subject || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Degree:</span>
            <span className={degree_name ? "text-black" : "text-red-600"}>
              {degree_name || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Category:</span>
            <span
              className={scholarship_category ? "text-black" : "text-red-600"}
            >
              {scholarship_category || "Missing"}
            </span>
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-primary border-b pb-2">
            Academic Performance
          </h3>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">SSC Result:</span>
            <span className={ssc_result ? "text-black" : "text-red-600"}>
              {ssc_result || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">HSC Result:</span>
            <span className={hsc_result ? "text-black" : "text-red-600"}>
              {hsc_result || "Missing"}
            </span>
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-primary border-b pb-2">
            Fees & Dates
          </h3>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">Application Fee:</span>
            <span className={application_fees ? "text-black" : "text-red-600"}>
              {application_fees || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Service Charge:</span>
            <span className={service_charge ? "text-black" : "text-red-600"}>
              {service_charge || "Missing"}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Apply Date:</span>
            <span className={apply_date ? "text-black" : "text-red-600"}>
              {apply_date
                ? new Date(apply_date).toLocaleDateString()
                : "Missing"}
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};
ManageAppliedModal.propTypes = {
  info: PropTypes.object,
};
export default ManageAppliedModal;