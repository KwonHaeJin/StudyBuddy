/* eslint-disable */
import React from 'react';
import '../App.css';
import './Login.css';

const App = () => {
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
            <input className="input-a" type="text" id="username" />
            <div style={{ height: "3vh" }}></div>
            <input className="input-a" type="password" id="password" />
          </div>
        </div>
        </div>
        <div style={{height:"5vh"}}></div>
        <button className="login-button" style={{ color: 'black', display:"flex", justifyContent:"center", alignItems:"center" }}>login</button>
      <button className="signup-button">sign up</button>
    </div>
  );
};

export default App;




