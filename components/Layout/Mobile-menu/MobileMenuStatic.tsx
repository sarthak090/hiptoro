import navLinks from "@/seed/navLink";
import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
export default function MobileMenuStatic() {
  const router = useRouter();
  const [showSubItems, setShowSubItems] = useState(false);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<any>();
  function handleClick(path: string, idx: any) {
    const hasSubItems = navLinks.find((hed) => hed.href === path)?.subItems;
    if (hasSubItems) {
      setShowSubItems(!showSubItems);
      setCurrentSubMenu(idx);

      return;
    }
    setCurrentSubMenu(null);

    router.push(path);
  }

  return (
    <div className="mobile-menu-static">
      {navLinks &&
        navLinks.map((i, idx) => (
          <div key={Math.random()}>
            <div>
              <p
                className={`font-isidorasans_regular ${
                  router.asPath === i.href ? "text-brand-blue-dark" : ""
                }   hover:underline hover:bg-navDropDown
                    flex items-center gap-1 my-4 py-1 px-3 text-13px font-medium cursor-pointer relative`}
              >
                <Link href={i.href}>{i.label}</Link>

                {i.subItems && i.subItems?.length > 0 && (
                  <svg
                    onClick={() => handleClick(i.href, idx)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </p>
              {currentSubMenu === idx &&
                i.subItems &&
                i.subItems?.length > 0 &&
                showSubItems && (
                  <>
                    <div className="lg:absolute bg-navDropDown   z-50  top-[45px] bg-navbar  ">
                      <div className="flex  flex-col text-13px font-noto_sans    font-medium    ">
                        {i.subItems.map((l) => (
                          <>
                            <Link
                              className="hover:text-white   hover:bg-navHover p-2 px-7    "
                              href={l.href}
                            >
                              {l.label}
                            </Link>
                          </>
                        ))}
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
