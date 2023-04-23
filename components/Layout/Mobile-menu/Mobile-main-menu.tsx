import { useRouter } from "next/router";

import DrawerWrapper from "@/components/UI/Drawer/Drawer-wrapper";
import { useAtom } from "jotai";
import { drawerAtom } from "@/store/drawer-atom";
import { useState } from "react";
import headerLinks from "@/seed/navLink";
export default function MobileMainMenu() {
  const [showSubItems, setShowSubItems] = useState(false);
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);
  const [currentSubMenu, setCurrentSubMenu] = useState<any>();

  function handleClick(path: string, idx: any) {
    const hasSubItems = headerLinks.find((hed) => hed.href === path)?.subItems;
    if (hasSubItems) {
      setShowSubItems(!showSubItems);
      setCurrentSubMenu(idx);

      return;
    }
    setCurrentSubMenu(null);

    router.push(path);
    closeSidebar({ display: false, view: "" });
  }

  return (
    <DrawerWrapper>
      <ul className="flex-grow  ">
        {headerLinks.map(({ href, label, subItems }, idx) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => handleClick(href, idx)}
              className="flex   text-15px text-black justify-between cursor-pointer font-isidorasans_regular items-center py-3 px-5 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent md:px-8"
            >
              {label}

              {subItems && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
            <div className="ml-2">
              {currentSubMenu === idx &&
                showSubItems &&
                subItems &&
                subItems.map((item) => (
                  <li
                    onClick={() => handleClick(item.href, idx)}
                    className="flex  text-black   cursor-pointer font-isidorasans_regular items-center py-3 px-8 text-sm  font-semibold capitalize text-heading transition duration-200 hover:text-accent  "
                  >
                    {item.label}
                  </li>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
