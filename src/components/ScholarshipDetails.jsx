import { useState, useEffect, useContext } from 'react';  // Import useState, useEffect, and useContext
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; // Import AuthContext
import axios from 'axios';
import ReactModal from 'react-modal';
import PaymentPage from '../pages/PaymentPage';

ReactModal.setAppElement('#root');

const ScholarshipDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);  // Get user from AuthContext
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scholarships/${id}`, {
          withCredentials: true,  
        });
        setScholarship(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scholarship details", error);
        setLoading(false);
        navigate('/login');  // Navigate to login if fetching fails
      }
    };

    fetchScholarshipDetails();
  }, [id, navigate]);

  const handleApplyClick = () => {
    if (!user) {  // Check if user is not logged in
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      setIsModalOpen(true);  // Open modal when applying for scholarship
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!scholarship) {
    return <div>Scholarship not found.</div>;
  }

  return (
    <div className="w-[80%] mx-auto flex flex-col justify-center">
      <img src={scholarship.image} alt={scholarship.scholarshipName} className="scholarship-logo" />
      <h1 className='text-3xl'>{scholarship.scholarshipName}</h1>
      <p><strong>University Name:</strong> {scholarship.universityName}</p>
      <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
      <p><strong>Location:</strong> {scholarship.country}, {scholarship.city}</p>
      <p><strong>Application Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
      <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
      <p><strong>Post Date:</strong> {new Date(scholarship.postDate).toLocaleDateString()}</p>
      <p><strong>Service Charge:</strong> {scholarship.serviceCharge}</p>
      <p><strong>Application Fees:</strong> {scholarship.applicationFees}</p>
      <button className='mb-6 mt-4 btn-primary btn' onClick={handleApplyClick}>Apply for Scholarship</button>

      {/* Modal for Payment */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-btn">X</button>  {/* Close button for the modal */}
        <PaymentPage 
          scholarshipId={id} 
          applicationFees={scholarship.applicationFees} 
          universityName={scholarship.universityName} 
          subjectCategory={scholarship.subjectCategory} 
          scholarshipCategory={scholarship.scholarshipCategory}
        /> {/* Pass scholarshipId to Payment component */}
      </ReactModal>
    </div>
  );
};

export default ScholarshipDetails;