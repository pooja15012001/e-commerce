import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { app } from "../Service/firebase.config";

import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import Imagestoring from "../Imagestoring";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { storage } from "../Service/firebase.config";
import { firebase } from "../Service/firebase.config";
import { FirebaseApp } from "firebase/app";

export default function Example() {
  const [text, settext] = useState();
  const [description, setdescription] = useState();
  const firestore = getFirestore(app);
  //   const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "posts"), {
        title: text,
        description: description,
        imageUrl: downloadURLs,
      });
      handleUpload();
      console.log("Post added to Firestore successfully");

      settext("");
      setdescription("");
      setSelectedImages("")
    } catch (error) {
      console.error("Error adding post to Firestore:", error);
    }
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const handleImageUpload = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleUpload = async () => {
    const storageRef = getStorage(firebase);
  
    const uploadPromises = selectedImages.map((image) => {
      const storageChildRef = ref(storageRef, image.name + Date.now());
      return uploadBytes(storageChildRef, image);
    });
  
    try {
      const uploadSnapshots = await Promise.all(uploadPromises);
      const urlsPromises = uploadSnapshots.map((snapshot) => getDownloadURL(snapshot.ref));
      const urls = await Promise.all(urlsPromises);
  
      setDownloadURLs(urls);
  
      const postPromises = urls.map((url) => {
        return addDoc(collection(firestore, "images"), { imageUrl: url });
      });
  
      await Promise.all(postPromises);
  
      console.log("Images uploaded and URLs added to Firestore successfully");
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(downloadURLs)

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="title"
            multiline
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            multiline
          />
        </div>
        <div>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>

        <div>
          <button onClick={handlesubmit}>submit</button>
        </div>
      </Box>
    </>
  );
}
