import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_URL } from "../Utils/Constant";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHistory } from "../Utils/watchHistorySlice";
import VideoKebabMenu from "./VideoKebabMenu";
import { setLogin } from "../Utils/isAuthorizedSlice";
import { setToken } from "../Utils/tokenSlice";
import VideoCardShimmer from "./VideoCardShimmer";

const VideosContainer = (vcstyle) => {
  const shimmerArray = Array(12).fill("");
  const authtoken = localStorage.getItem("authtoken");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState("");
  const dispatch = useDispatch();

  async function fetchVideos() {
    setLoading(true);
    let url = YOUTUBE_VIDEOS_URL;
    if (pageToken) {
      console.log(pageToken);
      url = url + "&pageToken=" + pageToken;
    }
    // console.log(url);
    const data = await fetch(url, {
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + authtoken,
      //   Accept: "application/json",
      // },
    });
    const jsondata = await data.json();

    setPageToken(jsondata?.nextPageToken);
    setVideos(videos.concat(jsondata?.items));
    setLoading(false);
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
  if (videos.length > 0) {
    return (
      <>
        <div className="flex flex-wrap" vcstyle={vcstyle}>
          {videos.map((eachvideo, index) => {
            return (
              <div className="relative">
                <Link
                  to={"/watch?v=" + eachvideo?.id}
                  onClick={() => {
                    dispatch(addHistory(eachvideo));
                  }}
                >
                  <VideoCard key={eachvideo?.id} videodata={videos[index]} />
                </Link>
                <div className="absolute right-[18px] bottom-[68px] ">
                  <VideoKebabMenu
                    key={eachvideo?.id + 1}
                    vedioDetails={eachvideo}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="flex flex-wrap ">
            {shimmerArray.map((eachItem, index) => {
              return <VideoCardShimmer key={index} />;
            })}
          </div>
        )}
      </>
    );
  } else {
    // return <VideoCardShimmer />;
    return (
      <div className="flex flex-wrap ">
        {shimmerArray.map((eachItem, index) => {
          return <VideoCardShimmer key={index} />;
        })}
      </div>
    );
  }
};

export default VideosContainer;
