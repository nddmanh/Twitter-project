import { React, useCallback, useContext, useEffect } from 'react';
import './../css/Post.css';
import PostItem from './PostItem';
import axios from "axios";
import AppContext from './AppContext';

export default function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  
  const getAllPosts = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const option = {
        method: "get",
        url: "/api/v1/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option);
      const posts = response.data.data.posts;
      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const newPosts = posts.map((post) => {
    if (user) {
      return post.author.name === user.userName
        ? { ...post, isEditable: true }
        : post;
    } else {
      return { ...post, isEditable: false };
    }
  });

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  
  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </section>
  )
}
