import { useState } from "react";

export default function WPHTMLContent({ html }: { html: string }) {
  const [htmlData, setHtmlData] = useState(html);
  return (
    <div className="text-navbar-drawer  post-content ">
      <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    </div>
  );
}
