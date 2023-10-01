import React from "react";
import SubscribeButton from "./SubscribeButton";

const ChannelCard = (props) => {
  console.log(props);
  const { contentDetails, id, snippet } = props?.channeldetails;
  return (
    <div className="m-3 p-2 items-center flex shadow-md rounded-md">
      <div className="w-[30%]">
        <img
          src={snippet?.thumbnails?.medium?.url}
          alt="Channel-Logo"
          className="rounded-full inline-block"
        />
      </div>
      <div className="w-[70%] flex ">
        <div className="w-[70%]">
          <div className="w-auto text-3xl m-1">{snippet?.title}</div>
          <p className="text-xl m-1">{contentDetails?.totalItemCount} Videos</p>
          <div className="flex">
            <p className="w-[800px] h-auto text-xs m-2">
              {snippet?.description}
            </p>
          </div>
        </div>
        <div className="w-[30%] ">
          {snippet?.resourceId?.channelId && (
            <div className="w-[50%]">
              <SubscribeButton details={snippet?.resourceId?.channelId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
