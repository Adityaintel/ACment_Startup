import React from "react";
import "./css/Videos.css";
import image from "./images/backwaters.jpg";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Videos() {
  const videoData = {
    thumbnail: image,
    topic: "This is backwaters",
    username: "shijith",
    duration: "10:00",
    videoUrl:
      baseUrl +
      "/videos/video_2021-08-14T17-58-58.058Zbig_buck_bunny_720p_5mb.mp4",
  };
  return (
    <div className="videos">
      <div className="videos__container">
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
        <div className="videos__card">
          <VideoCard videoData={videoData} />
        </div>
      </div>
    </div>
  );
}

export default Videos;

const VideoCard = ({ videoData }) => {
  return (
    <div className="videoCard">
      {/* <div className="videoCard__thumbnail">
        <img src={videoData.thumbnail} alt="" />
        <p className="videoCard__videoDuration">{videoData.duration}</p>
      </div> */}
      <div className="videoCard__videoSection">
        <video
          src={videoData.videoUrl}
          height="100%"
          width="100%"
          poster={videoData.thumbnail}
          controls
          controlsList="nodownload"
        ></video>
      </div>
      <div className="videoCard__info">
        <div className="videoCard__mentorProfile">
          <img src={image} alt="" />
        </div>
        <div className="videoCard__videoData">
          <h3>{videoData.topic}</h3>
          <h4>{videoData.username}</h4>
        </div>
      </div>
    </div>
  );
};
