/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../App.css';
import './editProfile.css';
import profImg from '../images/profile.png';
import alarm from '../images/bell3.png';
import picturePen from '../images/pencil.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BaseURL } from '../App';
import Swal from 'sweetalert2';

const EditProfileScreen = () => {
  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    await changeName();
    await navigate('/feed');
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const [username, setUsername] = useState("");
  const [newusername, setnewUsername] = useState("");
  const [isStudy, setIsstudy] = useState(false);
  const [file, setFile] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(profImg);

  useEffect(() => {
    getUser();
    getProfileImgUrl(); // 프로필 이미지 로드
  }, []);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };
  const saveName = event => {
    setnewUsername(event.target.value);
    console.log(event.target.value);
  };
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/users`,
        {
          'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        });
      if (response.status === 200) {
        setUsername(response.data.username);
        setIsstudy(response.data.isStudy);
        setProfileImgUrl(response.data.profileImage);
        console.log("유저 정보 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("유저 정보 가져오기 실패");
      console.error("에러 메시지:", error.message);  // 에러 메시지 로그
      console.error("응답 객체:", error.response);    // 전체 응답 객체를 확인

      if (error.response) {
        console.error("상태 코드:", error.response.status);
        console.error("에러 내용:", error.response.data);
      }
    }

  };

  const getProfileImgUrl = async () => {
    try {
      const response = await axios.get(`${BaseURL}/profileImage`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setProfileImgUrl(response.data.imageUrl);
        console.log('Fetched profile image URL:', response.data.imageUrl);
      }
    } catch (error) {
      console.error('Failed to fetch profile image URL:', error.response);
    }
  };


  const uploadProfileImg = async () => {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        text: '파일을 선택해주세요!',
      });
      return;
    }

    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const response = await axios.post(`${BaseURL}/profileImage`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          text: '프로필 사진 업로드 성공!',
        });
        setProfileImgUrl(response.data.imageUrl); // 업로드된 URL 반영
        console.log('Uploaded image URL:', response.data.imageUrl);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '프로필 사진 업로드 실패!',
      });
      console.error('Failed to upload profile image:', error.response || error.message);
    }
  };




  const changeName = async () => {
    try {
      const response = await axios.put(
        `${BaseURL}/users/${localStorage.getItem("id")}`,
        {
          "username": newusername,
          "isStudy": isStudy,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "변경 성공!",
        });
        console.log('이름 변경 성공');
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "변경 실패",
      });
      console.error(error.response);
    }
  };

  const openFilePicker = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="main">
      <div style={{ height: "7vh" }}></div>
      <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
        <div className="date-box" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <p style={{ fontWeight: '500', display: 'flex', alignItems: 'center', fontSize: '14px' }}>{month},</p>
          <div style={{ width: '2vw' }}></div>
          <p style={{ color: '#FF9500', display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '14px' }}>{day}</p>
        </div>
        <button style={{ position: "absolute", right: "1px", border: "none", backgroundColor: "transparent", transition: "transform 0.2s ease-in-out", }}
          onClick={(e) => {
            e.target.style.transform = "scale(0.9)";  // 버튼 클릭 시 확대 효과
            setTimeout(() => {
              e.target.style.transform = "scale(1)";  // 0.2초 후 원래 크기로 돌아옴
            }, 200);
          }}>
          <img src={alarm} width='25vw' height='25vh'>
          </img>
        </button>
      </div>
      <div className="edit-profile-container">
        <div style={{ height: "5vh" }}></div>
        <div className="profile-image-section" style={{ width: "35vw", height: "35vw" }}>
          <div>
            <img
              src={profileImgUrl || profImg}
              alt="Profile"
              className="edit-profile-image"
              onClick={openFilePicker} // 이미지 클릭 시 파일 선택창 열림
              style={{ cursor: 'pointer' }}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <button className="change-profile-image-button" style={{
            position: 'absolute',
            top: "29vh",
            right: '33.8vw',
            zIndex: '10',
          }}>
            <img src={picturePen} onClick={uploadProfileImg} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "4.4vw", height: "4.3vw" }}></img>
          </button>
        </div>
        <div className="edit-field">
          <p className="edit-label" >이름</p>
          <input type="text" value={username} style={{ textAlign: "center", height: '3.2vh' }} className="edit-input" disabled />
        </div>
        <div className="edit-field">
          <p className="edit-label" >새 이름</p>
          <input type="text" placeholder="입력하세요." className="edit-input" onChange={saveName} style={{ textAlign: "center", height: '3.2vh', fontSize: "14px", color: "black" }} />
        </div>
        <button className="save-button" onClick={handleSaveChanges}>변경 완료</button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
