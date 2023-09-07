import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import menuBarContext from "../Utils/menuBarContext";
import Comments from "./Comments";
import SubscribeButton from "./SubscribeButton";
import {
  IS_SUBSCRIBED_URL,
  SINGLE_VIDEO_DETAILS,
  SUBSCRIBE_TO_CHANNEL_URL,
  UNSUBSCRIBE_TO_CHANNEL,
  UNSUBSCRIBE_TO_CHANNEL_URL,
  VIDEO_DETAILS_URL,
  YOUTUBE_KEY,
} from "../Utils/Constant";
import Linkify from "react-linkify";
import ReactMarkdown from "react-markdown";
const WatchPage = () => {
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

  async function subscribeChannel() {
    const subscribePayLoad = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId: channelId,
        },
      },
    };
    const url = SUBSCRIBE_TO_CHANNEL_URL + YOUTUBE_KEY;
    const response6 = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application / json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscribePayLoad),
    });
    const jsondata6 = await response6.json();
    console.log(jsondata6);
    setSubscribed(true);
  }
  async function unSubscribeChannel() {
    const url =
      UNSUBSCRIBE_TO_CHANNEL_URL +
      subscriptionId.current +
      "&key=" +
      YOUTUBE_KEY;
    const response5 = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application / json",
      },
    });
    setSubscribed(false);
  }
  // setNavBarConfig(false);
  useEffect(() => {
    setNavBarConfig(false);
  }, []);

  useEffect(() => {
    getVideoDetails();
  }, []);

  return (
    <div className="">
      <div className="">
        <iframe
          width="900"
          height="500"
          src={url + videoId + "?autoplay=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-[900px] ">
        <div>
          <div>{title}</div>
          <div className="flex">
            <div className="w-10 ">
              <img
                className="rounded-full"
                src={thumbnails?.default?.url}
                alt="Channel-logo"
              />
            </div>
            <div className="">
              <div>{channelTitle}</div>
              <div>
                {" "}
                {channelDetails?.statistics?.subscriberCount} Subscribers
              </div>
            </div>
            {channelId && <SubscribeButton details={channelId} />}
            {/* <div>{commentCount}</div> */}
            {/* <button
              className="bg-black text-white rounded-l-full rounded-r-full pl-[5px] pr-[5px] pt-[3px] pb-[3px]"
              onClick={() => {
                subscribed ? unSubscribeChannel() : subscribeChannel();
              }}
            >
              Subscribe
            </button> */}
            <div>👍:{likeCount}</div>
          </div>
        </div>
        <p
          className={
            (showDescription ? "h-[125px] overflow-hidden text-ellipsis" : "") +
            "links bg-stone-100"
          }
        >
          <Linkify>{description}</Linkify>
        </p>
        <div
          className="cursor-pointer  bg-stone-100"
          onClick={() => {
            showContent();
          }}
        >
          {showDescription ? "Show more" : "Show less"}
        </div>
      </div>
      <div>{commentCount} Comments</div>
      <div className="w-[900px]">
        <Comments videoinfo={videoId} />
      </div>
    </div>
  );
};

export default WatchPage;
