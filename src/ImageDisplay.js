import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { firebase } from "./Service/firebase.config";

const ImageDisplay = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firebase, "images"));
        const imagesData = querySnapshot.docs.map((doc) => doc.data().imageUrl);
        setImages(imagesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((imageUrl) => (
        <img
          images={images}
          style={{ width: "200px", height: "200px" }}
          src={imageUrl}
          alt="Uploaded"
          key={imageUrl}
        />
      ))}
    </div>
  );
};

export default ImageDisplay;
