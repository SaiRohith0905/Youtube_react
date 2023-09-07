import React from "react";
import SubscribeButton from "./SubscribeButton";

const ChannelCard = (props) => {
  console.log(props);
  const { contentDetails, id, snippet } = props?.channeldetails;
  return (
    <div className="m-3 p-2 items-center flex">
      <div className="w-[30%]">
        <img
          src={snippet?.thumbnails?.medium?.url}
          alt="Channel-Logo"
          className="rounded-full inline-block"
        />
      </div>
      <div className="w-[60%]">
        <div className="w-[300px]">{snippet?.title}</div>

        <p>{contentDetails?.totalItemCount} Videos</p>
        <div className="flex">
          <p className="w-[800px] h-auto">{snippet?.description}</p>
          {snippet?.resourceId?.channelId && (
            <SubscribeButton details={snippet?.resourceId?.channelId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
