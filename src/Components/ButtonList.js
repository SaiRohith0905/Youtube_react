import React, { useEffect } from "react";
import Button from "./Button";

const ButtonList = () => {
  const ButtonNameList = [
    "All",
    "Gaming",
    "Live",
    "Music",
    "Akshay Saini",
    "Javascript",
    "React",
    "BGMI",
    "Himalayan",
    "Node js",
    "Tom & Jerry",
    "Yezdi",
    "Namaste Javascript",
    "OGGY",
    // "script",
    // "Java",
    // "SQL",
    // "Unix",
    // "Linux",
    // "GOD OF WAR",
  ];
  // useEffect(() => {
  //   const scrollrightbutton = document.getElementById("scroll-right-button");
  //   const scrollleftbutton = document.getElementById("scroll-left-button");
  //   const buttoncontainer = document.getElementById("buttonscontainer");
  //   const scrollamount = 200;

  //   scrollleftbutton.addEventListener("click", () => {
  //     buttoncontainer.scrollBy({ left: -scrollamount, behavior: "smooth" });
  //   });
  //   scrollrightbutton.addEventListener("click", () => {
  //     buttoncontainer.scrollBy({ right: scrollamount, behavior: "smooth" });
  //   });
  // }, []);

  return (
    <>
      <div className="flex overflow-hidden w-auto">
        {/* <button className="text-2xl" id="scroll-left-button">
          ˂
        </button> */}
        <div className="" id="buttonscontainer">
          {ButtonNameList.map((eachitem) => {
            return <Button key={eachitem} name={eachitem} />;
          })}
          {/* <Button name={ButtonNameList[0]} /> */}
        </div>
        {/* <button className="text-2xl" id="scroll-right-button">
          ˃
        </button> */}
      </div>
    </>
  );
};

export default ButtonList;
