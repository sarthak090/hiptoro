import Loading from "@/components/UI/Loading";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fetchPosts = async (title: string, updateParam: Boolean) => {
    setIsLoading(true);
    if (title.length > 2) {
      const url =
        process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL + "/search?title=" + title;
      const data = await fetch(url).then((r) => r.json());

      setSearchResults(data);
      setIsLoading(false);
      if (updateParam) {
        router.replace({
          query: { ...router.query, s: title },
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (router && router.query && router.query.s) {
      const searchParam = router.query.s.toString().trim();
      fetchPosts(searchParam, false);
      setSearchText(searchParam);
    }
  }, [router]);
  const searchForPosts = async (e: any) => {
    e.preventDefault();
    fetchPosts(searchText, true);
  };
  return (
    <div>
      <NextSeo title="Search " />
      <h1 className="my-6 text-xl">Search For Posts</h1>
      <form onSubmit={searchForPosts}>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="border py-2 px-4 w-full outline-none hover:outline-none"
        />
        <button className="py-2 bg-blue-900   text-white w-full my-4 text-xl">
          Search
        </button>
      </form>
      {isLoading && <Loading />}
      <div>
        {!isLoading && searchResults.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-4">
            {searchResults.map((post: any) => (
              <div className="flex flex-col items-center gap-4" key={post.id}>
                <img
                  width={500}
                  alt={post.title}
                  src={post.featuredImg.medium}
                />
                <Link href={`/p/${post.slug}`}>
                  <p>{post.title}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
