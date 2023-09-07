import React from "react";
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
  ];
  return (
    <div className="">
      {ButtonNameList.map((eachitem) => {
        return <Button key={eachitem} name={eachitem} />;
      })}
      {/* <Button name={ButtonNameList[0]} /> */}
    </div>
  );
};

export default ButtonList;
