import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { RiseLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
        <RiseLoader color="#4F46E5" />
      </div>
    );
  }

  return (
    <div className="md:max-w-5xl mx-auto px-4 mt-24">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-primary mb-10 font-cinzel">
        What Students Say
      </h2>

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
        className="mySwiper"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-10 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center mx-2 min-h-[300px] transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl md:text-2xl font-bold">
                {review.university_name}
              </h3>
              <p className="text-lg font-medium mt-1">
                {review.applicant_name}
              </p>
              <p className="text-sm mt-2">
                Review Date:{" "}
                {new Date(review.post_date).toLocaleDateString("en-US")}
              </p>

              <div className="flex flex-col items-center mt-4">
                <span className="text-xl font-semibold text-yellow-400">
                  {review.review_point} / 5
                </span>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={review.review_point}
                  readOnly
                />
              </div>

              <p className="text-md md:text-lg mt-6 px-2 md:px-10">
                “{review.review_comment}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AllReview;