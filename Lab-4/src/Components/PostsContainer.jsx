import PostCard from "./PostCard";

export default function PostsContainer({ data }) {
  return (
    <div className="PostsContainer">
      {data.map((post) => (
        <PostCard key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}
