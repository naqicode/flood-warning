import React from 'react';
import './HomeCss.css';

function Home() {
  return (


    <div className='box-area'>
      
      <div className='single-box'>
        <div className='img-area'></div>
        <div className='img-text'></div>
        <span className='header-text'><strong>BoxOne Title</strong></span>
        <div className='line'></div>
        <h3>BoxOne</h3>
        <p>Some info on BoxOne</p>
      </div>
      


      <div className='single-box'>
        <div className='img-area'></div>
        <div className='img-text'></div>
        <span className='header-text'><strong>BoxTwo Title</strong></span>
        <div className='line'></div>
        <h3>BoxTwo</h3>
        <p>Some info on BoxOne</p>
      </div>


      <div className='single-box'>
        <div className='img-area'></div>
        <div className='img-text'></div>
        <span className='header-text'><strong>BoxThree Title</strong></span>
        <div className='line'></div>
        <h3>BoxThree - User Manual PDF File</h3>
        <p>Some info on BoxOne</p>
      </div>

      
      
    </div>

  
  )
}

export default Home
