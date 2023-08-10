import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../Service/firebase.config";
import ImageDisplay from "../ImageDisplay";
import { getDocs } from "firebase/firestore";
import vectorimg from "../../src/images/vector.png";
import like from "../../src/images/like.png";
import calender from "../../src/images/calender.png";
import message from "../../src/images/message.png";
import { Box, Button } from "@mui/material";
import person1 from "../../src/images/person-1.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import play from "../../src/images/Play.png";
import voice from "../../src/images/Voice.png";
import trendingImg from "../../src/images/trending.png";

const firestore = getFirestore(app);

const Postlist = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts, "url");
  useEffect(() => {
    const fetchPosts = () => {
      const postsRef = collection(firestore, "posts");
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
            imageUrl: imagesData[index], // Using the correct image URL for each post
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
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(firebase, "images"));
  //       const imagesData = querySnapshot.docs.map((doc) => doc.data().imageUrl);
  //       setImages(imagesData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  return (
    <div>
      <h2>Posts</h2>

      {console.log("post", posts)}
      <div>
        {posts?.map((trending) => {
          return (
            <div style={{ padding: "30px" }}>
              <div className="trending-div">
                <div>
                  <div>
                    <img src={trendingImg} />
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
                        <button >
                        <img src={like} alt="like" />
                        </button>
                       
                      </span>
                      <span>
                        <img src={calender} alt="calender" />
                        <img src="" />
                      </span>
                      <span>March 13, 2021 at 5:16 PM</span>
                      <span>
                        <img src={message} alt="message" />
                      </span>
                      <span>89 Comments</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    style={{ border: "2px solid rgba(46, 125, 50, 1)" }}
                    className="button-follow"
                  >
                    {" "}
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
                    <button className="icon-button">
                      {" "}
                      <FavoriteIcon />
                    </button>
                    <p>94.4K</p>
                    <button className="icon-button">
                      <MessageIcon />
                    </button>
                    <p>1154</p>
                    <button className="icon-button">
                      <ShareIcon />
                    </button>
                    <p>378</p>
                    <button onClick={() => handleDelete(trending.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* {posts.map((post) => (
        <div key={post.id}>
          <div className="card">
            <img
              src={post.imageUrl}
              className="card-img-top"
              alt="Post"
              style={{ width: "220px" }}
            />

            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Postlist;
