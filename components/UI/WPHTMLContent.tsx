import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

export default function WPHTMLContent({ html }: { html: string }) {
  const [htmlData, setHtmlData] = useState("");
  useEffect(() => {
    setHtmlData(html);
  }, [html]);
  return (
    <div className="  post-content">
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlData) }}
      ></div>
    </div>
  );
}
