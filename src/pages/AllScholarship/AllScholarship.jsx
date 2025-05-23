import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiseLoader } from "react-spinners";
import ScholarshipCard from "./ScholarshipCard";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const AllScholarship = () => {
  const [itemPerPg, setItemPerPg] = useState(6);
  const [count, setCount] = useState(0);
  const [currentPg, setCurrentPg] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const axiosPublic = useAxiosPublic();

  const { data: scholarship, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/all-scholarship?page=${currentPg}&size=${itemPerPg}&search=${search}`
      );
      return data;
    },
    queryKey: ["all-scholarship", currentPg, itemPerPg, search],
  });

  
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic.get(
        `all-scholarship-count?search=${search}`
      );
      setCount(data.count);
    };
    getCount();
  }, [search]);

  
  const handleSort = (order) => {
    setSortOrder(order);
  };


  const sortedScholarships = scholarship?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.application_fees - b.application_fees;
    } else {
      return b.application_fees - a.application_fees; 
    }
  });

  
  const numberOfPages = Math.ceil(count / itemPerPg);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePaginationBtn = (currentBtn) => {
    setCurrentPg(currentBtn);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search_text.value;
    setSearch(search_text);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }

  return (
    <div className="mt-20 mb-20">
      <Helmet>
        <title>EduFunds | All Scholarship</title>
      </Helmet>
      <div className="text-center">
        <h2 className="text-4xl font-bold font-cinzel text-primary">
          All Scholarship
        </h2>
      </div>
      <div className="my-10">
        <form className="flex px-5 md:px0 justify-center" onSubmit={handleSearch}>
          <div className="join md:w-1/3 mx-auto p-3 rounded-md shadow-lg">
            <input
              name="search_text"
              className="input border-primary join-item w-full"
              placeholder="Search by scholarship name or degree or university name"
            />
            <button className="btn join-item bg-primary text-white rounded-r-md">
              Search
            </button>
          </div>
        </form>
      </div>

      
      <div className="text-center my-4">
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="select select-bordered border-primary"
        >
          <option value="asc">Sort by Ascending Application Fee</option>
          <option value="desc">Sort by Descending Application Fee</option>
        </select>
      </div>

      {sortedScholarships?.length === 0 && (
        <h2 className="text-center text-red-600 text-2xl font-bold">
          No Scholarship/University Found
        </h2>
      )}

      
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {sortedScholarships?.map((item) => (
          <ScholarshipCard key={item._id} item={item} />
        ))}
      </div>

     
      <div className="flex justify-center mt-12">
       
        <button
          disabled={currentPg === 1}
          onClick={() => handlePaginationBtn(currentPg - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-primary hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">Previous</span>
          </div>
        </button>

        
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationBtn(btnNum)}
            key={btnNum}
            className={`hidden ${currentPg === btnNum ? "bg-primary text-white" : ""} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-primary hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

       
        <button
          disabled={currentPg === numberOfPages}
          onClick={() => handlePaginationBtn(currentPg + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-primary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllScholarship;