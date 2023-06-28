import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

export default function SeasonsSlider(props: any) {
  const { seasons } = props;

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
        {seasons
          .filter((t: any) => t.poster_path !== null)
          .map((season: any) => (
            <SwiperSlide
              key={season.id}
              className="flex flex-col items-center m-2 mb-12"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                alt={season.name}
                title={season.name}
                width="300"
                height="250"
                className="rounded-lg"
              />
              <p> {season.name}</p>
              <p className="italic"> {season.episode_count} episodes</p>
            </SwiperSlide>
          ))}

        <SwiperNavigation dataLength={seasons.length || 0} />
      </Swiper>
    </div>
  );
}

const SwiperNavigation = ({ dataLength }: { dataLength: number }) => {
  const swiper = useSwiper();
  return (
    <>
      <div
        className={` ${
          dataLength < 8 ? "flex  lg:hidden" : "flex "
        } justify-between items-center gap-4 text-xl`}
      >
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
