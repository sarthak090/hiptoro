import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { getYtEmbed } from "@/utils/movies/yt-embed";

export default function YTEmbed(props: any) {
  const { videos, titleToShow } = props;

  return (
    <div>
      <Swiper
        breakpoints={{
          300: {
            // width: 576,
            slidesPerView: 1,
          },
          768: {
            // width: 768,
            slidesPerView: 2,
          },
        }}
        spaceBetween={50}
        slidesPerView={2}
      >
        <SwiperNavigation videosLength={videos.length} />

        {videos.map((video: any) => (
          <SwiperSlide
            key={video.id}
            className="flex flex-col items-center m-2"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: getYtEmbed(video?.key, titleToShow),
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const SwiperNavigation = (props: any) => {
  const swiper = useSwiper();
  if (props.videosLength > 2) {
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
  }
  return null;
};
