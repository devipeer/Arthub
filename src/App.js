import React, { useState, useEffect } from 'react'; // useEffect runs a piece on a specific condition
import './App.css';
import logo from './logo.png';
import Post from './Post';


function App() {

useEffect(() => {
  // code runs here 
}, [posts]
)

  return (
    
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt=""/>
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;