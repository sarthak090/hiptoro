import LazyLoad from "vanilla-lazyload";

const lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy", // Specify the class or selector for lazy-loadable elements
  callback_load: (element) => {
    if (element.id === "ad-container") {
      window.adsbygoogle.push({}); // Load the Google AdSense ad when the container becomes visible
    }
  },
});

export default lazyLoadInstance;
