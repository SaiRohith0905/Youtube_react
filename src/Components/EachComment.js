import React, { useState } from "react";

const EachComment = (props) => {
  const [showReplies, setShowReplies] = useState(false);
  const { replies } = props?.commentProps;
  const { snippet } = props?.commentProps?.snippet?.topLevelComment;
  return (
    <div className="flex border-2 border-b-gray-300 bg-slate-200 ">
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
        <div
          className="break-all
        "
        >
          {snippet?.textDisplay}
        </div>

        <div>👍 ({snippet?.likeCount})</div>
        {replies && replies?.comments?.length > 0 && (
          <button
            className="border border-solid pt-1 pb-1 pl-2 pr-2 border-slate-900 rounded-md p"
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
          <div className="break-all">{snippet?.textDisplay}</div>

          <div>👍 ({snippet?.likeCount})</div>
        </div>
      </div>
    );
  });
};

export default EachComment;
