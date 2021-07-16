import { React, useContext} from 'react';
import axios from "axios";
import AppContext from './AppContext';

export default function CommentItem({ comment }) {
  const { dispatch } = useContext(AppContext);
  const deleteComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "delete",
        url: `/api/v1/comments/${comment._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(option);
      dispatch({
        type: "DELETE_ONE_COMMENT",
        payload: { ...comment },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-comment">
      <span> {comment.author.name} </span>
      <span className="content-comment"> {comment.contentCmt} </span>
      <div className="container-btn-comment">
        {comment.isEditable && (
          <button className="btn-react" type="button" onClick={() => deleteComment()} > X </button>
        )}
      </div>
    </div>
  )
}
