import React, { Component } from 'react';

function VideoListItem({ video, onVideoSelect }) {
  if (!video) return null;
  const image = video.thumbnails.default;
  return (
    <>
      <li
        onClick={() => {
          onVideoSelect(video);
        }}
        className='list-group-item'
      >
        <div className='video_list media'>
          <div className='media-left'>
            <img
              alt={video.description}
              width={image.width}
              height={image.height}
              className='media-object'
              src={image.url}
            />
          </div>
          <div className='media-body'>
            <div className='media-heading'>{video.title}</div>
          </div>
        </div>
      </li>
    </>
  );
}

const VideoList = ({ videoList, onVideoSelect }) => {
  const listItems = videoList.map((item, i) => {
    const video = item || null;
    return (
      <VideoListItem
        onVideoSelect={onVideoSelect}
        key={video.id || i}
        video={video}
      />
    );
  });

  return (
    <>
      <ul className='list-group'>{listItems}</ul>
    </>
  );
};

export default VideoList;

// export default class VideoPreview extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const listItems = this.props.video.map((item, i) => {
//       const video = item || null;
//       return (<VideoListItem
//         onVideoSelect={this.props.onVideoSelect}
//         key={video.id || i}
//         video={video}
//       />);
//     });

//     return (
//       <>
//         <ul className='list-group'>{listItems}</ul>
//       </>
//     );
//   }
// }
