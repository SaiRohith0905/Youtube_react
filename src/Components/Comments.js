import React, { useEffect } from "react";
import { useState } from "react";
import EachComment from "./EachComment";
import { YOUTUBE_KEY } from "../Utils/Constant";

const Comments = (props) => {
  const [commentsList, setCommentsList] = useState([]);

  const videoId = props?.videoinfo;

  async function getComments() {
    const comments = await fetch(
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&moderationStatus=published&order=time&textFormat=plainText&videoId=" +
        videoId +
        "&key=" +
        YOUTUBE_KEY
    );
    const jsoncomments = await comments.json();
    // console.log(jsoncomments);
    setCommentsList(jsoncomments?.items);
  }

  useEffect(() => {
    getComments();
  }, []);
  if (commentsList?.length > 0) {
    return commentsList.map((eachcomment) => {
      return <EachComment commentProps={eachcomment} />;
    });
  }
};

export default Comments;
