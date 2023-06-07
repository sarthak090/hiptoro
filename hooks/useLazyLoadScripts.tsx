import { useEffect, useState } from "react";

const useLazyLoadScripts = (scripts: string[]) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scriptsLoaded && window.pageYOffset > 0) {
        // Load scripts when the page is scrolled or when there's some interaction
        scripts.forEach((scriptSrc) => {
          const scriptElement = document.createElement("script");
          scriptElement.src = scriptSrc;
          scriptElement.async = true;
          document.head.appendChild(scriptElement);
        });

        setScriptsLoaded(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scripts, scriptsLoaded]);

  return scriptsLoaded;
};

export default useLazyLoadScripts;
