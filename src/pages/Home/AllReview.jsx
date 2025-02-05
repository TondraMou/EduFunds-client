import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {  RiseLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { SwiperSlide } from "swiper/react";
// import Swiper from "swiper";
const AllReview = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosPublic.get("/home-review");
      return data;
    },
    queryKey: ["home-reviews"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#0000FF" />
      </div>
    );
  }

  return (
    <div className="md:max-w-4xl mx-auto rounded-md mt-32 px-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-primary rounded-md text-white"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center justify-center h-auto md:h-64 px-6 py-8 rounded-sm">
              <h2 className="text-lg md:text-2xl font-bold text-center">
                {review.university_name}
              </h2>
              <h2 className="text-lg md:text-2xl font-bold text-center mt-1">
                {review.applicant_name}
              </h2>
              <p className="font-medium text-sm md:text-base text-center mt-2">
                Review Date: {new Date(review.post_date).toLocaleDateString()}
              </p>
              <p className="flex items-center justify-center text-lg md:text-xl font-bold mt-2">
                {review.review_point}
                <Rating
                  style={{ maxWidth: 150 }}
                  value={review.review_point}
                  readOnly
                />
              </p>
              <p className="text-sm md:text-lg text-center mt-4">
                {review.review_comment}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AllReview;