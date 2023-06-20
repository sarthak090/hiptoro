const observer = lozad(".lozad", {
  load: (el) => {
    if (el.tagName === "IMG") {
      // For Image Lazy Loading
      console.log("first");
      el.src = el.dataset.src;
      return;
    }

    if (el.tagName === "IFRAME") {
      console.log(el.srcdoc);
      return;
    }

    // ends here
  },
});
observer.observe();
