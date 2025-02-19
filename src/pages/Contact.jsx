import { useState } from "react";
import emailjs from "emailjs-com";
import contactImage from "../assets/contact-image.png"; // Your image path

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    setSuccessMessage("Sending your message...");

    // Send email using Email.js with environment variables
    emailjs
      .send(
        import.meta.env.VITE_service_ID,
        import.meta.env.VITE_template_ID,
        formData,
        import.meta.env.VITE_public_key
      )
      .then(
        (response) => {
          console.log("Message sent successfully", response);
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("Message sending failed", error);
          setError("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      {/* Left side - Image Section */}
      <div
        className="md:w-1/2 h-80 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${contactImage})` }}
      ></div>

      {/* Right side - Form Section */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 text-center mb-4">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Enter your email address"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Write your message here"
                rows="6"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;