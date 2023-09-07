import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultVideoCard from "./ResultVideoCard";
import { clearHistory } from "../Utils/watchHistorySlice";
import { Link } from "react-router-dom";
const HistoryPage = () => {
  const historyDetails = useSelector((store) => {
    return store.history.storeHistory;
  });
  const dispatch = useDispatch();
  console.log(historyDetails);
  if (historyDetails.length > 0) {
    return (
      <div className="flex">
        <div className="w-[80%]">
          {historyDetails.map((eachVideo) => {
            return (
              <Link to={"/watch?v=" + eachVideo?.id?.videoId}>
                <ResultVideoCard properties={eachVideo} />
              </Link>
            );
          })}
        </div>
        <span
          className=" cursor-pointer"
          onClick={() => {
            {
              dispatch(clearHistory());
            }
          }}
        >
          Clear all Watch History !
        </span>
      </div>
    );
  } else {
    return <div>No Watch History in your Current Session !!</div>;
  }
};

export default HistoryPage;
