import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultVideoCard from "./ResultVideoCard";
import { Link } from "react-router-dom";
import { clearHistory } from "../Utils/watchHistorySlice";
import { Toast } from "primereact/toast";
import { clearWatchLater } from "../Utils/WatchLaterSlice";

const WatchLaterPage = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const watchLaterDetails = useSelector((store) => {
    return store?.watchlater?.watchlater;
  });
  // const watchLaterDetails = [];
  if (watchLaterDetails.length > 0) {
    return (
      <div>
        <Toast ref={toast} />
        <div>
          <span className="text-xl font-bold">Watch Later</span>
          <button
            className="border border-black inline-block cursor-pointer p-2 rounded-lg ml-3"
            onClick={() => {
              {
                toast.current.show({
                  severity: "success",
                  summary: "Success",
                  detail: "Cleared Watch History",
                });
                setTimeout(() => {
                  dispatch(clearWatchLater());
                }, 500);
              }
            }}
          >
            Clear Watch Later!
          </button>
        </div>

        <div>
          {watchLaterDetails.map((eachVideo) => {
            return (
              <Link to={"/watch?v=" + eachVideo?.id?.videoId}>
                <ResultVideoCard properties={eachVideo} history={true} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>No Watch later Videos in your Current Session!!</div>;
  }
};

export default WatchLaterPage;
