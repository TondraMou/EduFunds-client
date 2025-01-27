import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogIn from "../../component/Shared/GoogleLogIn";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  // console.log(location.state?.from?.pathname)
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const image_hosting_key = import.meta.env.VITE_IMG_HOST;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userData) => {
    setError("");
    // password validation
    if (userData.password.length < 6) {
      console.log("password error");
      return setError("Password must be 6 characters or more");
    } else if (/^[^A-Z]*$/.test(userData.password)) {
      return setError("password must have one uppercase");
    } else if (/^[^!@#$%^&*()]*$/.test(userData.password)) {
      return setError("Password must have one special character");
    }

    // generate img url
    const img = { image: userData.userPhoto[0] };
    console.log(userData);
    const { data } = await axios.post(image_hosting_api, img, {
      headers: { "content-type": "multipart/form-data" },
    });
    // console.log("axios", data.data.display_url);
    // set url
    const img_url = data.data.display_url;

    // create user
    createUser(userData.email, userData.password)
      .then(async (result) => {
        const userInfo = {
          name: userData.userName,
          email: userData.email,
          role: "User",
        };
        // update user info
        const { data } = await axiosPublic.post("/users", userInfo);
        console.log(data);
        updateUserProfile(userData.userName, img_url);
        console.log(result.user);
        Swal.fire("Register successfully");
        setTimeout(() => {
          navigate(from);
        }, 1000);
      })
      .catch((error) => {
        if (error?.message == "Firebase: Error (auth/email-already-in-use).") {
          setError("Already have an account on this user");
        } else {
          setError(error?.message);
        }
      });
  };
  // remove error
  const handleRemoverError = () => {
    setError("");
  };
  return (
    <section className="w-full max-w-lg sm:max-w-md p-6 m-auto rounded-lg shadow-2xl mt-12 bg-primary text-white">
      <Helmet>
        <title>EduFunds | Register</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold mb-6">Register</h2>

      {error && (
        <p className="text-center my-3 text-base font-semibold text-red-600 flex items-center gap-2 justify-center">
          {error}
          <FaRegCircleXmark
            className="text-base cursor-pointer"
            onClick={handleRemoverError}
          />
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">
              Your Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered text-primary w-full"
            required
            {...register("userName")}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">Photo</span>
          </label>
          <input
            type="file"
            className="w-full text-primary"
            required
            {...register("userPhoto")}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered text-primary w-full"
            required
            {...register("email")}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">
              Password
            </span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered text-primary w-full"
            required
            {...register("password")}
          />
          <span className="text-white text-xs mt-1">
            <span className="font-semibold">*Note: </span>Password must be 6
            characters or more and include one uppercase and one special
            character.
          </span>
        </div>

        <div className="mt-6">
          <button className="w-full text-black hover:rounded-2xl transition-all duration-300 px-6 py-2.5 bg-[#F8EDEB] rounded-md font-semibold">
            Register
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b border-white lg:w-1/5"></span>

        <p className="text-xs text-center font-bold text-white">
          or Register with Social Media
        </p>

        <span className="w-1/5 border-b border-white lg:w-1/5"></span>
      </div>

      <GoogleLogIn />

      <p className="mt-8 text-base font-semibold text-center text-white">
        Already have an account?{" "}
        <Link to="/login" className="text-white underline">
          Please Login
        </Link>
      </p>
    </section>
  );
};

export default Register;