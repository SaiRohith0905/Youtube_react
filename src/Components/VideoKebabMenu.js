import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import {
  ADD_VEDIO_TO_PLAYLIST_URL,
  CREATE_NEWPLAYLIST_URL,
  DEL_VIDEO_FROM_PLAYLIST_URL,
  YOUTUBE_KEY,
  selectPrivacy,
} from "../Utils/Constant";
import { Dropdown } from "primereact/dropdown";
import { addPlayListItems } from "../Utils/PlayListItemsSlice";
import { addToWatchLater } from "../Utils/WatchLaterSlice";

const VideoKebabMenu = (props) => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const vedioIdAdd = props?.vedioDetails?.id;
  const authToken = localStorage.getItem("authtoken");
  // console.log(vedioIdAdd);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [openPlayListPopup, setOpenPlayListPopup] = useState(false);
  const [showCreatePlayList, setShowCreatePlayList] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const [required, setRequired] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [yourPrivacy, setYourPrivacy] = useState(selectPrivacy[0]);
  let videoPlayListItemID;
  const playlistdata = useSelector((store) => {
    return store?.playlistitems?.playList;
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function afterOpenModal() {
    setShowMenuOptions(!showMenuOptions);
  }
  function closeModal() {
    setOpenPlayListPopup(false);
  }
  function addToPlayList(playListItem, checked) {
    // console.log(playListItem, checked);
    if (checked) {
      // add to playlist
      addItemstoPlayList(playListItem);
    } else {
      //remove from playlist
      removeItemsFromPlayList();
    }
  }
  async function addItemstoPlayList(playlistToADD) {
    const playlistPayLoad = {
      snippet: {
        playlistId: playlistToADD?.id,
        position: 0,
        resourceId: {
          kind: "youtube#video",
          videoId: vedioIdAdd,
        },
      },
    };
    const response = await fetch(ADD_VEDIO_TO_PLAYLIST_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        Accept: "application / json",
        "Content-Type": "application / json",
      },
      body: JSON.stringify(playlistPayLoad),
    });
    const jsonoutput = await response?.json();
    console.log(jsonoutput);
    videoPlayListItemID = jsonoutput?.id;
    const Message = "added to " + playlistToADD?.snippet?.localized?.title;
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: Message,
    });
  }
  async function removeItemsFromPlayList() {
    const url =
      DEL_VIDEO_FROM_PLAYLIST_URL + videoPlayListItemID + "&key=" + YOUTUBE_KEY;
    const response2 = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        Accept: "application / json",
      },
    });
    const Message = "Remove from PlayList";
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: Message,
    });
  }

  async function createNewPlayList() {
    if (inputValue.length == 0) {
      setRequired(true);
      return;
    }
    if (inputValue.length > 150) {
      setRequired(true);
      return;
    }
    const url = CREATE_NEWPLAYLIST_URL + YOUTUBE_KEY;
    const payload = {
      snippet: {
        title: inputValue,
        description: "",
        tags: [],
        defaultLanguage: "en",
      },
      status: {
        privacyStatus: yourPrivacy.privacy,
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        Accept: "application / json",
      },
      body: JSON.stringify(payload),
    });
    const playListResponse = await response.json();
    if (playListResponse.id) {
      addItemstoPlayList(playListResponse, true);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <div
        className="w-2 bottom-[92px] left-[382px]"
        onClick={() => {
          setShowMenuOptions(!showMenuOptions);
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {/* <div className=" w-1 h-1 m-[2px] rounded-full bg-black"></div>
        <div className=" w-1 h-1 m-[2px] rounded-full bg-black"></div>
        <div className=" w-1 h-1 m-[2px] rounded-full bg-black"></div> */}
      </div>
      {showMenuOptions && (
        <div className="absolute right-[10px] bottom-[-30px] border border-solid border-blue-50 shadow-md bg-white rounded-md w-[200px] z-[120]">
          <ul className="">
            <li
              className="hover:bg-gray-200 cursor-pointer p-3"
              onClick={() => {
                dispatch(addToWatchLater(props?.vedioDetails));
                toast.current.show({
                  severity: "success",
                  summary: "Success",
                  detail: "Added to watch later",
                });
                setShowMenuOptions(false);
              }}
            >
              Save to Watch Later ⏱
            </li>
            <li
              className="hover:bg-gray-200 cursor-pointer p-3"
              onClick={() => {
                setOpenPlayListPopup(true);
              }}
            >
              Add to Play List 🎶
            </li>
          </ul>
        </div>
      )}

      {/* playlisg POPUP */}
      <Modal
        isOpen={openPlayListPopup}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div>
          <div className="flex">
            <h2 className="text-2xl">Save video to ...</h2>
            <button
              className="text-3xl ml-8 relative top-[-6px] right-[-72px]"
              onClick={closeModal}
            >
              x
            </button>
          </div>
          <div>
            {playlistdata &&
              playlistdata?.map((eachitem) => {
                return (
                  <div className="m-2">
                    <input
                      className="m-1"
                      type="checkbox"
                      id={eachitem?.snippet?.title}
                      onChange={(e) => {
                        addToPlayList(eachitem, e.target.checked);
                      }}
                    />
                    <label className="m-1" for={eachitem?.snippet?.title}>
                      {eachitem?.snippet?.title} 🎶
                    </label>
                  </div>
                );
              })}
            {!showCreatePlayList && (
              <div
                className="cursor-pointer text-xl"
                onClick={() => {
                  setShowCreatePlayList(!showCreatePlayList);
                }}
              >
                + Create New PlayList
              </div>
            )}
            {showCreatePlayList && (
              <>
                <div>
                  <div>
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter playist name..."
                      onChange={(e) => {
                        setInputValue(e?.target?.value);
                        setRequired(
                          e?.target?.value?.length == 0 ? true : false
                        );
                      }}
                      className="border w-[98%] border-t-0 border-l-0 border-r-0 border-black block focus-visible:outline-none"
                    />
                    <div className="flex items-center justify-between">
                      {required && <div className="text-red-400">required</div>}
                      <div>{inputValue?.length}/150</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1>Privacy</h1>
                  <Dropdown
                    className="w-[160px] h-[45px]"
                    value={yourPrivacy}
                    onChange={(e) => {
                      setYourPrivacy(e?.value);
                    }}
                    options={selectPrivacy}
                    optionLabel="privacy"
                    placeholder=""
                  ></Dropdown>
                </div>
                <button
                  className="hover:bg-blue-500 block rounded-md absolute right-3 pb-2 hover:text-white  p-3"
                  onClick={() => {
                    createNewPlayList();
                  }}
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoKebabMenu;
