import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

export default function Cast(props: any) {
  const { casts } = props;

  return (
    <div>
      <Swiper
        breakpoints={{
          300: {
            // width: 576,
            slidesPerView: 2,
          },
          450: {
            // width: 576,
            slidesPerView: 2,
          },
          768: {
            // width: 768,
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 8,
          },
        }}
        spaceBetween={50}
        modules={[Navigation]}
        className="justify-center  "
      >
        {casts
          .filter((t: any) => t.profile_path !== null)
          .map((cast: any) => (
            <SwiperSlide
              key={cast.id}
              className="flex flex-col items-center m-2 mb-12"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.character}
                width="300"
                height="250"
                className="rounded-lg"
              />
              <p> {cast.name}</p>
              <p className="text-gray-700 italic">
                {cast.character || cast.job}
              </p>
            </SwiperSlide>
          ))}

        <SwiperNavigation />
      </Swiper>
    </div>
  );
}

const SwiperNavigation = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="flex justify-between gap-4 text-xl">
        <button
          onClick={() => {
            swiper.slidePrev();
          }}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Previous
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => {
            swiper.slideNext();
          }}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
