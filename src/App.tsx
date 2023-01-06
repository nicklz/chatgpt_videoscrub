import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoGallery from './components/VideoGallery';

function App() {
  return (
    <div className="App">
      <main className="main">
        <h1>Video scrubber gallery without exploding frames</h1>
        <VideoGallery query={'cars'} perPage={20}></VideoGallery>
      </main>
    </div>
  );
}

export default App;
