import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_URL } from "../Utils/Constant";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHistory } from "../Utils/watchHistorySlice";
import VideoKebabMenu from "./VideoKebabMenu";
import { setLogin } from "../Utils/isAuthorizedSlice";
import { setToken } from "../Utils/tokenSlice";
const VideosContainer = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const dispatch = useDispatch();
  let lastScrollPosition = 0;
  async function fetchVideos() {
    let url = YOUTUBE_VIDEOS_URL;
    if (pageToken) {
      console.log(pageToken);
      url = url + "&pageToken=" + pageToken;
    }
    // console.log(url);
    const data = await fetch(url);
    const jsondata = await data.json();

    setPageToken(jsondata?.nextPageToken);
    setVideos(videos.concat(jsondata?.items));
  }

  useEffect(() => {
    fetchVideos();
  }, []);
  useEffect(() => {
    // console.log(window.location.href);
    if (window.location.href.includes("access_token")) {
      let hashParameter = window.location.hash;
      const result1 = hashParameter.split("access_token=");
      const result2 = result1[1].split("&token_type");
      const token = result2[0];
      console.log(token);
      if (token.length > 0) {
        dispatch(setLogin(true));
        dispatch(setToken(token));
        localStorage.setItem("isLoggedin", true);
        localStorage.setItem("authtoken", token);
      } else {
        dispatch(setLogin(false));
      }
      console.log(hashParameter);
      window.location.hash = "";
    }
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ==
      document.documentElement.offsetHeight
    ) {
      console.log("need backed data");
      fetchVideos();
    } else {
      console.log("no need nte=t");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageToken]);
  return (
    <div className="flex flex-wrap ">
      {videos.map((eachvideo, index) => {
        return (
          <div className="relative">
            <Link
              to={"/watch?v=" + eachvideo?.id?.videoId}
              onClick={() => {
                dispatch(addHistory(eachvideo));
              }}
            >
              <VideoCard
                key={eachvideo?.id?.videoId}
                videodata={videos[index]}
              />
            </Link>
            <div className="absolute right-[18px] bottom-[68px] ">
              <VideoKebabMenu vedioDetails={eachvideo} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideosContainer;
