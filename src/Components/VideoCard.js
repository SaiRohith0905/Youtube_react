import React, { useEffect, useState } from "react";
import { VIDEO_DETAILS_URL, YOUTUBE_KEY } from "../Utils/Constant";
import VideoKebabMenu from "./VideoKebabMenu";

const VideoCard = (props) => {
  const [videoDetails, setVideoDetails] = useState();
  const { channelTitle, title, thumbnails, channelId } =
    props?.videodata?.snippet;
  async function videodetails() {
    const response = await fetch(
      VIDEO_DETAILS_URL + channelId + "&key=" + YOUTUBE_KEY
    );
    const jsondata = await response.json();
    setVideoDetails(jsondata.items[0]);
  }

  useEffect(() => {
    videodetails();
  }, []);
  return (
    <>
      <div className="w-[400px] m-[8px] shadow-md rounded-md relative">
        <div className="relative">
          <img
            className="rounded-[7px] w-[400px]"
            src={thumbnails?.medium?.url}
            alt="video-img"
          />
          <div className="absolute p-[3px] rounded-md bottom-[6px] right-[6px] bg-black text-white">
            3:00
          </div>
        </div>
        <div className="absolute right-0 "></div>
        <div className="flex mt-3 ">
          <div className="w-6 h-6">
            <img
              className="rounded-full"
              src={videoDetails?.snippet?.thumbnails?.default?.url}
              alt="channel-logo"
            />
          </div>
          <div className="w-[342px] min-h-[90px] ml-3">
            <div
              className="text-[16px] text-ellipsis font-medium line-clamp-2"
              title={title}
            >
              {title}
            </div>
            <div className="text-[12px]">{channelTitle}</div>
            <div className="text-[12px] font-sans">
              {videoDetails?.statistics?.viewCount} Views
            </div>
            <div className="text-[12px]"> </div>
          </div>
        </div>
      </div>
      {/* <VideoKebabMenu></VideoKebabMenu> */}
    </>
  );
};

export default VideoCard;
