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
          <img src={alarm} alt="" width='20vw' height='20vh'>
          </img>
        </button>
      </div>

      <div className="edit-profile-container">
        <div className="profile-image-section">
          <img src={profImg} alt="Profile" className="edit-profile-image" />
          <button className="change-profile-image-button">change profile image</button>
        </div>

        <div className="edit-field">
          <p className="edit-label" >이름</p>
          <input type="text" value="이우림" style={{ textAlign: "center", height: '2vh'}} className="edit-input" disabled/>
        </div>

        <div className="edit-field">
          <p className="edit-label" >새 이름</p>
          <input type="text" placeholder="입력하세요." className="edit-input" style={{ textAlign: "center", height: '2vh'}} />
        </div>
        <button className="save-button" onClick={handleSaveChanges}>변경 완료</button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
