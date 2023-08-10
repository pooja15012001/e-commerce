import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { storage } from './Service/firebase.config';
import { firebase } from './Service/firebase.config';


const Imagestoring = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const handleImageUpload = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleUpload = async () => {
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
      urls.forEach(async (url) => {
        await addDoc(collection(firebase, 'images'), {
          imageUrl: url,
        });
      });

    } catch (error) {
      console.log(error);
    }
  };
console.log(downloadURLs)
  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Imagestoring;
