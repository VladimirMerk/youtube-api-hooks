import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import youtubeSearch from 'youtube-search';
import Search from './Components/Search.jsx';
import VideoDetail from './Components/VideoDetail.jsx';
import VideoList from './Components/VideoList.jsx';
import ErrorBox from './Components/ErrorBox.jsx';
import Loader from './Components/Loader.jsx';

const SEARCH_OPTIONS = {
  maxResults: 6,
  key: process.env.YOUTUBE_API_KEY,
};

// Html entity decode
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function videoSearch(query = '') {
  return new Promise((resolve, reject) => {
    if (process.env.DEVELOPMENT) {
      resolve(JSON.parse(process.env.DEMODATA));
      return;
    }
    youtubeSearch(query, SEARCH_OPTIONS, (error, video) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(
        video.map((item) => {
          item.title = decodeHtml(item.title);
          item.description = decodeHtml(item.description);
          return item;
        })
      );
    });
  });
}

function useVideoByQuery(query) {
  const [video, setVideo] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    videoSearch(query)
      .then((video) => {
        setVideo(video);
      })
      .catch((error) => {
        setError(error);
      });
  }, [query]);

  return [video, error];
}

function App() {
  const [query, setQuery] = useState('');
  const [video, error] = useVideoByQuery(query);
  const [selectedVideo, setSelectedVideo] = useState();
  useEffect(() => {
    setSelectedVideo(video[0]);
  }, [video]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Search onChange={(newQuery) => setQuery(newQuery)} query={query} />
            <ErrorBox error={error} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {selectedVideo && !error ? (
              <VideoDetail video={selectedVideo} />
            ) : (
              <Loader />
            )}
          </div>
          <div className='col-md-4'>
            {video && !error ? (
              <VideoList
                onVideoSelect={(video) => setSelectedVideo(video)}
                count={SEARCH_OPTIONS.maxResults}
                videoList={video}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

render(<App />, document.querySelector('.cont'));
