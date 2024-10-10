import React from 'react';
import './Signup.css';
import '../feedPage/editProfile.css'
import '../App.css';
import pictureProfile3 from '../images/profile3.png';

const Signup = () => {
  return (
    <div className="main">
      <div style={{ height: "13vh" }}></div>
      <p className="p1" style={{ marginBottom: "1vh" }}>Sign up for</p>
      <div style={{ display: 'flex' }}>
        <div id="dot1" style={{ margin: "0px 0 0 -3.8vh" }}></div><div id="dot2" style={{ margin: "0px 0 0 -3vh" }}></div>
      </div>
      <p className="p1" style={{ marginTop: "0" }}>study BUDDY</p>
      <div style={{ height: "1vh" }}></div>
      <img src={pictureProfile3} style={{ width: "13vh", height: "13vh" }} alt="profile"></img>
      <div style={{ height: "3vh" }}></div>
      <div className="row-content">
        <p className='text-all'>아이디</p>
        <input className="edit-input2" type="text" />
      </div>
      <div className="row-content">
        <p className='text-all'>이름</p>
        <input className="edit-input2" type="text" />
      </div>
      <div className="row-content">
        <p className='text-all'>비밀번호</p>
        <input className="edit-input2" type="password"/>
      </div>
      <div className="row-content">
        <p className='text-all'>재확인</p>
        <input className="edit-input2" type="password" />
      </div>
      <div className="button-group">
        <button type="button" className="cancel">취소</button>
        <div style={{ width: "3vw" }}></div>
        <button type="submit" className="submit">완료</button>
      </div>
    </div>
  );
};

export default Signup;
