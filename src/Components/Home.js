import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, firebase, storage } from "../Service/firebase.config";

export default function Home() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [growth, setGrowth] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);
  const firestore = getFirestore(app);
  const storageRef = getStorage(app);
  console.log(storageRef, "storageUrl");
  console.log(downloadURLs, "urlsdownload");
  const date = new Date([]);
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images to Firebase Storage

      // Store the post data in Firestore
      await addDoc(collection(firestore, "posts"), {
        title: text,
        description: description,
        growth: growth,
        // imageUrl: downloadURLs,
        personPic: downloadURLs,
        date:new Date()
      });

      console.log("Post added to Firestore successfully");

      // Reset the form
      setText("");
      setDescription("");
      setSelectedImages([]);
      setGrowth("");
    } catch (error) {
      console.error("Error adding post to Firestore:", error);
    }
    const uploadPromises = selectedImages.map((image) => {
      const storageRef = ref(storage, image.name + Date.now());

      return uploadBytes(storageRef, image);
    });

    try {
      const uploadSnapshots = await Promise.all(uploadPromises);
      const urlsPromises = uploadSnapshots.map((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
      const urls = await Promise.all(urlsPromises);
      setDownloadURLs(urls);

      // Save the download URLs to Firestore
      const firebasestoreimage = urls.forEach(async (url) => {
        await addDoc(collection(firebase, "images"), {
          imageUrl: url,
        });
        await addDoc(collection(firebase, "personPic"), {
          personPic: url,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (event) => {
    setSelectedImages([...event.target.files]);
  };

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
          <div>
            <input type="file" multiple onChange={handleImageUpload} />
          </div>
          <TextField
            id="outlined-multiline-flexible"
            label="title"
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
        </div>
        <div></div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Growth"
            value={growth}
            onChange={(e) => setGrowth(e.target.value)}
          />
        </div>
        <div>
          <input type="file" multiple onChange={handleImageUpload} />

          <button onClick={handlesubmit}>submit</button>
        </div>
      </Box>
    </>
  );
}
