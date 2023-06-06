import { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";

const LazyLoadAd = () => {
  useEffect(() => {
    const lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy",
      callback_load: (element) => {
        if (element.id === "ad-container") {
          window.adsbygoogle.push({});
        }
      },
    });

    return () => {
      lazyLoadInstance.destroy(); // Cleanup when the component unmounts
    };
  }, []);

  return (
    <>
      <div id="ad-container" className="lazy">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={"ca-pub-7099984888351146"}
          data-ad-slot={"5392495815"}
          data-ad-format={"auto"}
        />
      </div>
    </>
  );
};

export default LazyLoadAd;
