import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import "./homepage.css";
import Trendingimg from "../../../images/trending.png";
import vectorimg from "../../../images/vector.png";
import likeimage from "../../../images/like.png";
import calender from "../../../images/calender.png";
import message from "../../../images/message.png";
import { Avatar, Box, Button } from "@mui/material";
import person1 from "../../../images/person-1.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import play from "../../../images/Play.png";
import voice from "../../../images/Voice.png";
import { app } from "../../../Service/firebase.config";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  addToCart,
  addtoLike,
  increment,
} from "../../../reducer/CreateSlice";
import DiscoverPage from "./DiscoverPage";
import { addDoc } from "firebase/firestore";
import DefaultComponent from "../../../pages/DefaultPage";
import moment from "moment/moment";

const firestore = getFirestore(app);

const Trending = () => {

  const [posts, setPosts] = useState([]);

  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  console.log(posts, "url");
  useEffect(() => {
    const fetchPosts = () => {
      const postsRef = collection(firestore, "posts");
      console.log(postsRef,"ref")
      const q = query(postsRef);
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        try {
          const imagesRef = collection(firestore, "images");
          const imagesSnapshot = await getDocs(imagesRef);
          const imagesData = imagesSnapshot.docs.map(
            (doc) => doc.data().imageUrl
          );

          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const postsWithImages = updatedPosts.map((post, index) => ({
            ...post,
            imageUrl: imagesData[index],
          }));

          setPosts(postsWithImages);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      });

      return unsubscribe;
    };

    const unsubscribe = fetchPosts();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (postId) => {
    {
      const postRef = doc(firestore, "posts", postId);
      await deleteDoc(postRef);
      console.log("Post deleted successfully");
    }
  };
  const likevalue = useSelector((state) => state?.like);
  console.log(likevalue, "likevalueeee");

  const totalLike = likevalue?.like?.map((likevalue) => likevalue?.quantity);
  const date = new Date();
  const dispatch = useDispatch();
  function count_heart(userId) {
    const data = likevalue?.like?.filter((item) => {
      return item?.id == userId;
    });
    return data[0]?.quantity;
  }
  const handleMessage = () => {
    setMessage(!message);
    console.log(message);
    setOpen(!open);
  };
  /// comments
  const firestore = getFirestore(app);
  const [comments, setComments] = useState([]);

  console.log(comments, "comments");
  return (
    <div>
      <h2>Posts</h2>

      {console.log("post", posts)}
      <div>
        {posts?.map((trending) => {
          console.log(trending,"trendingdARAAA")
          return (
            <div key={trending.id} style={{ padding: "30px" }}>
              <div className="trending-div" >
                <div>
                  <div>
                    <img src={Trendingimg} />
                  </div>
                </div>
                <div>
                  <div className="details">
                    <p className="headinh-details">{trending.description}</p>
                    <div className="span-class">
                      <span>{trending.title} </span>{" "}
                      <span>
                        <img src={vectorimg} alt="vectorimg" />
                      </span>
                      <span>Growth & User Acquisition</span>
                    </div>
                    <div className="span-class-1">
                      <span>
                        <img src={likeimage} alt="like" />
                      </span>
                      <span>
                        <img src={calender} alt="calender" />
                      
                     </span>
                     <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                    

                      {console.log(comments, "coooooooooooo")}
                    <span>{comments.length}comment</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    style={{ border: "2px solid rgba(46, 125, 50, 1)" }}
                    className="button-follow"
                  >
                    Follow
                  </Button>
                </div>
              </div>

              <div className="image-div">
                <div>
                  <img style={{ height: "300px" }} src={trending.imageUrl} />
                  <button className="button-play">
                    <img src={play} />
                  </button>
                  <button className="button-voice">
                    <img src={voice} />
                  </button>
                </div>

                <div className="persion-post-div">
                  <div className="person-post">
                    <button
                      className="icon-button"
                      onClick={() => dispatch(addtoLike({ id: trending.id }))}
                    >
                      <FavoriteIcon />
                    </button>

                    <p>{count_heart(trending.id)}</p>
                    <button
                      className="icon-button"
                      onClick={() => handleMessage()}
                    >
                      <MessageIcon />
                    </button>

                    <p>{comments.length}</p>
                    <button className="icon-button">
                      <ShareIcon />
                    </button>
                    <p>378</p>
                    <button onClick={() => handleDelete(trending.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              {open ? <DiscoverPage trending={trending} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
