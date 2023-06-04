// middleware.js with Vercel CLI
export default function middleware(req, res) {
    let pid = req.url.split("=").pop();
    
    //if (pid > 0) {
        return Response.redirect(new URL(`https://secureback.hiptoro.com/`))
    //}
}
// config with custom matcher
export const config = {
    matcher: '/',
};
