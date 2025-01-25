import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Dialog, Transition, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';

const EditScholarshipModal = ({ scholarship, setShowModal, setScholarships, isOpen }) => {
  const [updatedData, setUpdatedData] = useState({ ...scholarship });
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(`/scholarships/${updatedData._id}`, updatedData);
      setScholarships((prevState) =>
        prevState.map((scholarship) =>
          scholarship._id === updatedData._id ? updatedData : scholarship
        )
      );
      toast.success('Scholarship updated successfully!');
      setShowModal(false);
    } catch (err) {
      console.error('Error updating scholarship:', err);
      toast.error('Failed to update scholarship.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-lg font-medium text-center leading-6 text-gray-900">
                  Edit Scholarship
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Name:</label>
                    <input
                      type="text"
                      name="scholarshipName"
                      value={updatedData.scholarshipName}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">University Name:</label>
                    <input
                      type="text"
                      name="universityName"
                      value={updatedData.universityName}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Category:</label>
                    <select
                      name="subjectCategory"
                      value={updatedData.subjectCategory}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                      <option value="">Select Subject Category</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Doctor">Doctor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Category:</label>
                    <select
                      name="scholarshipCategory"
                      value={updatedData.scholarshipCategory}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                      <option value="">Select Scholarship Category</option>
                      <option value="Full fund">Full fund</option>
                      <option value="Partial">Partial</option>
                      <option value="Self-fund">Self-fund</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree:</label>
                    <select
                      name="degree"
                      value={updatedData.degree}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                      <option value="">Select Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>

                  {/* Add additional fields here */}

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      Update Scholarship
                    </button>
                  </div>
                </form>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditScholarshipModal;