import { deleteDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import React from "react";
import { app } from "../Service/firebase.config";


const CommentList = ({ comments }) => {
    console.log(comments,"commentslistt")

  return (
    <div>
      {comments.map((comment) => {
        return <div key={comment.id}>

        <div>{comment.message}</div>
     
      </div>
      })}
    </div>
  );
};

export default CommentList;
