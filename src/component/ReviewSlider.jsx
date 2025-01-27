import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiseLoader } from "react-spinners";
const ReviewSlider = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarship-review/${id}`);
      return data;
    },
    queryKey: ["scholarship-review"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader className="" color="#890C25" />
      </div>
    );
  }

  console.log("reviews", reviews);
  return (
    <div className="">
      {reviews.length == 0 ? (
        <h2 className="text-center mt-6 text-2xl text-red-600 font-bold">
          No Review Found
        </h2>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          loop={Infinity}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper bg-primary rounded-md"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col justify-center items-center h-56 rounded-sm">
                <h2 className="text-2xl font-bold text-white">
                  {review.applicant_name}
                </h2>
                <p className="font-bold text-base text-white mb-4">
                  Review Date: {new Date(review.post_date).toLocaleDateString()}
                </p>
                <p className="flex items-center text-xl font-bold text-white">
                  {review.review_point}
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={review.review_point}
                    readOnly
                  />
                </p>
                <p className="text-xl text-white">
                  {review.review_comment}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewSlider;