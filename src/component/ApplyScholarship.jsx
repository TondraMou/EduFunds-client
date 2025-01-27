import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { format } from "date-fns";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
const ApplyScholarship = ({ scholarship_info, toggleForm: TrxID }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [value, setValue] = useState();
  const image_hosting_key = import.meta.env.VITE_IMG_HOST;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const {
    _id,
    deadline,
    university_name,
    scholarship_name,
    subject,
    service_charge,
    scholarship_category,
    application_fees,
    university_city,
    university_country,
  } = scholarship_info;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const { mutateAsync } = useMutation({
    mutationFn: async ({ applicant_info }) => {
      const { data } = await axiosSecure.post(
        `/applied-scholarship`,
        applicant_info
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire("applied successfully");
        navigate("/");
      }
    },
  });

  const onSubmit = async (applicant_info) => {
    //   generate img link
    const img = { image: applicant_info.applicant_photo[0] };
    const { data: res } = await axios.post(image_hosting_api, img, {
      headers: { "content-type": "multipart/form-data" },
    });
    const img_url = res.data.display_url;
    applicant_info.applicant_photo = img_url;
    // additional info
    applicant_info.applicant_name = user?.displayName;
    applicant_info.applicant_email = user?.email;
    applicant_info.apply_date = format(new Date(), "yyyy-MM-dd");
    applicant_info.deadline = deadline;
    applicant_info.scholarship_id = _id;
    applicant_info.service_charge = service_charge;
    applicant_info.application_fees = application_fees;
    applicant_info.scholarship_name = scholarship_name;
    applicant_info.university_city = university_city;
    applicant_info.university_country = university_country;
    applicant_info.status = "Pending";
    applicant_info.TrxID = TrxID;
    console.log(applicant_info);

    mutateAsync({ applicant_info });
  };
  return (
    <div>
      <div className="bg-base-100 border-2 border-primary md:max-w-3xl lg:max-w-5xl mx-auto p-5 rounded-md">
        <h2 className="text-center text-3xl font-bold font-cinzel text-primary">
          Applicant Information
        </h2>
        <div className="mt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body text-primary"
          >
            {/* row 1 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input university name"
                  className="input input-bordered"
                  required
                  defaultValue={university_name}
                  readOnly
                  {...register("university_name")}
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Subject Category
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input subject category"
                  className="input input-bordered"
                  required
                  defaultValue={subject}
                  {...register("subject")}
                />
              </div>
            </div>
            {/* row 2 */}
            <div className="md:flex gap-6">
              <div className="form-control full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Scholarship Category
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input scholarship category"
                  className="input input-bordered"
                  defaultValue={scholarship_category}
                  required
                  {...register("scholarship_category")}
                  readOnly
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">Degree Name</span>
                </label>
                <select {...register("degree_name")} className="select w-full">
                  <option disabled selected>
                    Pick Your Degree Name
                  </option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Maters">Masters</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-6">
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Professional Photo
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="input scholarship name"
                  className="input"
                  required
                  {...register("applicant_photo")}
                />
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Contact Number
                  </span>
                </label>

                <PhoneInput
                  international
                  defaultCountry="US"
                  className="input input-bordered"
                  placeholder="Enter phone number"
                  value={value}
                  {...register("contact_number")}
                  onChange={setValue}
                />
              </div>
            </div>
            {/* row 3 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text text-primary">Village Name</span>
                </label>
                <input
                  type="text"
                  placeholder="input village name"
                  className="input input-bordered"
                  required
                  {...register("village_name")}
                />
              </div>
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text text-primary">District</span>
                </label>
                <input
                  type="text"
                  placeholder="input District name"
                  className="input input-bordered"
                  required
                  {...register("district_name")}
                />
              </div>
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text text-primary">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="input Country name"
                  className="input input-bordered"
                  required
                  {...register("country_name")}
                />
              </div>
            </div>
            {/* row 4 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">SSC Result</span>
                </label>
                <input
                  {...register("ssc_result", { min: 1, max: 5 })}
                  type="text"
                  placeholder="input university name"
                  className="input SSC result"
                  required
                />
                {errors.ssc_result && (
                  <span className="text-red-600">input correct GPA 1-5</span>
                )}
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">HSC Result</span>
                </label>
                <input
                  {...register("hsc_result", { min: 1, max: 5 })}
                  type="text"
                  placeholder="input SSC result"
                  className="input input-bordered"
                  required
                />
                {errors.hsc_result && (
                  <span className="text-red-600">input correct GPA 1-5</span>
                )}
              </div>
            </div>

            {/* row 7 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">Gender</span>
                </label>
                <select {...register("gender")} className="select w-full">
                  <option disabled selected>
                    Your Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Study Gap *(Optional)
                  </span>
                </label>
                <select {...register("study_gap")} className="select w-full">
                  <option selected>No gap</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1 year">1 year</option>
                  <option value="Upto 1 year">Upto 1 year</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <button className="w-full bg-primary text-white py-2 text-lg rounded-md hover:rounded-2xl transition-all duration-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
ApplyScholarship.propTypes = {
  scholarship_info: PropTypes.object,
  toggleForm: PropTypes.string,
};
export default ApplyScholarship;