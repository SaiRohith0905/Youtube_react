import React from "react";

const Short = ({ shortsdata }) => {
  console.log(shortsdata);
  const SHORTS_BASE_URL = "https://www.youtube.com/embed/";
  return (
    <div className=" flex justify-center mt-5 mb-3">
      <iframe
        className="rounded-lg"
        width="315"
        height="560"
        src={SHORTS_BASE_URL + shortsdata + "?autoplay=1"}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Short;
