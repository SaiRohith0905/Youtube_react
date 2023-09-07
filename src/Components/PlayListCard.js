import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PLAYLISTVIDEOS_URL } from "../Utils/Constant";
import { YOUTUBE_KEY } from "../Utils/Constant";
import ResultVideoCard from "./ResultVideoCard";
import { Link } from "react-router-dom";

const PlayListCard = () => {
  const [playListVedios, setPlayListVedios] = useState([]);
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("authtoken");
  const playListID = searchParams.get("list");
  async function getPlayListItems() {
    const response = await fetch(
      `${PLAYLISTVIDEOS_URL}${playListID}&key=${YOUTUBE_KEY}&maxResults=25`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonResponse = await response.json();
    setPlayListVedios(jsonResponse?.items);
    console.log(jsonResponse.items);
  }

  useEffect(() => {
    getPlayListItems();
  }, [playListID]);
  return (
    playListVedios && (
      <div>
        {playListVedios?.map((eachItem) => {
          return (
            <Link to={"/watch?v=" + eachItem?.snippet?.resourceId?.videoId}>
              <ResultVideoCard properties={eachItem} isPlayList={true} />
            </Link>
          );
        })}
      </div>
    )
  );
};

export default PlayListCard;
