import React, { useEffect, useState } from "react";
import { VIDEO_DETAILS_URL } from "../Utils/Constant";
import { YOUTUBE_KEY } from "../Utils/Constant";
import { formatViews } from "../Utils/Helper";

const ResultVideoCard = (props) => {
  const [videoDetails, setVideoDetails] = useState();
  const { channelTitle, description, title, channelId } =
    props?.properties?.snippet;
  let { url } = props?.properties?.snippet?.thumbnails?.high;
  if (props.isPlayList) {
    url = props?.properties?.snippet?.thumbnails?.medium.url;
  }
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
    <div className="flex m-[10px] p-[5px] shadow-lg rounded-sm">
      <div className="w-[30%]">
        <img className="rounded-2xl" src={url} alt="thumbnail" />
      </div>
      {!props.isPlayList && (
        <div className="w-[70%] pl-[10px]">
          <div className="text-2xl m-2">{title}</div>
          <div className="flex">
            <div className="w-10 h-10 inline-block">
              <img
                className="rounded-full"
                src={videoDetails?.snippet?.thumbnails?.default?.url}
              />
            </div>
            <div className="m-2 text-base inline-block ">{channelTitle}</div>
          </div>
          {!props?.history && <div className="m-2 text-lg">{description}</div>}
          <div className="text-[14px] ">
            {formatViews(videoDetails?.statistics?.viewCount)} Views
          </div>
        </div>
      )}
      {props.isPlayList && (
        <div className="w-[70%] pl-[10px]">
          <div>{title}</div>
          <div>{props?.properties?.snippet?.videoOwnerChannelTitle}</div>
        </div>
      )}
    </div>
  );
};

export default ResultVideoCard;
