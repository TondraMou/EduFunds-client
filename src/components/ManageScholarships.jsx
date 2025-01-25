import { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Modal from './Modal';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axiosSecure.get('/scholarships');
        setScholarships(data);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
      }
    };
    fetchScholarships();
  }, []);

  const handleEdit = (scholarship) => {
    setCurrentScholarship(scholarship);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/scholarships/${id}`);
      setScholarships(scholarships.filter(scholarship => scholarship._id !== id));
      toast.success('Scholarship deleted successfully!');
    } catch (err) {
      console.error('Error deleting scholarship:', err);
      toast.error('Failed to delete scholarship.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)]">
      <h2 className="text-2xl font-semibold mb-6">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Scholarship Name</th>
              <th className="py-2 px-4">University Name</th>
              <th className="py-2 px-4">Subject Category</th>
              <th className="py-2 px-4">Degree</th>
              <th className="py-2 px-4">Application Fees</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship) => (
              <tr key={scholarship._id} className="border-b">
                <td className="py-2 px-4">{scholarship.scholarshipName}</td>
                <td className="py-2 px-4">{scholarship.universityName}</td>
                <td className="py-2 px-4">{scholarship.subjectCategory}</td>
                <td className="py-2 px-4">{scholarship.degree}</td>
                <td className="py-2 px-4">{scholarship.applicationFees} USD</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(scholarship)} 
                    className="p-2 text-blue-500 hover:text-blue-700 transition"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(scholarship._id)} 
                    className="p-2 text-red-500 hover:text-red-700 transition"
                  >
                    <AiOutlineDelete />
                  </button>
                  <Link to={`/scholarship-details/${scholarship._id}`}>
                    <button className="p-2 text-green-500 hover:text-green-700 transition">
                      <AiOutlineEye />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      {showModal && (
        <Modal
        scholarship={currentScholarship}
        setShowModal={setShowModal}
        setScholarships={setScholarships}
        isOpen={showModal}
        />
      )}
    </div>
  );
};

export default ManageScholarships;