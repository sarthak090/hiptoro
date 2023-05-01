import { NextRequest, NextResponse } from "next/server";
import formatInfitePost from "../../utils/formatInfitePost";

export const config = {
  runtime: "edge",
};
const memo: any = [];

export default async function handler(req: NextRequest) {
  if (memo["cache"] && memo["cache"].length > 0) {
    console.log("Cache Found");

    return NextResponse.json([...memo["cache"]], {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=86400",
      },
    });
  } else {
    console.log("No Cache", memo);
    const data = await getMorePost();
    memo["cache"] = data;
    return NextResponse.json([...data], {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=86400",
      },
    });
  }
}

const getMorePost = async () => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOM_WP_API_URL}/infinite-posts?start=1&limit=3`;

  const res = await fetch(url);
  const newPosts = await res.json();

  if (newPosts.length > 0) {
    const formattedPosts = await Promise.all(formatInfitePost(newPosts));
    memo["cache"] = formattedPosts;
    return formattedPosts;
  } else {
    return [];
  }
};
