import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import parameterize from "parameterize";
import styles from "../styles/Home.module.css";

export default function (content: { rendered: string }) {
  const toc: { id: string; title: string }[] = [];

  const parsedcontent = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(() => {
      return (tree: any) => {
        visit(tree, "element", function (node: any) {
          if (node.tagName === "h2") {
            if (node.children[0] && node.children[0].value) {
              const id = parameterize(node.children[0].value);
              node.properties.id = id;
              node.properties.class = node.properties.class
                ? `${node.properties.class} ${styles.header}`
                : styles.header;

              toc.push({
                id,
                title: node.children[0].value,
              });

              node.children.unshift({
                type: "element",
                properties: {
                  href: `#${id}`,
                  class: styles.anchor,
                  "aria-hidden": "true",
                },
                tagName: "a",
              });
            }
          }
        });
        return;
      };
    })
    .use(rehypeStringify)
    .processSync(content?.rendered)
    .toString();
  return { toc, parsedcontent };
}
