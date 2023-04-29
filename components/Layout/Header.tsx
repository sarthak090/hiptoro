import Link from "next/link";
import navLinks from "@/seed/navLink";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MobileMenuStatic from "./Mobile-menu/MobileMenuStatic";
import { NavbarIcon } from "../icons/navbar-icon";
import { CloseIcon } from "../icons/close-icon";
import Image from "next/image";

const HeaderSearch = dynamic(() => import("@/components/Forms/HeaderSearch"));

export default function Header() {
  const router = useRouter();
  const [currentSubMenu, setCurrentSubMenu] = useState<any>();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);
  return (
    <>
      <nav
        className={` w-full top-0 fixed ${
          isVisible ? "block" : "hidden"
        }  shadow-2xl  lg:mb-16   lg:py-2 py-2 px-4 font-raleway    lg:px-8  font-semibold   bg-black text-white    `}
      >
        <div className="max-w-site-full  mx-auto flex lg:flex-col justify-between items-center">
          <div
            className={`flex gap-2  close-icon transition-all delay-150 ${
              isVisible ? "block" : "lg:hidden"
            } `}
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" flex items-center lg:hidden gap-2 justify-end  "
            >
              {isOpen ? (
                <CloseIcon className="h-10 w-10 close-icon" />
              ) : (
                <NavbarIcon className="h-10 w-10 " />
              )}
            </div>
            <Link className="lg:block hidden" href={"/"}>
              <Image
                alt="Hiptoro"
                src={"/imgs/desk_logo.png"}
                width={220}
                height={80}
                loading="eager"
              />
            </Link>
          </div>
          <div
            className={`  ${
              isVisible ? "hidden lg:block" : "hidden"
            }   h-[1px] my-4 w-full bg-[#fbfbfb2b]`}
          ></div>
          <div className="lg:hidden ">
            <Link href={"/"}>
              <Image
                alt="Hiptoro"
                loading="eager"
                src={"/imgs/phone_logo.png"}
                width={160}
                quality={100}
                height={60}
              />
            </Link>
          </div>
          <div className="flex gap-2 items-center"></div>
          <div className="lg:flex flex-col hidden items-end  justify-end">
            <div className="lg:flex hidden top-12 md:top-0 md:py-0 items-center  w-full left-0 absolute md:relative justify-end gap-6">
              {navLinks &&
                navLinks.map((i, idx) => (
                  <Link
                    key={Math.random()}
                    href={i.href}
                    onMouseOver={() => {
                      if (i.subItems && i.subItems.length > 0) {
                        setIsSubMenuOpen(true);
                        setCurrentSubMenu(idx);
                      }
                    }}
                    onMouseLeave={() => {
                      if (i.subItems && i.subItems.length > 0) {
                        setIsSubMenuOpen(false);
                        setCurrentSubMenu(null);
                      }
                    }}
                  >
                    <div>
                      <p
                        className={`font-isidorasans_regular ${
                          router.asPath === i.href ? "text-brand-blue-dark" : ""
                        }   hover:underline hover:bg-navDropDown
                          flex items-center gap-1 p-3 text-13px font-medium cursor-pointer relative`}
                      >
                        {i.label}
                        {i.subItems && i.subItems?.length > 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
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
                        isSubMenuOpen && (
                          <>
                            <div
                              onMouseOver={() => {
                                if (i.subItems) {
                                  setIsSubMenuOpen(true);
                                }
                              }}
                              onMouseLeave={() => {
                                if (i.subItems) {
                                  setIsSubMenuOpen(false);
                                }
                              }}
                              className="lg:absolute bg-navDropDown   z-50  top-[45px] bg-navbar  "
                            >
                              <div className="flex  flex-col text-13px font-noto_sans    font-medium    ">
                                {i.subItems.map((l) => (
                                  <>
                                    <Link
                                      key={Math.random()}
                                      className="hover:text-white hover:bg-navHover p-2 px-7    "
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
                  </Link>
                ))}
              <div>
                <HeaderSearch />
              </div>
            </div>
          </div>
        </div>

        <div>{isOpen && <MobileMenuStatic />}</div>
      </nav>
    </>
  );
}
