import '../App.css';
import './feedPage.css';
import React from 'react';
import profImg from '../images/profile.png';
import feedImg from '../images/feedEx.jpeg';

const ProfileScreen = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

  return (
    <div className="container">
      {/* 헤더 부분 */}
      <div className="header">
        <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '14px' }}>{month},</p>
          <div style={{ width: "2vw" }}></div>
          <p style={{ color: "#FF7A00", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '14px' }}>{day}</p>
        </div>
        <button className="notificationIcon">
          {/* 알림 아이콘 정의하기! */}
        </button>
      </div>

      {/* 검색바 */}
      <div className="searchContainer">
        <input 
          type="text" 
          className="searchInput" 
          placeholder="search"
        />
      </div>

      {/* 프로필 넣는 부분 */}
      <div className="profileContainer">
        <img 
          src={profImg}
          alt="Profile"
          className="profileImage"
        />
        <div className="profileTextContainer">
          <h3 className="profileName">이우림</h3>
          <p className="profileUsername">dldmfla_</p>
          <button className="editProfileButton">
            edit profile
          </button>
        </div>
      </div>

      {/* 여기는 피드 갤러리 */}
      <div className="galleryContainer">
        {[...Array(9)].map((_, index) => (
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
