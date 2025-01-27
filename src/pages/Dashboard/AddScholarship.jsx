import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const image_hosting_key = import.meta.env.VITE_IMG_HOST;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // console.log()
    const current = format(new Date(), "yyyy-MM-dd");
    const img = { image: data.university_logo[0] };
    console.log(img);

    // // generate img
    const { data: res } = await axios.post(image_hosting_api, img, {
      headers: { "content-type": "multipart/form-data" },
    });
    const img_url = res.data.display_url;
    console.log(img_url);
    // add data
    data.posted_user = user?.email;
    data.deadline = format(new Date(startDate), "yyyy-MM-dd");
    data.post_date = current;
    data.university_logo = img_url;
    console.log(data);
    const { data: scholarship_post } = await axiosSecure.post(
      "/all-scholarship",
      data
    );
    console.log(scholarship_post);
    if (scholarship_post.insertedId) {
      reset();
      Swal.fire("Scholarship added successfully");
    }
  };
  return (
    <div>
      <Helmet>
        <title>EduFunds | Dashboard add-scholarship</title>
      </Helmet>
      <div className="bg-base-100 border border-primary md:max-w-3xl lg:max-w-5xl mx-auto p-5 rounded-md">
        <h2 className="text-center text-3xl font-bold font-cinzel text-primary">
          Add A Scholarship
        </h2>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* row 1 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Scholarship Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input scholarship name"
                  className="input input-bordered text-primary"
                  required
                  {...register("scholarship_name")}
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input university name"
                  className="input input-bordered text-primary"
                  required
                  {...register("university_name")}
                />
              </div>
            </div>
            {/* row 2 */}
            <div className="md:flex gap-6">
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University Logo
                  </span>
                </label>
                <input
                  type="file"
                  className=""
                  required
                  {...register("university_logo")}
                />
              </div>
              <div className="form-control full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University Country
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input university country"
                  className="input input-bordered text-primary"
                  required
                  {...register("university_country")}
                />
              </div>
            </div>
            <div className="md:flex gap-6">
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University City
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="input university city"
                  className="input input-bordered text-primary"
                  required
                  {...register("university_city")}
                />
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    University Rank
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="input university rank number"
                  className="input input-bordered text-primary"
                  required
                  {...register("university_rank")}
                />
              </div>
            </div>
            {/* row 3 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Subject Category
                  </span>
                </label>
                <select {...register("subject")} className="select w-full">
                  <option disabled selected>
                    Select Your Subject
                  </option>

                  <option value="Agriculture">Agriculture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Scholarship Category
                  </span>
                </label>
                <select
                  {...register("scholarship_category")}
                  className="select w-full"
                >
                  <option disabled selected>
                    Pick Your Scholarship Category
                  </option>
                  <option value="Full-fund">Full-fund</option>
                  <option value="Partial-fund">Partial-fund</option>
                  <option value="Self-fund"> Self-fund</option>
                </select>
              </div>
            </div>
            {/* row 4 */}
            <div className="md:flex gap-6">
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
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">Tuition Fess</span>
                </label>
                <input
                  {...register("tuition_fees")}
                  type="number"
                  placeholder="input tuition fess"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* row 5 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Application Fees
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="input application fees"
                  className="input input-bordered"
                  required
                  {...register("application_fees")}
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Service Charge
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="input service charge"
                  className="input input-bordered"
                  required
                  {...register("service_charge")}
                />
              </div>
            </div>
            {/* row 7 */}
            <div className="md:flex gap-6">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-primary">
                    Application Deadline
                  </span>
                </label>
                <DatePicker
                  className="input input-bordered w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="mt-3">
              <button className="w-full bg-primary text-white py-2 text-lg rounded-md hover:rounded-2xl transition-all duration-300">
                Add Scholarship
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;