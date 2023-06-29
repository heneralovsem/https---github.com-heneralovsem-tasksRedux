import React from "react";
import {BrowserRouter} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
