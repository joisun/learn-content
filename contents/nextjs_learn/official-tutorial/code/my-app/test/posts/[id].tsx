interface PostT {
  createdAt: string;
  title: string;
  id: string;
  content: string;
}
interface BlogFnT<T> {
  ({ postList }: { postList: T }): JSX.Element;
}
export default ({ post }: { post: PostT }) => {
  return (
    <div>
      <article>
        <h1>123</h1>
        <main style={{ width: '30vw' }}>
          <p>{post.content}</p>
        </main>
      </article>
    </div>
  );
};
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://636c8b5ead62451f9fccb498.mockapi.io/posts');
  const posts = (await res.json()) as PostT[];

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: any }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://636c8b5ead62451f9fccb498.mockapi.io/posts/${params.id}`,
  );
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}
