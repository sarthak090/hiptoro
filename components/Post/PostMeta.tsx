import Link from "next/link";

export default function PostMeta(post: any) {
  return (
    <div className="flex flex-wrap gap-4   px-2 my-2 py-2 border-t-2 border-b-2">
      <div>{post.diff}</div>
      <div className="">|</div>

      <div className="capitalize  ">{post?.timeToRead?.text}</div>
      <div className="">|</div>
      <div>
        <Link
          className=" hover:text-blue-500"
          href={`/author/${post.author.slug}`}
        >
          {post.author.name}
        </Link>
      </div>
    </div>
  );
}
