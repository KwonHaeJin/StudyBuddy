/* eslint-disable */
import './App.css';
import Studyroom from './studyroom';
import Camera from './camera';
import Feed from './feedPage/feedPage';
import Profile from './feedPage/editProfile';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <div className="App">
      
        <button onClick={() => navigate("/studyroom")}>
          스터디룸으로
        </button>
        <button onClick={() => navigate("/camera")}>
          카메라로
        </button>
        <button onClick={() => navigate("/feed")}>
          피드로
        </button>
      
    </div>
  );
}

const App= () => {
  return (
    <div className='backg'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studyroom" element={<Studyroom />} /> 
          <Route path="/camera" element={<Camera />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
