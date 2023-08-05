import React from "react";
// import "./styles.css";
import { FacebookMessengerIcon, FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, FacebookMessengerShareButton } from "react-share";

function ShareComponent() {
  return (
    <div>
      <FacebookShareButton
        url={"https://www.kiribatitranslate.com/"}
      >
        <FacebookIcon size={32} round /> Share
      </FacebookShareButton>
      <TwitterShareButton
        url={"https://www.kiribatitranslate.com/"}
      >
        <TwitterIcon size={32} round />
        Share
      </TwitterShareButton>
    </div>
  );
}

export default ShareComponent;