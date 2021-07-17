import { React, useCallback, useContext, useEffect, useState } from 'react';
import axios from "axios";
import AppContext from './AppContext';
import CommentItem from './CommentItem';

export default function CommentList({ postId }) {
  const { state, dispatch } = useContext(AppContext);
  const { comments, user } = state;
  const [commentInput, setCommentInput] = useState({ contentCmt: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  const newComments = comments.filter((cmt) => cmt.post === postId )
  const userComments = newComments.map((cmt) => {
    if (user) {
      return cmt.author.name === user.userName
        ? { ...cmt, isEditable: true }
        : cmt;
    } else {
      return { ...cmt, isEditable: false };
    }
  });

  const onSubmitHandleCmt = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const option = {
        method: "post",
        url: `/api/v1/comments/${postId}`,
        data: commentInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      const { comment } = response.data.data;
      const author = {_id: comment.author, name: user.userName }
      console.log(author);
      dispatch({
        type: "CREATE_ONE_COMMENT",
        payload: { ...comment, author, isEditable: true },
      });
      // Reset comment
      setCommentInput({ contentCmt: "" });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="comment">
        <form className="form-comment" onSubmit={onSubmitHandleCmt} >
          <span>Duc Manh</span>
          <input 
            name="contentCmt"
            type="text" 
            id="contentCmt"
            className="contentCmt"
            required 
            placeholder="write your comment..." 
            value={commentInput.contentCmt}
            onChange={(e) => 
              setCommentInput({ ...commentInput, [e.target.name]: e.target.value })
            }
          />
          <button className="btn-send" type="submit">Send</button>
        </form>
        
        <div>
          {userComments.reverse().map((comment) => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
        </div>
      
    </div>
  )
};

