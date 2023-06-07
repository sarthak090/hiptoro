// middleware.js with Vercel CLI
export default function middleware(req, res) {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  let pid = req.url.split("=").pop();
  if (pid > 0) {
    return Response.redirect(
      new URL(`https://secureback.hiptoro.com/?page_id=${pid}`)
    );
  }
}
// config with custom matcher
export const config = {
  matcher: "/:path*",
};
