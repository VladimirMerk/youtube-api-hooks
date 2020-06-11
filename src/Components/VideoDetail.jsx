import React from 'react';

const VideoDetail = ({ video }) => {
  if (!video) return null;
  return (
    <>
      <div className='video-detail'>
        <div className='embed-responsive embed-responsive-16by9'>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            className='embed-responsive-item'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <div className='details'>
          <div>{video.title}</div>
          <div>{video.description}</div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
