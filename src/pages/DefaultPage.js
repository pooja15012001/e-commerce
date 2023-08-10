import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

const DefaultComponent = ({trending}) => {
    console.log(trending,"url")
    const[url,setUrl]=useState([])
  
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: []
    }
  ];
  return (
    <CommentSection
      currentUser={{
        currentUserId: "01a",
        currentUserImg:trending.imageUrl
        ,
        currentUserProfile: trending.imageUrl,
        currentUserFullName: trending.title
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/"
      }}
      commentData={data}
    />
  );
};

export default DefaultComponent;
