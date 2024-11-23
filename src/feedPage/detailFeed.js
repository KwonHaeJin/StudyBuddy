/* eslint-disable */
import '../App.css';
import './detailFeed.css';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import feedImg from '../images/feedEx.jpeg';
import feedImg2 from '../images/feedImg2.png';
import searchIcon from '../images/search.png';
import pictureUturn from '../images/uturn.png';
import pictureAlram from '../images/bell.png';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([...Array(2)].map(() => false));

  const Sample = [
    { profile: feedImg, month: "October", day: "10", like: "13" },
    { profile: feedImg, month: "October", day: "5", like: "2" },
    { profile: feedImg2, month: "September", day: "22", like: "22" },
    { profile: feedImg2, month: "September", day: "10", like: "50" },
    { profile: feedImg, month: "September", day: "2", like: "1" },
    { profile: feedImg, month: "September", day: "2", like: "1" },
    { profile: feedImg, month: "September", day: "2", like: "1" },
    { profile: feedImg, month: "September", day: "2", like: "1" },
    { profile: feedImg, month: "September", day: "2", like: "1" },
    { profile: feedImg, month: "September", day: "2", like: "1" },

  ];
  const toggleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });

  return (
    <div className="main">
      <div style={{ height: "7vh" }}></div>
      <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
        <button style={{ position: "absolute", left: "1px", border: "none", backgroundColor: "transparent" }} onClick={() => { navigate(-1); }}>
          <img src={pictureUturn} width='20vw' height='20vh'>
          </img>
        </button>
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
            navigate('/notification');
          }}>
          <img src={pictureAlram} width='25vw' height='25vh'>
          </img>
        </button>
      </div>
      <div style={{ height: "2vh" }}></div>
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
      />
      {/* feed 리스트 시작 */}
      <div style={{ height: "2.5vh" }}></div>
      <div className="feedContainer">
        {Sample.map((sample, index) => (
          <div key={index} className="feedItem">
            <div className='feedDate' style={{display:"flex", justifyContent:"flex-start"}}>
              <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '16px', marginTop: "0", marginBottom: "0", marginLeft:"2vw" }}>{sample.month},</p>
              <div style={{ width: "1vw" }}></div>
              <p style={{ color: "#FF9500", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '16px', marginTop: "0", marginBottom: "0" }}>{sample.day}</p>
            </div>
            <div className='feedImage'>
              <img className='Image'
                src={sample.profile}
                height="100%"
              />
            </div>
            <div className="like-container">
              {likes[index] ? (
                <AiFillHeart
                  onClick={() => toggleLike(index)}
                  size={20}
                  style={{ color: 'red', cursor: 'pointer',  }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => toggleLike(index)}
                  size={20}
                  style={{ cursor: 'pointer',  }}
                />
              )}
              <p style={{ fontFamily: "Basic", fontSize: "16px" }}>{sample.like}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
