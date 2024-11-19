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
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
  const [userid, setUserId] = useState("");
  const [isStudy, setIsstudy] = useState(false);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [followingList, setFollowingList] = useState([]);

  // console.log = (message) => {
  //   window.ReactNativeWebView.postMessage(message);
  // };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Enter 키 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getList();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // searchRef가 참조하는 요소 외부를 클릭했는지 확인
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false); // 결과 창 닫기
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getList = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/users/${searchTerm}`,
        {
          'headers': {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
      if (response.status === 200) {
        const userIds = response.data.map((user) => user.userId).filter((userId) => userId !== userid);
        setSearchResults(userIds);
        setShowResults(true);
        console.log("검색 결과 가져오기 성공");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getfollowing = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/followings`,
        {
          'headers': {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
      if (response.status === 200) {
        setFollowingList(response.data);
        console.log("팔로잉 가져오기 성공");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isFollowing = (userId) => {
    return followingList.some(following => following.userId === userId);  // 팔로잉 여부 체크
  };

  const renderFollowButton = (userId) => {
    return isFollowing(userId) ? (
      <button style={{ width: "12vw", height: "3vh", fontSize: "15px", fontFamily: "Basic", backgroundColor: "transparent", border: "none", color: "#FF7A00", marginRight: "6.4vw", fontWeight: "bold" }} onClick={() => handleUnfollow(userId)}>unfollow</button>
    ) : (
      <button style={{ width: "12vw", height: "3vh", fontSize: "15px", fontFamily: "Basic", backgroundColor: "transparent", border: "none", color: "#FF7A00", marginRight: "2vw", fontWeight: "bold" }} onClick={() => handleFollow(userId)}>follow</button>
    );
  };

  const handleUnfollow = (userId) => {
    deleteFollow(userId);
    console.log(`${userId} 언팔로우`);
  };

  const handleFollow = (userId) => {
    postFollow(userId);
    console.log(`${userId} 팔로우`);
  };

  function postFollow(userId) {
    axios.post(
      `${BaseURL}/follow`,
      {
        "followee": userId,
      },
      {
        'headers': {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if (response.status == 201) {
        Swal.fire({
          icon: "success",
          text: "팔로우 성공!",
        });
        console.log('이름 변경 성공');
        getfollowing();
      }
      else {
        Swal.fire({
          icon: "warning",
          text: "팔로우 실패",
        });

        console.log(error.response);
      }
    }).catch((error) => {
      Swal.fire({
        icon: "warning",
        text: "팔로우 실패",
      });
      console.log(error.response);

    });
  }

  function deleteFollow(userId) {
    axios.delete(
      `${BaseURL}/follow/${userId}`,

      {
        'headers': {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          text: "언팔로우 성공!",
        });
        console.log('언팔로우 성공');
        getfollowing();
      }
      else {
        Swal.fire({
          icon: "warning",
          text: "언팔로우 실패",
        });

        console.log(error.response);
      }
    }).catch((error) => {
      Swal.fire({
        icon: "warning",
        text: "언팔로우 실패",
      });
      console.log(error.response);

    });
  }

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/users`,
        {
          'headers': {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
      if (response.status === 200) {
        setUsername(response.data.username);
        setUserId(response.data.userId)
        setIsstudy(response.data.isStudy);
        console.log("유저 정보 가져오기 성공", response.data);
        //window.ReactNativeWebView.postMessage("유저 정보 가져오기 성공: " + JSON.stringify(response.data)); // 성공 메시지 전달
      }
    } catch (error) {
      if (error.response) {
        console.error("응답 오류:", error.response);
        console.log(`${localStorage.getItem('token')}`);
        // window.ReactNativeWebView.postMessage(JSON.stringify({
        //   type: 'USER_DATA',
        //   status: 'failure',
        //   error: `응답 오류: ${error.response.data}`
        // }));
      } else {
        console.log(`${localStorage.getItem('token')}`);

        console.error("네트워크 오류:", error.message);

        // window.ReactNativeWebView.postMessage(JSON.stringify({
        //   type: 'USER_DATA',
        //   status: 'failure',
        //   error: `네트워크 오류: ${error.message}`
        // }));
      }

    }
  };

  useEffect(() => {
    getUser();
    getfollowing();
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
            navigate('/notification');
          }}>
          <img src={pictureAlram} width='25vw' height='25vh'>
          </img>
        </button>
      </div>
      <div style={{ position: 'relative' }} ref={searchRef}>
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
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        ></input>
        {showResults && (
          <div className='scroll-box2'
            style={{
              display: "flex",
              position: 'absolute',
              top: '100%',
              marginLeft: '3vw',
              width: '75vw',
              height: '15vh',
              overflowY: 'auto',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              zIndex: 1000,
              marginTop: '0px',
            }}
          >
            {searchResults.map((userId, index) => (
              <div className="row-content"
                key={index}
                style={{ height: "4.5vh", display: "flex", alignItems: "center", fontSize: "20px", fontFamily: "Basic", borderBottom: "1px solid #eee", justifyContent: "space-between", marginLeft: "2vw", marginRight: "2vw" }}>
                <p style={{ marginLeft: "1vw" }}>
                  {userId !== userid ? userId : null}
                </p>
                {renderFollowButton(userId)}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="profileContainer">
        <img
          src={profImg}
          alt="Profile"
          className="profileImage"
        />
        <div style={{ width: "5vw" }}></div>
        <div className="profileTextContainer">
          <p className="profileName">{username}</p>
          <p className="profileUsername">{userid}</p>
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
