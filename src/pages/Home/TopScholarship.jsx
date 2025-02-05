import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { RiseLoader } from "react-spinners";
import HomePgCard from "./HomePgCard";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const TopScholarship = () => {
  const axiosPublic = useAxiosPublic();
  const { data: scholarship, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-scholarship-home");
      return data;
    },
    queryKey: ["home-scholarship"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }

  return (
    <div className="mt-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-cinzel text-primary">
          Top Scholarship
        </h2>
        <h4 className="font-bold mt-2 tex-base">Explore Our top scholarship</h4>
      </div>
      <Slide direction="up" triggerOnce={true} duration={1000}>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarship?.map((item) => (
            <HomePgCard item={item} key={item._id}></HomePgCard>
          ))}
        </div>
      </Slide>
      <div className="mt-5 flex justify-center">
        <Link to="/all-scholarship">
          <button className="w-full text-center py-2 rounded-md bg-primary text-white hover:rounded-2xl duration-300 transition-all px-2">
            All scholarship
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;