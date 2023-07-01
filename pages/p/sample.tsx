import { useState } from "react";
import Details from "@/components/Post/Details";
import Loading from "@/components/UI/Loading";
import NotFound from "@/components/UI/404";
import LastestPost from "./latest_posts_sample.json";
import DetailsSample from "@/components/Post/DetailsSample";
export default function SinglePost(props: any) {
  const [post, setPost] = useState(LastestPost[0]);

  if (post !== null && post !== undefined) {
    return (
      <>
        <div className="container mx-auto max-w-site-full">
          <DetailsSample post={post} />
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
}
