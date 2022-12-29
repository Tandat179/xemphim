import React, { Fragment } from "react";
import YouTube from "react-youtube";

export default function BannerTrailer(props) {
    
  const showTrailer = [props.prop[0].trailer];

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  let renderTrailer = () => {
    return showTrailer.map((id, index) => {
      return <div className="trailer">
        <YouTube className="youtube_trailer" videoId={id} opts={opts} />
      </div>
    });
  };
  return renderTrailer();
}

