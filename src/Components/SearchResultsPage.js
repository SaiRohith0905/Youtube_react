import React from "react";
import { useState, useEffect } from "react";
import ResultVideoCard from "./ResultVideoCard";
import { useSearchParams } from "react-router-dom";
import { SEARCH_RESULTS_URL } from "../Utils/Constant";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHistory } from "../Utils/watchHistorySlice";
const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [data] = useSearchParams();

  const [nextPageToken, setNextPageToken] = useState("");
  let searchword;

  searchword = data.get("searchquery");
  console.log(searchword);

  const dispatch = useDispatch();

  async function searchResults() {
    let url =
      SEARCH_RESULTS_URL +
      searchword +
      "&part=snippet&type=video&maxResults=10";
    if (nextPageToken) {
      url = url + "&pageToken=" + nextPageToken;
    }
    const data1 = await fetch(url);
    const searchdata = await data1.json();
    console.log(searchdata);
    setNextPageToken(searchdata?.nextPageToken);
    setResults(results.concat(searchdata?.items));
  }
  const handleScroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.offsetHeight - 10
    ) {
      searchResults();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPageToken]);

  useEffect(() => {
    searchResults();
    return () => {
      setResults([]);
    };
  }, [searchword]);
  if (results.length > 0) {
    return (
      <div>
        <div>
          {results.map((eachresult) => {
            return (
              <Link
                to={"/watch?v=" + eachresult?.id?.videoId}
                onClick={() => {
                  dispatch(addHistory(eachresult));
                }}
              >
                <ResultVideoCard properties={eachresult} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading ......</div>;
  }
};

export default SearchResultsPage;
