import React, { useEffect, useState } from "react";
import { VIDEO_DETAILS_URL, YOUTUBE_KEY } from "../Utils/Constant";
import VideoKebabMenu from "./VideoKebabMenu";
import { formatViews } from "../Utils/Helper";
import VideoCardShimmer from "./VideoCardShimmer";

const VideoCard = (props) => {
  const [videoDetails, setVideoDetails] = useState();
  const { channelTitle, title, thumbnails, channelId } =
    props?.videodata?.snippet;
  const { duration } = props?.videodata?.contentDetails;
  async function videodetails() {
    const response = await fetch(
      VIDEO_DETAILS_URL + channelId + "&key=" + YOUTUBE_KEY
    );
    const jsondata = await response.json();
    setVideoDetails(jsondata.items[0]);
  }
  function convertDuration(duration) {
    const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (matches) {
      const hours = matches[1] ? parseInt(matches[1]) : 0;
      const minutes = matches[2] ? parseInt(matches[2]) : 0;
      const seconds = matches[3] ? parseInt(matches[3]) : 0;

      const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      return formattedDuration;
    } else {
      return "Invalid duration format";
    }
  }

  useEffect(() => {
    videodetails();
  }, []);
  return (
    <>
      <div className="w-[400px] m-[8px] shadow-lg rounded-md relative">
        <div className="relative">
          <img
            className="rounded-[7px] w-[400px]"
            src={thumbnails?.medium?.url}
            alt="video-img"
          />
          <div className="absolute p-[3px] rounded-md bottom-[6px] right-[6px] bg-black text-white">
            {convertDuration(duration)}
          </div>
        </div>
        <div className="absolute right-0 "></div>
        <div className="flex mt-3 pb-3">
          <div className="w-6 h-6">
            <img
              className="rounded-full pl-[4px]"
              src={videoDetails?.snippet?.thumbnails?.default?.url}
              alt="channel-logo"
            />
          </div>
          <div className="w-[342px] min-h-[90px] ml-3">
            <div
              className="text-[16px] text-ellipsis font-medium line-clamp-2 "
              title={title}
            >
              {title}
            </div>
            <div className="text-[12px]">{channelTitle}</div>
            <div className="text-[12px] font-sans">
              {formatViews(videoDetails?.statistics?.viewCount)} Views
            </div>
            <div className="text-[12px]"> </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
