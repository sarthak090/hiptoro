import { testRss } from ".././../utils/generateRssFeed";
export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  const xmlTest = await testRss();

  res.end(xmlTest);
}
