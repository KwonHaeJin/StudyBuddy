/* eslint-disable */
import '../App.css';
import './feedPage.css';
import React from 'react';
import feedImg from '../images/feedEx.jpeg';
import feedImg2 from '../images/feedImg2.png';
import profImg from '../images/profile2.jpg';
import searchIcon from '../images/search.png';
import pictureAlram from '../images/bell3.png';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../App';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

  const Sample = [
    { profile: feedImg, name: '이우림', id: 'dldnfla', isStudying: true },
    { profile: feedImg2, name: '권해진', id: 'hjji', isStudying: false },
    { profile: feedImg, name: '김수민', id: 'sumin', isStudying: false },
    { profile: feedImg, name: '이우림', id: 'dldnfla', isStudying: true },
    { profile: feedImg2, name: '이우림', id: 'dldnfla', isStudying: true },
    { profile: feedImg2, name: '이우림', id: 'dldnfla', isStudying: true },
  ];

  const [username, setUsername] = useState("");
  const [isStudy, setIsstudy] = useState(false);

  const getUser = async () => {
    try {
        const response = await axios.get(
            `${BaseURL}/users/${localStorage.getItem("id")}`,
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
        if (response.status === 200) {
            setUsername(response.data.username);
            setIsstudy(response.data.isStudy);
            console.log("유저 정보 가져오기 성공", response.data);
        }
    } catch (error) {
      console.error("유저 정보 가져오기 실패");
      console.error("에러 메시지:", error.message);  // 에러 메시지 로그
      console.error("응답 객체:", error.response);    // 전체 응답 객체를 확인

      // 상태 코드 확인 (에러 응답이 있는 경우)
      if (error.response) {
          console.error("상태 코드:", error.response.status); 
          console.error("에러 내용:", error.response.data);  
      }
    }
};

useEffect(() => {
  getUser();
}, []);

  return (
    <div className="main">
      <div style={{ height: "7vh" }}></div>
      <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
        <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '14px' }}>{month},</p>
          <div style={{ width: "2vw" }}></div>
          <p style={{ color: "#FF7A00", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '14px' }}>{day}</p>
        </div>
        <button style={{ position: "absolute", right: "1px", border: "none", backgroundColor: "transparent", transition: "transform 0.2s ease-in-out", }}
          onClick={(e) => {
            e.target.style.transform = "scale(0.9)";  // 버튼 클릭 시 확대 효과
            setTimeout(() => {
              e.target.style.transform = "scale(1)";  // 0.2초 후 원래 크기로 돌아옴
            }, 200);
            navigate('/notification');
          }}>
          <img src={pictureAlram} width='20vw' height='20vh'>
          </img>
        </button>
      </div>
      <input
        type="text"
        className="searchInput"
        placeholder="search"
        style={{
          width: "75vw",
          backgroundImage: `url(${searchIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 2.5vh center',
        }}
      ></input>
      <div className="profileContainer">
        <img
          src={profImg}
          alt="Profile"
          className="profileImage"
        />
        <div style={{ width: "5vw" }}></div>
        <div className="profileTextContainer">
          <p className="profileName">{username}</p>
          <p className="profileUsername">{localStorage.getItem("id")}</p>
          <button className="editProfileButton" onClick={handleEditProfile}>
            edit profile
          </button>
        </div>
      </div>
      <div className="galleryContainer">
        {Sample.map((sample, index) => (
          <img
            key={index}
            src={sample.profile}
            alt="Gallery Item"
            className="galleryImage"
            onClick={() => navigate("/detailFeed")} />
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
