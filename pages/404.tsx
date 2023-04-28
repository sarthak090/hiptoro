import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Custom404() {
  return (
    <div className="mt-36 t-gy-t">
      <NextSeo title="404 Page " />
      <center className="mb-16">
        <Image width={1020} height={720} src="/imgs/404.png" alt="404 Page" />
      </center>
      <p className=" font-noto_sans text-center text-2xl lg:text-4xl mt-16 font-semibold  ">
        <Link className="underline" href={"/"}>
          Return
        </Link>
        <span> to continue your adventure.</span>
      </p>
    </div>
  );
}
