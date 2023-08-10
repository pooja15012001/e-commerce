import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Avatar } from "@mui/material";
import { app } from "../../../Service/firebase.config";

const DiscoverPage = ({ trending }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "" });

  const fetchComments = () => {
    const database = getDatabase(app);
    const commentsRef = ref(database, `comments/${trending.id}`);

    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsData = Object.values(data);
        setComments(commentsData);
      } else {
        setComments([]);
      }
    });
  };

  useEffect(() => {
    fetchComments();
  }, [trending.id]);

  const handleAddComment = async () => {
    if (newComment.comment) {
      const auth = getAuth(app);
      const user = auth.currentUser;
      console.log(user,"userhereuser");
      if (!user) {
        console.log("User is not logged in");
        return;
      }

    

      const database = getDatabase(app);
      const commentsRef = ref(database, `comments/${trending.id}`);
      const commentData = {
        comment: newComment.comment,
        userId: user.uid,
        userName: user.displayName,
        userPhotoUrl: user?.photoURL,
      };
      await push(commentsRef, commentData);

      setNewComment({ comment: "" });
    }
  };

  return (
    <div>
      <div>
        <h3>Comments ({comments.length}):</h3>

        <div>
          <input
            type="text"
            placeholder="comment"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
          />

          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        {comments.map((comment, index) => {
          return (
            <div className="comment-div" key={index}>
             
              
           
              <p>{comment.userName}: {comment.comment}</p>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverPage;
