import React from "react";

export default function RelatedPost({ related_posts }: any) {
  const rnd = 2;

  return (
    <div>
      {related_posts && related_posts.length > 4 && (
        <div className="">
          <p className="bg-gray-bg text-darkText hover:underline  font-bold p-4">
            Read More:
            <a className=" underline" href={`/p/${related_posts[rnd].slug}`}>
              {related_posts[rnd].title.rendered}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

function random() {
  return Math.floor(Math.random() * 4);
}
