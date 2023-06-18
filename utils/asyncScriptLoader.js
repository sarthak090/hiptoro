export default function asyncScriptLoader(input) {
  var src = input.src;
  var attachTo = input.attachTo;
  var loadWithAsync = input.loadWithAsync;
  var loadWithDefer = input.loadWithDefer;
  var attributes = input.attributes || {};
  var onUserInteraction = input.onUserInteraction || false;

  if ("id" in attributes) {
    if (!!scriptsLoadedMap[attributes.id]) {
      return Promise.resolve();
    }
    scriptsLoadedMap[attributes.id] = true;
  }

  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    if (loadWithAsync) {
      script.setAttribute("async", true);
    }
    if (loadWithDefer) {
      script.setAttribute("defer", true);
    }
    if (attributes && attributes.length > 0) {
      attributes.forEach(function (attribute) {
        script.setAttribute(attribute.key, attribute.value);
      });
    }

    function loadScript() {
      if (attachTo) {
        attachTo.appendChild(script);
      } else {
        document.head.appendChild(script);
      }
    }

    var scriptLoaded = false;

    function loadScriptOnInteraction() {
      if (scriptLoaded) return;
      scriptLoaded = true;
      loadScript();
    }

    if (onUserInteraction) {
      document.addEventListener("scroll", loadScriptOnInteraction, {
        once: true,
      });
      document.addEventListener("mousemove", loadScriptOnInteraction, {
        once: true,
      });
      document.addEventListener("touchmove", loadScriptOnInteraction, {
        once: true,
      });
    } else {
      loadScript();
    }
  });
}
