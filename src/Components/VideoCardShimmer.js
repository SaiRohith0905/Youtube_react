import React from "react";

const VideoCardShimmer = () => {
  return (
    <div>
      <div className="w-[400px] h-[330px] m-[8px] shadow-lg rounded-md relative border border-gray-300">
        <div className=" h-[220px] bg-gray-300 "></div>
        <div className="flex mt-3 pb-3">
          <div className="w-6 h-6 rounded-full  bg-gray-300 ml-[4px]  "></div>
          <div className="w-[342px] h-[30px] mt-2 mb-2  bg-gray-300 ml-3 rounded-[9px]">
            <div className="  bg-gray-300 mt-2 mb-2 w-[342px] h-[20px] rounded-[9px]"></div>
            <div className="  bg-gray-300 mt-2 mb-2 w-[150px] h-[15px] rounded-[9px]"></div>
            <div className="  bg-gray-300 mt-2 mb-2 w-[70px] h-[15px] rounded-[9px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
