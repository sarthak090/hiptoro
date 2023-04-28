// import { useEffect, useState } from "react";

export default function WPHTMLContent({ html }: { html: string }) {
  // const [htmlData, setHtmlData] = useState("");
  // useEffect(() => {
  //   setHtmlData(html);
  // }, [html]);
  return (
    <div className="post-content">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
