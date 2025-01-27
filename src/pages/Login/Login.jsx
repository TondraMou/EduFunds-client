import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogIn from "../../component/Shared/GoogleLogIn";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  // console.log(location.state?.from?.pathname);
  const { register, handleSubmit } = useForm();
  const onSubmit = (userData) => {
    if (userData.password.length < 6) {
      console.log("password error");
      return setError("Password must be 6 characters or more");
    } else if (/^[^A-Z]*$/.test(userData.password)) {
      return setError("password must have one uppercase");
    } else if (/^[^!@#$%^&*()]*$/.test(userData.password)) {
      return setError("Password must have one special character");
    }
    login(userData.email, userData.password)
      .then((result) => {
        Swal.fire("login successfully");
        navigate(from);
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invalid-credential).") {
          setError("Incorrect email or password");
        } else {
          setError(error.message);
        }
      });
  };
  // remove error
  const handleRemoverError = () => {
    setError("");
  };
  return (
    <section className="w-full max-w-lg sm:max-w-md p-6 m-auto bg-primary rounded-lg shadow-2xl mt-12 text-white">
      <Helmet>
        <title>EduFunds | Login</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold mb-4">Login</h2>

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
        </div>

        <div className="mt-6">
          <button className="w-full text-black hover:rounded-2xl transition-all duration-300 px-6 py-2.5 bg-[#F8EDEB] rounded-md font-semibold">
            LogIn
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b border-white lg:w-1/5"></span>
        <p className="text-xs text-center font-bold text-white">
          or login with Social Media
        </p>
        <span className="w-1/5 border-b border-white lg:w-1/5"></span>
      </div>

      <GoogleLogIn />

      <p className="mt-8 text-white font-semibold text-center">
        Are you new here?{" "}
        <Link to="/register" className="text-white underline">
          Please register
        </Link>
      </p>
    </section>
  );
};

export default Login;