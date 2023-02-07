import './App.css';
import BoxOne from './component/pages/BoxOne';
import Home from './component/Home';
import NavBar from './component/NavBar.js';
import BoxTwo from './component/pages/BoxTwo'
import BoxThree from './component/pages/BoxThree';

//Importing Browser Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';




function App() {
  return (
    <div className="App">

      
     <React.StrictMode>
        <Router>
            <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='BoxOne' element={<BoxOne />} />
            <Route path='BoxTwo' element={<BoxTwo />} />
            <Route path='BoxThree' element={<BoxThree />} />
          </Routes>
        </Router>
     </React.StrictMode>

    </div>
  );
}

export default App;
