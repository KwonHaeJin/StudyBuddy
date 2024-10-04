import React from 'react';
import '../App.css';
import './editProfile.css';
import profImg from '../images/profile.png';
import alarm from '../images/bell3.png';
import { useNavigate } from 'react-router-dom';

const EditProfileScreen = () => {
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    navigate('/feed');
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

  return (
    <div className="container">
      <div className="header">
        <div className="date-box">
          <p className="month">{month},</p>
          <p className="day">{day}</p>
        </div>
        <img src={alarm} alt="Alarm Icon" className="alarmIcon" />
      </div>

      <div className="edit-profile-container">
        <div className="profile-image-section">
          <img src={profImg} alt="Profile" className="edit-profile-image" />
          <button className="change-profile-image-button">change profile image</button>
        </div>
        
        <div className="edit-field">
          <label className="edit-label">이름</label>
          <input type="text" placeholder="dldmfla_" className="edit-input" />
        </div>
        
        <div className="edit-field">
          <label className="edit-label">새 이름</label>
          <input type="text" placeholder="입력하세요." className="edit-input" />
        </div>
        
        <button className="save-button" onClick={handleSaveChanges}>변경 완료</button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
