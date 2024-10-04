import React from 'react';
import '../App.css'; 
import './Login.css';

const App = () => {
  return (
    <div className="container">
      <h1 className="title">
        <div className="study">study</div>
      </h1>
      
      <h1 className="buddy">
      <div className="dots" style={{ display: 'flex' }}>
        <div id="dot1"></div><div id="dot2"></div>
      </div>
        <div className="buddyIn"></div>
        BUDDY
      </h1>
      
      <div className="form">
        <div className="input-form">
          <div className="id-text">아이디</div>
          <div className="input-group">
            <input type="text" id="username" />
          </div>
        </div>
        <div className="input-group">
          <div className="password-text">비밀번호</div>
          <input type="password" id="password" />
        </div>
        <button className="login-button" style={{ color: 'black' }}>login</button>
      </div>
      <button className="signup-button">sign up</button>
    </div>
  );
};

export default App; 




