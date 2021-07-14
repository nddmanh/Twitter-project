import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';

export default function PostItem({ post }) {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const [postToEdit, setPostToEdit] = useState(post);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [countLike, setCountLike] = useState('');
  const [isLike, setIsLike] = useState('')

  const updatePost = async () => {
    try {
      setOpenEditForm(false);
      const token = localStorage.getItem("token");
      const option = {
        method: "put",
        url: `/api/v1/posts/${post._id}`,
        data: postToEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(option);
      dispatch({
        type: "UPDATE_ONE_POST",
        payload: { ...postToEdit },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      setOpenDeleteConfirm(false);
      const token = localStorage.getItem("token");
      const option = {
        method: "delete",
        url: `/api/v1/posts/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(option);
      dispatch({
        type: "DELETE_ONE_POST",
        payload: { ...post },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLike = (usersLiked, user) => {
    return usersLiked.find(userLiked => userLiked === user);
  }

  const getCountLike = useCallback(async ()=> {
    const token = localStorage.getItem("token");
    try {
      const option = {
        method: "get",
        url: `/api/v1/posts/count/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option);
      const usersLiked = response.data.data.userLike;
      const numLike = response.data.data.userLike.length;
      setCountLike(numLike);
      checkUserLike(usersLiked, user.userId) ? setIsLike(true) : setIsLike(false); 
    } catch (error) {
      console.log(error);
    }
  }, [post._id, user.userId]);

  useEffect(() => {
    getCountLike();
  }, [getCountLike]);

  const handleLikePost = useCallback(async ()=> {
    const token = localStorage.getItem("token");
    try {
      const option = {
        method: "get",
        url: `/api/v1/posts/like/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option);
      const usersLiked = response.data.data.post.userIdLike;
      setCountLike(usersLiked.length);
      checkUserLike(usersLiked, user.userId) ? setIsLike(true) : setIsLike(false); 
    } catch (error) {
      console.log(error);
    }
  }, [post._id, user.userId]);
  
  const handleUnlikePost = useCallback(async ()=> {
    const token = localStorage.getItem("token");
    try {
      const option = {
        method: "get",
        url: `/api/v1/posts/unlike/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option);
      const usersLiked = response.data.data.post.userIdLike;
      setCountLike(usersLiked.length);
      checkUserLike(usersLiked, user.userId) ? setIsLike(true) : setIsLike(false); 
    } catch (error) {
      console.log(error);
    }
  }, [post._id, user.userId]);

  let date = new Date(post.createdAt);
  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>

      {isLike ? (
        <button id="btn-like" className="btn-react-active" type="button" onClick={() => handleUnlikePost()} > <span>{countLike} Like </span> </button>
      ) : (
        <button id="btn-like" className="btn-react " type="button" onClick={() => handleLikePost()} > <span>{countLike} Like</span> </button>
      )}

      <div className="post-footer">
        <div className="post-infors">
          <span>By {post.author.name}</span>
          <span>
            {" "}
            Date: 
            {` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </span>
        </div>
        {post.isEditable && (
          <div className="post-edit-delete">
            {openDeleteConfirm ? (
                <>
                  <span className="delete-question">Are you sure?</span>
                  <span onClick={() => deletePost()}>Yes</span>
                  <span onClick={() => setOpenDeleteConfirm(false)}>No</span>
                </>
              ) : (
                <>
                  <span  onClick={() => setOpenEditForm(true)}>Edit</span>
                  <span  onClick={() => setOpenDeleteConfirm(true)}>Delete</span>
                </> 
              )}
          </div>
        )}
      </div>
      {openEditForm && (
        <div className="post-edit-form">
          <form className="edit-form">
            <textarea
              name="content"
              type="text"
              id="content"
              className="content"
              placeholder="What's happending?"
              value={postToEdit.content}
              onChange={(e) => 
                setPostToEdit({ ...postToEdit, content: e.target.value })
              }
            />
            <div className="btn-container">
              <button className="btn" type="button" onClick={() => updatePost()} >
                Update
              </button>
              <button className="btn" type="button" onClick={() => setOpenEditForm(false)} >
                Cancle
              </button>
            </div>
          </form>
        </div>
      )}
      
    </div>
  )
}
