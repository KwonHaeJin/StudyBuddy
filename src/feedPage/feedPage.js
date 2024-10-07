/* eslint-disable */
import '../App.css';
import './feedPage.css';
import React from 'react';
import profImg from '../images/profile2.jpg';
import feedImg from '../images/feedEx.jpeg';
import searchIcon from '../images/search.png';
import alarm from '../images/bell3.png';
import { useNavigate } from 'react-router-dom';


const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

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
          }}>
          <img src={alarm} width='20vw' height='20vh'>
          </img>
        </button>
      </div>
      <input
        type="text"
        className="searchInput"
        placeholder="search"
        style={{
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
        <div style={{width:"5vw"}}></div>
        <div className="profileTextContainer">
          <p className="profileName">이우림</p>
          <p className="profileUsername">dldmfla_</p>
          <button className="editProfileButton" onClick={handleEditProfile}>
            edit profile
          </button>
        </div>
      </div>
      <div className="galleryContainer">
        {[...Array(14)].map((_, index) => (
          <img
            key={index}
            src={feedImg}
            alt="Gallery Item"
            className="galleryImage"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
