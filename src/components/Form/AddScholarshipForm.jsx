import PropTypes from 'prop-types';
import { TbFidgetSpinner } from 'react-icons/tb';

const AddScholarshipForm = ({
  handleSubmit,
  uploadImage,
  setUploadImage,
  loading,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Scholarship Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="scholarshipName" className="block text-gray-600">
                Scholarship Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="scholarshipName"
                id="scholarshipName"
                type="text"
                placeholder="Scholarship Name"
                required
              />
            </div>

            {/* University Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="universityName" className="block text-gray-600">
                University Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="universityName"
                id="universityName"
                type="text"
                placeholder="University Name"
                required
              />
            </div>

            {/* University Country */}
            <div className="space-y-1 text-sm">
              <label htmlFor="country" className="block text-gray-600">
                University Country
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="country"
                id="country"
                type="text"
                placeholder="Country"
                required
              />
            </div>

            {/* University City */}
            <div className="space-y-1 text-sm">
              <label htmlFor="city" className="block text-gray-600">
                University City
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="city"
                id="city"
                type="text"
                placeholder="City"
                required
              />
            </div>

            {/* Degree */}
            <div className="space-y-1 text-sm">
              <label htmlFor="degree" className="block text-gray-600">
                Degree
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="degree"
              >
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            {/* Subject Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="subjectCategory" className="block text-gray-600">
                Subject Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="subjectCategory"
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Scholarship Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="scholarshipCategory" className="block text-gray-600">
                Scholarship Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="scholarshipCategory"
              >
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>

            {/* Tuition Fees */}
            <div className="space-y-1 text-sm">
              <label htmlFor="tuitionFees" className="block text-gray-600">
                Tuition Fees (Optional)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="tuitionFees"
                id="tuitionFees"
                type="number"
                placeholder="Tuition Fees"
              />
            </div>

            {/* Application Fees */}
            <div className="space-y-1 text-sm">
              <label htmlFor="applicationFees" className="block text-gray-600">
                Application Fees
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="applicationFees"
                id="applicationFees"
                type="number"
                placeholder="Application Fees"
                required
              />
            </div>

            {/* Service Charge */}
            <div className="space-y-1 text-sm">
              <label htmlFor="serviceCharge" className="block text-gray-600">
                Service Charge
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="serviceCharge"
                id="serviceCharge"
                type="number"
                placeholder="Service Charge"
                required
              />
            </div>

            {/* Application Deadline */}
            <div className="space-y-1 text-sm">
              <label htmlFor="applicationDeadline" className="block text-gray-600">
                Application Deadline
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="applicationDeadline"
                id="applicationDeadline"
                type="date"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) =>
                        setUploadImage({
                          image: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {uploadImage?.image?.name || 'Upload University Logo'}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Add Scholarship'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddScholarshipForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUploadImage: PropTypes.func.isRequired,
  uploadImage: PropTypes.object,
  loading: PropTypes.bool,
};

export default AddScholarshipForm;