/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import '../feedPage/editProfile.css'
import '../App.css';
import axios from 'axios';
import { BaseURL } from '../App';
import Swal from 'sweetalert2';
import pictureProfile3 from '../images/profile3.png';
import picturestudy from '../images/title_study.png';
import picturebuddy from '../images/title_buddy.png';

const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [repw, setRepw] = useState('');
  const [name, setName] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState("");

  const saveUserId = event => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    console.log(event.target.value);
  };

  const saveUserRepw = event => {
    setRepw(event.target.value);
    console.log(event.target.value);
  };

  const saveUserName = event => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (repw && pw != repw) {
      setIsPasswordMatch("비밀번호가 일치하지 않습니다.");
    } else {
      setIsPasswordMatch("");
    }
  }, [pw, repw]);

  function createUser() {
    if (!id || !pw || !repw || !name) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "모든 항목을 입력해주세요!",
      });
    } else if (pw !== repw) {
      Swal.fire({
        icon: "warning",
        title: "회원가입 실패",
        text: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      axios.post(
        `${BaseURL}/signup`,
        { "userId": id, "password": pw, "username": name },
        {
          'headers': { 'Content-Type': 'application/json' }
        }
      ).then((response) => {
        if (response.status == 201) {
          Swal.fire({
            icon: "success",
            title: "회원가입 성공!",
            text: "로그인 해주세요!",
          });
          navigate("/");
          console.log("회원가입 성공");
        }
        else {
          Swal.fire({
            icon: "warning",
            title: "회원가입 실패",
          });
        }
      }).catch((error) => {
        console.log(error.response);
        Swal.fire({
          icon: "warning",
          title: "회원가입 실패",
        });
      });
    }
  };

  return (
    <div className="main">
      <div style={{ height: "11vh" }}></div>
      <p style={{ color:"#8F8F8F", fontSize:"20px",marginBottom: "1vh", marginRight:"30vw", marginBottom:"1vh" }}>Sign up for</p>
    <img src={picturestudy} style={{width:"25vw", height:"4vh", marginRight:"32vw", marginBottom:"0.5vh"}}></img>
    <img src={picturebuddy} style={{width:"45vw", height:"4.5vh"}}></img>
      <div style={{ height: "3vh" }}></div>
      <img src={pictureProfile3} style={{ width: "13vh", height: "13vh" }} alt="profile"></img>
      <div style={{ height: "3vh" }}></div>
      <div className="row-content" style={{marginBottom:-5}}>
        <p className='text-all'>아이디</p>
        <input className="edit-input2" type="text" value={id} onChange={saveUserId} />
      </div>
      <div className="row-content" style={{marginBottom:-5}}>
        <p className='text-all'>이름</p>
        <input className="edit-input2" type="text" value={name} onChange={saveUserName} />
      </div>
      <div className="row-content" style={{marginBottom:-5}}>
        <p className='text-all'>비밀번호</p>
        <input className="edit-input2" type="password" value={pw} onChange={saveUserPw} />
      </div>
      <div className="row-content">
        <p className='text-all'>비밀번호 확인</p>
        <input className="edit-input2" type="password" value={repw} onChange={saveUserRepw} />
        {isPasswordMatch && (
          <p style={{ color: 'red', fontSize: '10px' }}>{isPasswordMatch}</p>
        )}
      </div>
      <div className="button-group">
        <button type="button" className="cancel" onClick={() => { navigate(-1); }}>취소</button>
        <div style={{ width: "3vw" }}></div>
        <button type="submit" className="submit" onClick={() => { createUser() }}>완료</button>
      </div>
    </div>
  );
};

export default Signup;
