import React, { useEffect } from "react";
import { useState } from "react";
import EachComment from "./EachComment";
import { YOUTUBE_KEY } from "../Utils/Constant";

const Comments = (props) => {
  const [commentsList, setCommentsList] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ==
      document.documentElement.offsetHeight
    ) {
      console.log("need backed data");
      getComments();
    } else {
      console.log("no need comments");
    }
  };

  const videoId = props?.videoinfo;

  async function getComments() {
    let url =
      "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&moderationStatus=published&order=time&textFormat=plainText&videoId=" +
      videoId +
      "&key=" +
      YOUTUBE_KEY;
    if (pageToken) {
      url = url + "&pageToken=" + pageToken;
    }
    const comments = await fetch(url);
    const jsoncomments = await comments.json();
    // console.log(jsoncomments);
    setPageToken(jsoncomments?.nextPageToken);
    setCommentsList(commentsList.concat(jsoncomments?.items));
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
