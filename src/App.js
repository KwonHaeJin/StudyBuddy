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
import './Login/Login.css';

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

  function Login() {
    axios.post(
      `${BaseURL}/login`,
      { "userId": id, "password": pw},
      {
        'headers': { 
          'Content-Type': 'application/json' }
      }
    ).then((response) => {
      if (response.status == 200) {
        localStorage.setItem("id", id);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
       navigate('/studyroom');
       console.log('로그인 성공');
      }
      else {
        console.log(error.response);
      }
    }).catch((error) => {
      console.log(error.response);
     
    });
  }


  return (
    <div className="main" style={{ display: "flex", justifyContent: "center" }}>
      <div className="study" style={{ marginRight: "30vw", marginBottom: "-6vh" }}>study</div>
      <h1 className="buddy">
        <div className="dots" style={{ display: 'flex' }}>
          <div id="dot1"></div><div id="dot2"></div>
        </div>
        <div className="buddyIn"></div>
        BUDDY
      </h1>
      <div>
        <div className='row-content'>
          <div style={{ width: "18vw" }}>
            <div className="id-text">아이디</div>
            <div style={{ height: "3vh" }}></div>
            <div className="password-text">비밀번호</div>
          </div>
          <div >
            <input className="input-a" type="text" id="username" value={id} onChange={saveUserId}  />
            <div style={{ height: "3vh" }}></div>
            <input className="input-a" type="password" id="password" value={pw} onChange={saveUserPw} />
          </div>
        </div>
        </div>
        <div style={{height:"5vh"}}></div>
        <button className="login-button" style={{ color: 'black', display:"flex", justifyContent:"center", alignItems:"center" }} onClick={() => Login()}>login</button>
      <button className="signup-button" onClick={()=> {navigate('/signup')}}>sign up</button>
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
export const BaseURL = "http://43.202.203.36:3000/api";