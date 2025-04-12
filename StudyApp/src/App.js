/* eslint-disable */
import './App.css';
import Studyroom from './studyroom';
import Camera from './camera';
import Notification from './notification';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Feed from './feedPage/feedPage';
import Profile from './feedPage/editProfile';
import Todolist from './Todolist/Todolist';
import DetailFeed from './feedPage/detailFeed';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login/Login.css';
import picturestudy from './images/title_study.png';
import picturebuddy from './images/title_buddy.png';

const Home = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const saveUserId = event => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    console.log(event.target.value);
  };


  // Study With Me 요청 처리
  const sendingToken = () => {
    const message = JSON.stringify({
      token: localStorage.getItem("token")
    });

    // React Native WebView로 메시지 전송
    window.ReactNativeWebView?.postMessage(message);
    console.log('Study With Me 요청 전송:', message);
  };


  function Login() {
    axios.post(
      `${BaseURL}/login`,
      { "userId": id, "password": pw },
      {
        'headers': {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if (response.status == 200) {
        localStorage.setItem("id", id);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
        sendingToken();
        console.log('로그인 성공');
      }
      else {
        console.log(error.response);
        Swal.fire({
          icon: "warning",
          text: "로그인 실패",
        });
      }
    }).catch((error) => {
      console.log(error.response);
      Swal.fire({
        icon: "warning",
        text: "로그인 실패",
      });
    });
  }


  return (
    <div className="main" style={{ display: "flex", justifyContent: "center" }}>
      <img src={picturestudy} style={{width:"20vw", height:"3vh", marginRight:"40vw", marginBottom:"1vh"}}></img>
      <img src={picturebuddy} style={{width:"55vw", height:"5.5vh"}}></img>
      <div style={{height:"13vh"}}></div>
      <div>
        <div className='row-content'>
          <div style={{ width: "14vw" }}>
            <div className="texts">아이디</div>
            <div style={{ height: "3vh" }}></div>
            <div className="texts">비밀번호</div>
          </div>
          <div >
            <input type="text" id="username" value={id} onChange={saveUserId} />
            <div style={{ height: "1vh" }}></div>
            <input type="password" id="password" value={pw} onChange={saveUserPw} />
          </div>
        </div>
      </div>
      <div style={{ height: "10vh" }}></div>
      <button className="login-button" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => Login()}>login</button>
      <span style={{ display: 'block', width: '100%', height: '0.5px', backgroundColor: '#D0D7CF', margin: '3vh' }}></span>
      <button className="signup-button" onClick={() => { navigate('/signup') }}>sign up</button>
    </div>
  );
}

const App = () => {
  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studyroom" element={<Studyroom />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detailFeed" element={<DetailFeed />} />
          <Route path="/todolist" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const BaseURL = "http://15.164.74.145:3000/api";