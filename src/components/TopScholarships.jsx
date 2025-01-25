import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopScholarships = () => {
    const [topScholarships, setTopScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        axios.get('http://localhost:5000/top-scholarships')
            .then(response => {
                setTopScholarships(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching scholarships:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="scholarships-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {topScholarships.map(scholarship => (
                    <div key={scholarship._id} className="scholarship-card p-4 border rounded shadow-md">
                        <img src={scholarship.image} alt={scholarship.universityName} className="w-full h-32 object-cover rounded mb-4" />
                        <h3 className="font-bold text-lg">{scholarship.universityName}</h3>
                        <p>{scholarship.scholarshipCategory}</p>
                        <p>{scholarship.city}, {scholarship.country}</p>
                        <p><strong>Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                        <p><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>
                        <p><strong>Rating:</strong> {scholarship.avgRating ? scholarship.avgRating.toFixed(1) : 'No rating'}</p>
                        <Link to={`/scholarship-details/${scholarship._id}`} className="text-blue-500 mt-2 inline-block">
                            Scholarship Details
                        </Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4 mb-6">
                <Link to="/all-scholarship" className="bg-blue-500 text-white py-2 px-4 rounded">
                    All Scholarships
                </Link>
            </div>
        </div>
    );
};

export default TopScholarships;