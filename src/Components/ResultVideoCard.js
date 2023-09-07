import React from "react";

const ResultVideoCard = (props) => {
  const { channelTitle, description, title } = props?.properties?.snippet;
  const { url } = props?.properties?.snippet?.thumbnails?.high;
  return (
    <div className="flex m-[5px]">
      <div className="w-[30%]">
        <img className="rounded-md" src={url} alt="thumbnail" />
      </div>
      {!props.isPlayList && (
        <div className="w-[70%] pl-[10px]">
          <div>{title}</div>
          <div>{channelTitle}</div>
          <div>{description}</div>
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
