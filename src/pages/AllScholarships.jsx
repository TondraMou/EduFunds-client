import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import sorry from "../assets/sorry.png";


const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch scholarships from the backend
    const fetchScholarships = async (page = 1, search = '') => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/all-scholarships', {
                params: { page, search, limit: 6 },
            });
            setScholarships(response.data.scholarships);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching scholarships:', error);
            setLoading(false);
        }
    };

    // Call fetchScholarships whenever page or search term changes
    useEffect(() => {
        fetchScholarships(page, searchTerm);
    }, [page, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); 
        fetchScholarships(1, searchTerm);
    };

    if (loading) {
        return <div> <LoadingSpinner></LoadingSpinner> </div>;
    }

    if (scholarships.length === 0) {
        return (
            <div className="text-center">
                <img src={sorry} alt="No results" className="mx-auto w-96" />
                <p>No scholarships available</p>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto">
            {/* Search Box */}
            <div className="search-box mb-4 flex justify-center">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search Scholarships"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button type="submit" className="ml-2 bg-blue-500 text-white py-2 px-4 rounded">
                        Search
                    </button>
                </form>
            </div>

            {/* Scholarships Grid */}
            <div className="scholarships-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {scholarships.map(scholarship => (
                    <div key={scholarship._id} className="scholarship-card p-4 border rounded shadow-md">
                        <img
                            src={scholarship.image}
                            alt={scholarship.universityName}
                            className="w-full h-32 object-cover rounded mb-4"
                        />
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

            {/* Pagination */}
            <div className="pagination mt-4 mb-6 text-center">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Previous
                </button>
                <span className="mx-4">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllScholarships;