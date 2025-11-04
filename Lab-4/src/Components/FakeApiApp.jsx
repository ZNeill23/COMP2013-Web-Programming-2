import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostsContainer from "./PostsContainer";

export default function FakeApiApp() {
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    setData(posts);
    setIsLoading(false);
  };

  const handleChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    setData([{ id: data.length + 1, ...newPost }, ...data]);
    setNewPost({ title: "", body: "" });
  };

  return (
    <div>
      <h1>Fake API App</h1>

      {isLoading ? <h2>Loading...</h2> : null}

      <PostForm
        newPost={newPost}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <PostsContainer data={data} />
    </div>
  );
}
