/* eslint-disable */
import './App.css';
import Studyroom from './studyroom';
import Camera from './camera';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Feed from './feedPage/feedPage';
import Profile from './feedPage/editProfile';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // 뷰포트 높이를 계산하여 --vh 변수 설정
  useEffect(() => {
    const setVhVariable = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVhVariable();

    window.addEventListener("resize", setVhVariable);
    return () => window.removeEventListener("resize", setVhVariable);
  }, []);

  return (
    <div className="App">
      
        <button onClick={() => navigate("/studyroom")}>
          스터디룸으로
        </button>
        <button onClick={() => navigate("/camera")}>
          카메라로
        </button>
       
      
    </div>
  );
}

const App = () => {
  return (
    <div className='backg'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studyroom" element={<Studyroom />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
