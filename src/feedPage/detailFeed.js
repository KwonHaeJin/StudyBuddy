/* eslint-disable */
import '../App.css';
import './detailFeed.css';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 
import feedImg from '../images/feedEx.jpeg';
import searchIcon from '../images/search.png';
import alarm from '../images/bell3.png';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([...Array(2)].map(() => false));

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleFeedClick = () => {
    navigate('/detailFeed');
  };

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
      <div className="header">
        <div className='date-box'>
          <p className="month">{month},</p>
          <p className="day">{day}</p>
        </div>
        <img src={alarm} alt="alarm icon" className="alarmIcon" />
      </div>
      
      <input
        type="text"
        className="searchInput"
        placeholder="search"
        style={{
          backgroundImage: `url(${searchIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
        }}
      />

      <div className="feedContainer">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="feedItem">
            <div className="feedHeader">
              <p className="feedDate">{index === 0 ? `${month}, ${day}` : `April, ${day}`}</p>
            </div>
            <img
              src={feedImg}
              alt="Feed"
              className="feedImage"
              onClick={handleFeedClick}
            />
            <div className="like-container">
              {likes[index] ? (
                <AiFillHeart
                  onClick={() => toggleLike(index)}
                  size={24}
                  style={{ color: 'red', cursor: 'pointer' }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => toggleLike(index)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              )}
              <span>13</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottomNav">
        <button className="navIcon">
          <img src={searchIcon} alt="" />
        </button>
        <button className="navIcon">
          <img src={searchIcon} alt="" />
        </button>
        <button className="navIcon">
          <img src={searchIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
