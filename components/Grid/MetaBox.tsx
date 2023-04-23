import Link from "next/link";

import { ProfileIcon } from "../icons/profile-icon";
import { TimeIcon } from "../icons/time-icon";
export default function MetaBox({
  author,
  diff,
}: {
  author: { name: string; slug: string };
  diff: string;
}) {
  return (
    <>
      <Link href={`/author/${author.slug}`}>
        <div className="flex items-center gap-4 lg:gap-8 text-[9px] md:text-sm lg:text-[16px] lg:mt-6 font-semibold mt-4   ">
          <div className="flex items-center gap-1">
            <ProfileIcon className="h-4 w-4 md:h-6 md:w-6   " />
            <span>{author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <TimeIcon className="h-4 w-4 md:h-6 md:w-6  " />
            <span className=" flex gap-2 items-center capitalize">
              {diff} Ago
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
