import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-36 t-gy-t">
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
