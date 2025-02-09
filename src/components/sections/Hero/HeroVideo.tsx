import React from "react";

const HeroVideo = () => {
  return (
    <div className="container max-auto">
      <div className="w-full min-h-[700px]">
        <iframe
          src="https://player.vimeo.com/video/1039504919?muted=1&autoplay=1&loop=1&background=1&app_id=122963"
          className="w-full h-[700px] rounded-4xl"
        />
      </div>
    </div>
  );
};

export default HeroVideo;
