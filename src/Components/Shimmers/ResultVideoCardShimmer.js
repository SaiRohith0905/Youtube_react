import React from "react";

const ResultVideoCardShimmer = () => {
  return (
    <div className="flex m-[10px] w-[100%] h-[288px] p-[5px] shadow-lg rounded-sm">
      <div className="w-[30%] bg-gray-300 rounded-2xl"></div>

      <div className="w-[70%]">
        <div className="h-[25px] mt-5 w-[80%] mb-[10px] ml-[10px] bg-gray-300 rounded-lg "></div>
        <div className="mb-[20px] ml-[10px] flex items-center">
          <span className="w-[30px] mr-2 h-[30px] inline-block rounded-full  bg-gray-300"></span>
          <span className="h-[20px] w-[10%] inline-block rounded-lg bg-gray-300"></span>
        </div>
        <div className="h-[30px] w-[80%] rounded-lg  bg-gray-300 mb-[10px] ml-[10px]"></div>
        <div className="h-[30px] w-[30%] rounded-lg  bg-gray-300 mb-[10px] ml-[10px]"></div>
      </div>
    </div>
  );
};

export default ResultVideoCardShimmer;
