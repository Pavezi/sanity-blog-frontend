import Link from 'next/link';
import { client } from '../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
}

async function getPosts() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]{_id, title, "slug": slug.current, "excerpt": pt::text(body[0..1]), "imageUrl": mainImage.asset->url}`);
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Kapehe's Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />}
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
