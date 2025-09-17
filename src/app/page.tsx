import Link from "next/link";
import { client } from "../lib/sanity";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
}

async function getPosts(query: string) {
  const sanityQuery = query
    ? `*[_type == "post" && (title match $query || pt::text(body) match $query)]{
        _id, title, "slug": slug.current,
        "excerpt": pt::text(body[0..1]),
        "imageUrl": mainImage.asset->url
      }`
    : `*[_type == "post"]{
        _id, title, "slug": slug.current,
        "excerpt": pt::text(body[0..1]),
        "imageUrl": mainImage.asset->url
      }`;

  // ✅ Forçar o tipo de `params`
  const params: Record<string, string> = query ? { query: `${query}*` } : {};

  return client.fetch<Post[]>(sanityQuery, params);
}

// 👇 define your own prop type
type HomePageProps = {
  searchParams?: {
    query?: string;
  };
};

export default async function Home(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const posts = await getPosts(searchParams?.query || "");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
