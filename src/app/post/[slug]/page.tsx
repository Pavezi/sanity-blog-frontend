import { client } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string;
  title: string;
  body: any[];
  imageUrl: string;
}

async function getPost(slug: string) {
  const post = await client.fetch<Post>(`*[_type == "post" && slug.current == $slug][0]{_id, title, body, "imageUrl": mainImage.asset->url}`, { slug });
  return post;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />}
      <div className="prose lg:prose-xl max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  );
}
