import Link from "next/link";

export default function TagBox(props: any) {
  const { tags } = props;
  return (
    <div className="flex gap-2 flex-wrap lg:gap-4 my-4">
      {tags &&
        tags.map((tag: any) => (
          <div key={tag.term_id}>
            <Link className="hover:underline" href={"/tags/" + tag.slug}>
              <div>
                #<span dangerouslySetInnerHTML={{ __html: tag.name }}></span>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
