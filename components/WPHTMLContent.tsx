export default function WPHTMLContent({ html }: { html: string }) {
  return (
    <div className="text-navbar-drawer  post-content">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
