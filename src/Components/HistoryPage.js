import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultVideoCard from "./ResultVideoCard";
import { clearHistory } from "../Utils/watchHistorySlice";
import { Toast } from "primereact/toast";

import { Link } from "react-router-dom";
const HistoryPage = () => {
  const toast = useRef(null);
  const historyDetails = useSelector((store) => {
    return store.history.storeHistory;
  });
  const dispatch = useDispatch();
  console.log(historyDetails);
  if (historyDetails.length > 0) {
    return (
      <div>
        <Toast ref={toast} />
        <div>
          <span className="text-xl font-bold">Watch History</span>
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
                  dispatch(clearHistory());
                }, 500);
              }
            }}
          >
            Clear all Watch History !
          </button>
        </div>

        <div>
          {historyDetails.map((eachVideo) => {
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
    <Toast ref={toast} />;

    return <div>No Watch History in your Current Session !!</div>;
  }
};

export default HistoryPage;
