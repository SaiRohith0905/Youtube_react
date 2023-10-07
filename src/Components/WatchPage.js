import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import menuBarContext from "../Utils/menuBarContext";
import Comments from "./Comments";
import SubscribeButton from "./SubscribeButton";
import {
  IS_SUBSCRIBED_URL,
  SINGLE_VIDEO_DETAILS,
  VIDEO_DETAILS_URL,
  YOUTUBE_KEY,
} from "../Utils/Constant";
import Linkify from "react-linkify";
import VideosContainer from "./VideosContainer";
import floatMenuBarContext from "../Utils/floatMenuBarContext";
import { formatViews } from "../Utils/Helper";
import { Toast } from "primereact/toast";
const WatchPage = () => {
  const vcStyle = {
    backgroundColor: "red",
    flexWrap: "nowrap",
    flexDirection: "column",
  };
  const [videoParams] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState({
    snippet: {
      channelId: "",
      channelTitle: "",
      description: "",
      title: "",
    },
    statistics: {
      commentCount: "",
      likeCount: "",
      viewCount: "",
    },
  });
  const authtoken = localStorage.getItem("authtoken");

  const [channelDetails, setChannelDetails] = useState({
    snippet: {
      thumnails: {},
    },
    statistics: {
      subscriberCount: "",
    },
  });
  const subscriptionId = useRef("");
  const { thumbnails } = channelDetails?.snippet;
  const { channelId, channelTitle, description, title } = videoDetails?.snippet;
  const { likeCount, viewCount, commentCount } = videoDetails?.statistics;
  const [subscribed, setSubscribed] = useState(false);
  const [showUnSubscribe, setShowUnSubscribe] = useState(false);
  const videoId = videoParams.get("v");
  const url = "https://www.youtube.com/embed/";
  const navbarinfo = useContext(menuBarContext);
  const { setNavBarConfig } = navbarinfo;
  const [showDescription, setShowDescription] = useState(true);
  const floatnavbarinfo = useContext(floatMenuBarContext);
  const { floatNavBarConfig, setFloatNavBarConfig } = floatnavbarinfo;

  async function getVideoDetails() {
    const response = await fetch(SINGLE_VIDEO_DETAILS + videoId);
    const jsondata = await response.json();
    setVideoDetails(jsondata?.items[0]);
    getChannelDetails(jsondata?.items[0]?.snippet?.channelId);
    isSubscribed(jsondata?.items[0]?.snippet?.channelId);
  }
  function showContent() {
    setShowDescription(!showDescription);
    console.log(showDescription);
  }
  async function getChannelDetails(ChID) {
    const response3 = await fetch(
      VIDEO_DETAILS_URL + ChID + "&key=" + YOUTUBE_KEY
    );
    const jsondata3 = await response3.json();
    setChannelDetails(jsondata3?.items[0]);
  }
  async function isSubscribed(ChID) {
    const response4 = await fetch(
      IS_SUBSCRIBED_URL + ChID + "&mine=true&key=" + YOUTUBE_KEY,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authtoken,
          Accept: "application / json",
          "Content-Type": "application / json",
        },
      }
    );
    const jsondata4 = await response4.json();

    // console.log(jsondata4);
    subscriptionId.current = jsondata4?.items[0]?.id;

    setSubscribed(jsondata4?.items?.length > 0 ? true : false);
  }

  // setNavBarConfig(false);
  useEffect(() => {
    setNavBarConfig(false);
  }, []);
  useEffect(() => {
    setFloatNavBarConfig(true);
    return () => {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("hideBodyScroll");
      setFloatNavBarConfig(false);
    };
  }, []);

  useEffect(() => {
    getVideoDetails();
  }, []);
  return (
    <div className="flex">
      <div className="">
        <div className="w-[70%] rounded-md">
          <iframe
            className="rounded-lg"
            width="900"
            height="500"
            src={url + videoId + "?autoplay=1"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-[98%] rounded-md m-2 bg-white">
          <div>
            <div className="text-xl font-bold  m-1">{title}</div>
            <div className="flex">
              <div className="w-10 m-2">
                <img
                  className="rounded-full"
                  src={thumbnails?.default?.url}
                  alt="Channel-logo"
                />
              </div>
              <div className=" m-2 ">
                <div className="text-sm font-semibold">{channelTitle}</div>
                <div className="text-xs font-normal">
                  {formatViews(channelDetails?.statistics?.subscriberCount)}{" "}
                  Subscribers
                </div>
              </div>
              <div className="ml-[10px]">
                {channelId && <SubscribeButton details={channelId} />}
              </div>
              <div className="pt-[8px] pl-[20px]">
                <i className="fa-solid fa-thumbs-up fa-lg"></i> :{" "}
                {formatViews(likeCount)}
              </div>
            </div>
          </div>
          <p
            className={
              (showDescription
                ? "h-[125px] overflow-hidden text-ellipsis"
                : "") + "links bg-gray-100"
            }
          >
            <Linkify>{description}</Linkify>
          </p>
          <div
            className="cursor-pointer  bg-gray-100"
            onClick={() => {
              showContent();
            }}
          >
            {showDescription ? "Show more" : "Show less"}
          </div>
        </div>
        <div className="m-2 text-base font-medium">
          {formatViews(commentCount)} Comments
        </div>
        <div className="w-[98%]">
          <Comments videoinfo={videoId} />
        </div>
      </div>
      <div>
        <VideosContainer vcstyle={vcStyle} />
      </div>
    </div>
  );
};

export default WatchPage;
