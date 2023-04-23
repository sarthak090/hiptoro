import { DiscussionEmbed } from "disqus-react";

export default function DisqusComments(props: any) {
  const disqusShortname = "hiptoro-2";
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/p/${props.slug}`,
    identifier: props.id,
    title: props.title,
  };
  return (
    <div className="my-8">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
