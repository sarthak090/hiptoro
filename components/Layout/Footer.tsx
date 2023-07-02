import Image from "next/image";
import { nav1 } from "@/seed/footerLinks";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="max-w-site-full mx-auto   text-18px font-isidorasans_regular text-footer-link px-4    py-4 md:py-8  ">
        <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
          <div className="flex justify-center md:justify-start ">
            <Link href={"/"}>
              <Image
                src={"/imgs/footer-logo.webp"}
                width={100}
                height={10}
                alt="logo"
              />
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="  flex flex-wrap gap-8 justify-center  ">
              <a
                className="color-facebook flex flex-col items-center gap-2 text-[#fff]"
                href="https://facebook.com/hiptoro"
                target="_blank"
                original-title="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 256 255"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128C0 191.888 46.808 244.843 108 254.445V165H75.5V128H108V99.8C108 67.72 127.11 50 156.347 50C170.352 50 185 52.5 185 52.5V84H168.86C152.958 84 148 93.867 148 103.99V128H183.5L177.825 165H148V254.445C209.192 244.843 256 191.889 256 128Z"
                    fill="#3B5998"
                  />
                </svg>
                <span className="text-xs">Facebook</span>
              </a>
              <a
                className="color-twitter  flex flex-col items-center gap-2 text-[#fff]"
                href="https://twitter.com/HiptoroNews"
                target="_blank"
                original-title="Twitter"
              >
                {" "}
                <svg
                  viewBox="0 0 896 896"
                  fill="none"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M448 0C200.6 0 0 200.6 0 448C0 695.4 200.6 896 448 896C695.4 896 896 695.4 896 448C896 200.6 695.4 0 448 0ZM663.3 337.7C663.6 342.4 663.6 347.3 663.6 352.1C663.6 498.9 551.8 668 347.5 668C284.5 668 226.1 649.7 176.9 618.2C185.9 619.2 194.5 619.6 203.7 619.6C255.7 619.6 303.5 602 341.6 572.2C292.8 571.2 251.8 539.2 237.8 495.2C254.9 497.7 270.3 497.7 287.9 493.2C262.773 488.095 240.188 474.448 223.982 454.578C207.776 434.708 198.949 409.841 199 384.2V382.8C213.7 391.1 231 396.2 249.1 396.9C233.884 386.759 221.406 373.021 212.771 356.903C204.136 340.785 199.612 322.785 199.6 304.5C199.6 283.8 205 264.9 214.7 248.5C242.59 282.834 277.393 310.914 316.846 330.917C356.3 350.919 399.521 362.395 443.7 364.6C428 289.1 484.4 228 552.2 228C584.2 228 613 241.4 633.3 263C658.4 258.3 682.4 248.9 703.8 236.3C695.5 262 678.1 283.7 655 297.4C677.4 295 699 288.8 719 280.1C703.9 302.3 685 322 663.3 337.7Z"
                    fill="#1DA1F2"
                  />
                </svg>
                <span className="text-xs">Twitter</span>
              </a>
              <a
                className="   flex flex-col items-center gap-2 text-[#fff]"
                href="https://www.pinterest.com/HiptoroNews/"
                target="_blank"
                original-title="Pinterest"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 13.9998C0 19.7325 3.44727 24.6573 8.38017 26.8225C8.3408 25.8449 8.37317 24.6714 8.62386 23.6077C8.89303 22.4712 10.4253 15.9793 10.4253 15.9793C10.4253 15.9793 9.97802 15.0854 9.97802 13.7642C9.97802 11.6896 11.1805 10.1401 12.678 10.1401C13.9515 10.1401 14.5667 11.0966 14.5667 12.2419C14.5667 13.522 13.7502 15.4368 13.3304 17.2102C12.9796 18.6953 14.075 19.9066 15.54 19.9066C18.1926 19.9066 19.9791 16.4998 19.9791 12.4633C19.9791 9.39495 17.9125 7.09835 14.1536 7.09835C9.90682 7.09835 7.26116 10.2653 7.26116 13.8029C7.26116 15.0226 7.62078 15.8827 8.18406 16.5488C8.44306 16.8547 8.47904 16.9777 8.38531 17.329C8.31815 17.5866 8.16394 18.2067 8.10006 18.4525C8.00687 18.8071 7.71955 18.9338 7.39908 18.8029C5.44303 18.0044 4.53204 15.8623 4.53204 13.4544C4.53204 9.47752 7.88612 4.7089 14.5378 4.7089C19.883 4.7089 23.401 8.57673 23.401 12.7286C23.401 18.2205 20.3477 22.3234 15.847 22.3234C14.3355 22.3234 12.9137 21.5064 12.4267 20.5783C12.4267 20.5783 11.6139 23.8039 11.4418 24.4268C11.1449 25.5062 10.5639 26.5851 10.0327 27.4259C11.3209 27.8068 12.6572 28.0001 14.0005 28C21.7315 28 28 21.732 28 13.9998C28 6.268 21.7315 0 14.0005 0C6.26869 0 0 6.268 0 13.9998Z"
                    fill="#CB1F27"
                  />
                </svg>
                <span className="text-xs">Pinterest</span>
              </a>
              <a
                className="   flex flex-col items-center gap-2 text-[#fff]"
                href="https://www.youtube.com/@hiptoro"
                target="_blank"
                original-title="Youtube"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10L13.19 7L8 4V10ZM19.56 2.17C19.69 2.64 19.78 3.27 19.84 4.07C19.91 4.87 19.94 5.56 19.94 6.16L20 7C20 9.19 19.84 10.8 19.56 11.83C19.31 12.73 18.73 13.31 17.83 13.56C17.36 13.69 16.5 13.78 15.18 13.84C13.88 13.91 12.69 13.94 11.59 13.94L10 14C5.81 14 3.2 13.84 2.17 13.56C1.27 13.31 0.69 12.73 0.44 11.83C0.31 11.36 0.22 10.73 0.16 9.93C0.0900001 9.13 0.0599999 8.44 0.0599999 7.84L0 7C0 4.81 0.16 3.2 0.44 2.17C0.69 1.27 1.27 0.69 2.17 0.44C2.64 0.31 3.5 0.22 4.82 0.16C6.12 0.0899998 7.31 0.0599999 8.41 0.0599999L10 0C14.19 0 16.8 0.16 17.83 0.44C18.73 0.69 19.31 1.27 19.56 2.17Z"
                    fill="#FF2E2E"
                  />
                </svg>
                <span className="text-xs">Youtube</span>
              </a>
              <a
                className="   flex flex-col items-center gap-2 text-[#fff]"
                href="https://www.linkedin.com/company/hiptoro"
                target="_blank"
                original-title="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 256 256"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M218.123 218.128H180.192V158.725C180.192 144.56 179.939 126.325 160.464 126.325C140.708 126.325 137.685 141.759 137.685 157.694V218.124H99.755V95.9676H136.168V112.662H136.678C140.322 106.431 145.588 101.305 151.915 97.8298C158.242 94.3548 165.393 92.661 172.606 92.9286C211.051 92.9286 218.139 118.217 218.139 151.115L218.123 218.128ZM56.955 79.2706C44.798 79.2726 34.941 69.4186 34.939 57.2616C34.937 45.1046 44.79 35.2476 56.947 35.2456C69.104 35.2426 78.961 45.0966 78.963 57.2536C78.9641 63.0917 76.646 68.691 72.5187 72.82C68.3915 76.949 62.7931 79.2693 56.955 79.2706ZM75.921 218.129H37.95V95.9676H75.92V218.128L75.921 218.129ZM237.033 0.0186319H18.89C8.58002 -0.0973681 0.125023 8.16163 -0.000976562 18.4716V237.525C0.121023 247.84 8.57502 256.107 18.889 255.999H237.033C247.369 256.127 255.856 247.86 255.999 237.525V18.4546C255.852 8.12463 247.364 -0.133368 237.033 0.00163189"
                    fill="#0A66C2"
                  />
                </svg>
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
                className="   flex flex-col items-center gap-3 text-[#fff]"
                href="https://hiptoro.com/feed"
                target="_blank"
                original-title="Rss"
              >
                <svg
                  className="w-5 h-5 text-yellow-600"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 17C1.45 17 0.979002 16.804 0.587002 16.412C0.195002 16.02 -0.000664969 15.5493 1.69779e-06 15C1.69779e-06 14.45 0.196002 13.979 0.588002 13.587C0.980002 13.195 1.45067 12.9993 2 13C2.55 13 3.021 13.196 3.413 13.588C3.805 13.98 4.00067 14.4507 4 15C4 15.55 3.804 16.021 3.412 16.413C3.02 16.805 2.54934 17.0007 2 17ZM14 17C14 15.0667 13.6333 13.254 12.9 11.562C12.1667 9.87 11.1623 8.38667 9.887 7.112C8.613 5.83733 7.13 4.83333 5.438 4.1C3.746 3.36667 1.93333 3 1.69779e-06 3V0C2.35 0 4.55834 0.446 6.625 1.338C8.69167 2.23 10.4917 3.44233 12.025 4.975C13.5583 6.50833 14.771 8.30833 15.663 10.375C16.555 12.4417 17.0007 14.65 17 17H14ZM8 17C8 14.7833 7.221 12.8957 5.663 11.337C4.105 9.77833 2.21734 8.99933 1.69779e-06 9V6C1.53333 6 2.96667 6.28767 4.3 6.863C5.63334 7.43833 6.796 8.22167 7.788 9.213C8.77934 10.2043 9.56267 11.3667 10.138 12.7C10.7133 14.0333 11.0007 15.4667 11 17H8Z"
                    fill="white"
                  />
                </svg>
                <span className="text-xs">Rss </span>
              </a>
              <a
                className="   flex flex-col items-center gap-3 text-[#fff]"
                href="https://news.google.com/publications/CAAqBwgKMNnmxAsw_IHcAw"
                target="_blank"
                original-title="Google News"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 186.69 190.5"
                >
                  <g transform="translate(1184.583 765.171)">
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                      fill="#4285f4"
                    />
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                      fill="#34a853"
                    />
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                      fill="#fbbc05"
                    />
                    <path
                      d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                      fill="#ea4335"
                      clipPath="none"
                      mask="none"
                    />
                  </g>
                </svg>
                <span className="text-xs">Google News </span>
              </a>
              <a
                className="  flex flex-col gap-[6.5px] -ml-3  -mt-[1px] items-center  text-[#fff]"
                href="https://www.gadgetinsiders.com/"
                target="_blank"
                original-title="Gadget Insiders"
              >
                <Image
                  src={"/imgs/gadgetinsiders-favicon.svg"}
                  alt="gadget inisders"
                  width={32}
                  height={24}
                />
                <span className="text-xs">Gadget insiders </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  gap-4 items-center flex-wrap font-noto_sans justify-center py-4 text-white border-t-[1px] border-[rgba(255,255,255,.1)] md:w-2/3 m-auto      ">
        {nav1.map((l) => (
          <Link
            key={Math.random()}
            className="  text-[12px] text-white"
            href={l.slug}
            target="_blank"
          >
            <div> {l.name} </div>
          </Link>
        ))}
        <p className="text-white text-[12px]">
          Copyright © 2023. Hiptoro Private Limited.
        </p>
      </div>
    </footer>
  );
}
