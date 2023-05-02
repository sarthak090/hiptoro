import Link from "next/link";

export default function CategoryBox(props: any) {
  const { category } = props;
  return (
    <div className="flex flex-wrap gap-3 my-6 justify-center">
      {category &&
        category.map((cat: any) => (
          <div
            key={cat.term_id ? cat.term_id : cat.id}
            className="hover:underline uppercase font-montserrat hover:cursor-pointer"
          >
            <Link href={`/p/category/${cat.slug}`}> {cat.name}</Link>
          </div>
        ))}
    </div>
  );
}
