import '../App.css';
import './feedPage.css';
import React from 'react';
import profImg from '../images/profile.png';
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
    <div className="container">
      {/* 헤더 부분 */}
      <div className="header">
        <div className="date-box">
          <p className="month">{month},</p>
          <p className="day">{day}</p>
        </div>
        <img src={alarm} alt="Alarm Icon" className="alarmIcon" />
      </div>

      {/* 검색바 */}
      <div className="searchContainer">
        <input 
          type="text" 
          className="searchInput" 
          placeholder="search"
        />
        <img 
          src={searchIcon} 
          alt="Search Icon" 
          className="searchIcon"
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
          <button className="editProfileButton" onClick={handleEditProfile}>
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
