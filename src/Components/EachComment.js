import React, { useState } from "react";

const EachComment = (props) => {
  const [showReplies, setShowReplies] = useState(false);
  const { replies } = props?.commentProps;
  const { snippet } = props?.commentProps?.snippet?.topLevelComment;
  return (
    <div className="flex border-2 border-b-gray-300 bg-slate-200 ">
      <div className="w-[4%] m-[5px] ">
        <img
          className="rounded-full"
          src={snippet?.authorProfileImageUrl}
          alt="icon"
        />
      </div>
      <div className="w-[96%] m-[5px] text-black">
        <div className=" text font-medium inline-block m-1">
          @{snippet?.authorDisplayName}
        </div>
        {/* <span className="text-sm ml-[20px]">{snippet?.updatedAt}</span> */}
        <div className="break-all text-sm">{snippet?.textDisplay}</div>

        <div className="text-xs">
          <i class="fa-solid fa-thumbs-up fa-lg"></i> ({snippet?.likeCount})
        </div>
        {replies && replies?.comments?.length > 0 && (
          <button
            className="border border-solid pt-[2px] pb-[2px] pl-[2px] pr-[2px] border-slate-900 rounded-md"
            onClick={() => {
              setShowReplies(!showReplies);
            }}
          >
            replies {replies?.comments?.length}
          </button>
        )}
        {showReplies && <EachReply allReplies={replies?.comments} />}
      </div>
    </div>
  );
};

const EachReply = (props) => {
  console.log(props);
  const commentsArray = props?.allReplies;
  return commentsArray.map((eachcomment) => {
    const { snippet } = eachcomment;
    return (
      <div className="flex border-2 border-b-gray-300 bg-slate-200">
        <div className="w-[3%] m-[5px] ">
          <img
            className="rounded-full"
            src={snippet?.authorProfileImageUrl}
            alt="icon"
          />
        </div>
        <div className="w-[97%] m-[5px]">
          <div className="text-black text-xl inline-block p-2">
            @{snippet?.authorDisplayName}
          </div>
          <span>{snippet?.updatedAt}</span>
          <div className="break-all text-xs">{snippet?.textDisplay}</div>

          <div>
            <i class="fa-solid fa-thumbs-up fa-lg"></i> ({snippet?.likeCount})
          </div>
        </div>
      </div>
    );
  });
};

export default EachComment;
