import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { imageUpload } from "../api/utils";
import useAuth from "../hooks/useAuth";

const ApplicationForm = () => {
  const { scholarshipId } = useParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    photo: null,
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
    universityName: "University Name",
    scholarshipCategory: "Scholarship Category",
    subjectCategory: "Subject Category",
  });
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    universityName: "",
    subjectCategory: "",
    scholarshipCategory: "",
  });

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/payment/latest?scholarshipId=${scholarshipId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          }
        });
        const data = await response.json();

        if (data.success) {
          setPaymentData({
            universityName: data.universityName,
            subjectCategory: data.subjectCategory,
            scholarshipCategory: data.scholarshipCategory,
          });

          setFormData((prevData) => ({
            ...prevData,
            universityName: data.universityName,
            subjectCategory: data.subjectCategory,
            scholarshipCategory: data.scholarshipCategory,
          }));
        } else {
          toast.error(`Failed to fetch payment data: ${data.message}`);
        }
      } catch (error) {
        toast.error("Error fetching payment data");
      }
    };

    if (scholarshipId) {
      fetchPaymentData();
    }
  }, [scholarshipId, user?.token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const uploadedImageUrl = await imageUpload(files[0]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: uploadedImageUrl,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const applicationData = {
      ...formData,
      userName: user?.name || "User Name",
      userEmail: user?.email || "",
      userId: user?.id || "",
      scholarshipId,
      dateApplied: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/api/apply-scholarship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted',
        text: 'You have successfully applied for the scholarship!',
      });
    } else {
      toast.error(`Application failed: ${data.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmitForm}>
        <h2 className="text-2xl font-semibold text-center mb-6">Scholarship Application Form</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              className="mt-2 w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="mt-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            className="mt-2 w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleFormChange}
            className="mt-2 w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Degree</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleFormChange}
            className="mt-2 w-full p-2 border rounded-md"
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">SSC Result</label>
            <input
              type="text"
              name="sscResult"
              value={formData.sscResult}
              onChange={handleFormChange}
              className="mt-2 w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">HSC Result</label>
            <input
              type="text"
              name="hscResult"
              value={formData.hscResult}
              onChange={handleFormChange}
              className="mt-2 w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Study Gap</label>
          <select
            name="studyGap"
            value={formData.studyGap}
            onChange={handleFormChange}
            className="mt-2 w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">University Name</label>
          <input
            type="text"
            value={formData.universityName}
            readOnly
            className="mt-2 w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Scholarship Category</label>
          <input
            type="text"
            value={formData.scholarshipCategory}
            readOnly
            className="mt-2 w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Subject Category</label>
          <input
            type="text"
            value={formData.subjectCategory}
            readOnly
            className="mt-2 w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md"
        >
          {loading ? "Submitting..." : "Submit / Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;