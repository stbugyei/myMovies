import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import InitialScroll from './components/InitialScroll';
import FetchMovies from './components/pages/displayPages/FetchMovies';
import ScrollToTop from './components/ScrollToTop';
import './App.css';



function App() {

  return (
    <Router>
      <InitialScroll>
        <div className="header">
          <div className="container">
            <FetchMovies />
            <ScrollToTop />
          </div>
        </div>
      </InitialScroll>
    </Router>
  );
}

export default App;
