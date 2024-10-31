/* eslint-disable */
import React from 'react';
import '../App.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const App = () => {
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
      'http://43.202.203.36:3000/api/login',
      { 
        "userId": id, 
        "password": pw
      },
      {
        'headers': { 
          'accept': 'application/json',
          'Content-Type': 'application/json' }
      }
    ).then((response) => {
      if (response.status == 200) {
       
      }
      else {
        console.log(id);
        console.log(pw);
        console.log(error.response);
      }
    }).catch((error) => {
      console.log(id);
      console.log(pw);
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
};

export default App;




