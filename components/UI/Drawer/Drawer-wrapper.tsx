import { useAtom } from "jotai";
import { drawerAtom } from "@/store/drawer-atom";
import { CloseIcon } from "@/components/icons/close-icon";

import Image from "next/image";

const DrawerWrapper: React.FC = ({ children }: any) => {
  const [_, closeSidebar] = useAtom(drawerAtom);

  return (
    <div className="flex bg-white h-full flex-col">
      <div className="fixed top-0  z-20 mb-12 flex w-full max-w-md items-center justify-between  px-5 pt-4 pb-6 md:mb-6">
        {/* <Logo className="w-24 md:w-auto" /> */}
        <Image
          alt="logo"
          src={"/imgs/logo_main.webp"}
          width={200}
          height={100}
        />

        <button
          onClick={() => closeSidebar({ display: false, view: "" })}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-body transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-none"
        >
          <span className="sr-only">{"text-close"}</span>
          <CloseIcon className="h-2.5 text-black w-2.5" />
        </button>
      </div>
      <div className="pt-24 bg-white">{children}</div>
    </div>
  );
};

export default DrawerWrapper;
