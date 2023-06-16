// middleware.js with Vercel CLI
export default function middleware(req, res) {
  // if (process.env.NODE_ENV === "development") {
  //   return;
  // }

  const requestUrl = req.url;

  if (requestUrl.includes("page_id") || requestUrl.includes("?p=")) {
    let pid = req.url.split("=").pop();
    console.log(parseInt(pid));
    if (pid.length < 4 || parseInt(pid) === NaN) {
      return;
    }
    return Response.redirect(
      new URL(`https://secureback.hiptoro.com/?page_id=${pid}`)
    );
  }

  return;
  if (pid > 0) {
    console.log(pid);
    return Response.redirect(
      new URL(`https://secureback.hiptoro.com/?page_id=${pid}`)
    );
  }
}
// config with custom matcher
export const config = {
  matcher: "/:path*",
};
