import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostsContainer from "./PostsContainer";

export default function FakeApiApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        setData(posts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPost.title.trim() === "" || newPost.body.trim() === "") {
      return;
    }

    const newPostObj = {
      id: data.length + 1,
      title: newPost.title,
      body: newPost.body,
    };

    setData([newPostObj, ...data]);

    setNewPost({
      title: "",
      body: "",
    });
  };

  return (
    <div>
      <h1>Fake API App</h1>

      <PostForm
        newPost={newPost}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {loading ? <p>Loading...</p> : <PostsContainer data={data} />}
    </div>
  );
}
