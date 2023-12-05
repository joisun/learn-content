interface PostT {
  createdAt: string;
  title: string;
  id: string;
}
interface BlogFnT<T> {
  ({ postList }: { postList: T }): JSX.Element;
}
const Blog: BlogFnT<PostT[]> = function ({ postList }) {
  return (
    <ol>
      {postList.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://636c8b5ead62451f9fccb498.mockapi.io/postlist',
  );
  const postList = await res.json();
  return {
    props: { postList },
  };
}

export default Blog;
