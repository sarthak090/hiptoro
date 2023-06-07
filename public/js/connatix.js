!(function (n) {
  if (!window.cnx) {
    (window.cnx = {}), (window.cnx.cmd = []);
    var t = n.createElement("iframe");
    t.src = "javascript:false";
    (t.display = "none"),
      (t.onload = function () {
        var n = t.contentWindow.document,
          c = n.createElement("script");
        (c.src =
          "//cd.connatix.com/connatix.player.js?cid=d7375c7c-a8aa-4449-891e-4b3af534cf41"),
          c.setAttribute("async", "1"),
          c.setAttribute("type", "text/javascript"),
          n.body.appendChild(c);
      }),
      n.head.appendChild(t);
  }
})(document);
