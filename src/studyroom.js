/* eslint-disable */
import './App.css';
import pictureAlram from './images/bell3.png';
import pictureProfile from './images/profile.png';
import pictureProfile3 from './images/profile3.png';
import pictureStar from './images/star.png';
import pictureUser from './images/user.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseURL } from './App';
import { useNavigate } from 'react-router-dom';

function studyroom() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });

    const [followingList, setFollowingList] = useState([]); // 팔로잉 리스트
    const [allUsers, setAllUsers] = useState([]); // 전체 유저 리스트
    const [favoriteUsers, setFavoriteUsers] = useState([]); // isStudy가 true인 유저
    const [otherUsers, setOtherUsers] = useState([]); // 나머지 유저
    const [selectedUser, setSelectedUser] = useState(null); // 선택된 유저
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태
    const navigate = useNavigate();

    // 팔로잉 리스트 가져오기
    const getFollowing = async () => {
        try {
            const response = await axios.get(`${BaseURL}/followings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setFollowingList(response.data || []); // null 체크
                console.log('팔로잉 가져오기 성공');
            }
        } catch (error) {
            console.error('Error fetching following data:', error);
        }
    };

    // 전체 유저 리스트 가져오기
    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${BaseURL}/allUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setAllUsers(response.data || []); // null 체크
                console.log('전체 유저 가져오기 성공');
            }
        } catch (error) {
            console.error('Error fetching all users:', error);
        }
    };

    // Study With Me 요청 처리
    const handleStudyRequest = (user) => {
        const message = JSON.stringify({
            action: "studyRequest",
            receivedRequestUserId: selectedUser.userId, // 스터디윗미 요청을 받는 유저 
            sendingRequestUserId: localStorage.getItem('id'),
        });

        // React Native WebView로 메시지 전송
        window.ReactNativeWebView?.postMessage(message);
        console.log('Study With Me 요청 전송:', message);
    };


    useEffect(() => {
        // 데이터를 자동으로 갱신하기 위한 주기적 업데이트 설정
        const interval = setInterval(() => {
            getFollowing();
            getAllUsers();
        }, 5000); // 5초마다 업데이트

        // 컴포넌트 언마운트 시 클리어
        return () => clearInterval(interval);
    }, []);

    // 로드 시 데이터 가져오기
    useEffect(() => {
        getFollowing();
        getAllUsers();
    }, []);

    // favoriteUsers와 otherUsers 계산
    useEffect(() => {
        if (Array.isArray(followingList) && Array.isArray(allUsers)) {
            const followingUserIds = new Set(followingList.map((user) => user.userId));
            setFavoriteUsers(followingList.filter((user) => user.isStudy));
            setOtherUsers(
                allUsers.filter((user) => !followingUserIds.has(user.userId))
            );
        }
    }, [followingList, allUsers]);

    return (
        <div className="main" style={{ marginBottom: '2vh' }}>
            <div style={{ height: '7vh' }}></div>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', width: '100%' }}>
                <div className="date-box" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <p style={{ fontWeight: '500', display: 'flex', alignItems: 'center', fontSize: '14px' }}>{month},</p>
                    <div style={{ width: '2vw' }}></div>
                    <p style={{ color: '#FF9500', display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '14px' }}>{day}</p>
                </div>
                <button
                    style={{
                        position: 'absolute',
                        right: '1px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    onClick={(e) => {
                        e.target.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            e.target.style.transform = 'scale(1)';
                        }, 200);
                        navigate('/notification');
                    }}
                >
                    <img src={pictureAlram} width="25vw" height="25vh" />
                </button>
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ height: '4vh' }}></div>
                <div className='row-content' style={{ display: "flex", justifyContent: "flex-start" }}>
                    <p style={{ display: 'flex', alignItems: 'flex-start', fontWeight: "300w", fontFamily: 'Basic', fontSize: '20px', color: '#707070' }}>
                        Who is
                    </p>
                    <p style={{ fontFamily: 'Basic', fontWeight: 'bold', fontSize: '24px', color: '#FF9500', marginLeft: "2.5vw" }}>
                        Studying?
                    </p>
                </div>

                {/* Favorite Users */}
                <div className='row-content' style={{ display: "flex", justifyContent: "flex-start" }}>
                    <img src={pictureStar} style={{ width: "6vw", height: "6vw" }}></img>
                    <p style={{ marginLeft: "1vw", fontFamily: 'Basic', fontSize: '22px', fontWeight: '500', marginBottom: '0.5vh', marginTop: '0.5vh' }}>Favorite</p>
                </div>
                <span style={{ display: 'block', width: '100%', height: '1px', backgroundColor: '#CECECE', margin: '5px auto 0 auto' }}></span>
                <div className="scroll-box">
                    {followingList.map((user, index) => (
                        <button
                            key={index}
                            className="room-friend-box"
                            onClick={() => {
                                if (user.isStudy) {
                                    setSelectedUser(user);
                                    setShowPopup(true);
                                }
                            }}
                        >
                            <div style={{ width: '1vh' }}></div>
                            <img
                                src={user.profileImage ? user.profileImage : pictureProfile3} // 조건 추가
                                style={{
                                    width: '9vw',
                                    height: '9vw',
                                    borderRadius: '50%',
                                    marginRight: '2vh',
                                    border: '1px solid #707070',
                                }}
                                alt="프로필"
                            />
                            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', width: "39vw" }}>

                                <p style={{ margin: '-2px', fontFamily: 'Basic', fontWeight: 'bold', marginTop: '0.2vh', fontSize: '16px' }}>{user.username}</p>
                                <p style={{ margin: '0', fontFamily: 'Basic', fontSize: '12px' }}>{user.userId}</p>
                            </div>
                            <div>
                                <p
                                    style={{
                                        color: user.isStudy ? '#2EC316' : '#D0D7CF',
                                        fontFamily: 'Basic',
                                        fontWeight: '400',
                                        fontSize: '15px',
                                    }}
                                >
                                    {user.isStudy ? 'studying...' : 'studying...'}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Other Users */}
                <div className='row-content' style={{ display: "flex", justifyContent: "flex-start" }}>
                    <img src={pictureUser} style={{ width: "6vw", height: "6vw" }}></img>
                    <p style={{ marginLeft: "1vw", fontFamily: 'Basic', fontSize: '22px', fontWeight: '500', marginBottom: '0.5vh', marginTop: '0.5vh' }}>Other User</p>
                </div>
                <span style={{ display: 'block', width: '100%', height: '1px', backgroundColor: '#CECECE', margin: '5px auto 0 auto' }}></span>
                {otherUsers.map((user, index) => (
                    <button
                        key={index}
                        className="room-friend-box"
                        onClick={() => {
                            if (user.isStudy) {
                                setSelectedUser(user);
                                setShowPopup(true);
                            }
                        }}
                    >
                        <div style={{ width: '1vh' }}></div>
                        <img
                                src={user.profileImage ? user.profileImage : pictureProfile3} // 조건 추가
                                style={{
                                    width: '9vw',
                                    height: '9vw',
                                    borderRadius: '50%',
                                    marginRight: '2vh',
                                    border: '1px solid #707070',
                                }}
                                alt="프로필"
                            />

                        <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', width: "39vw" }}>

                            <p style={{ margin: '-2px', fontFamily: 'Basic', fontWeight: '500', marginTop: '0.2vh', fontSize: '16px' }}>{user.username}</p>
                            <p style={{ margin: '0', fontFamily: 'Basic', fontSize: '12px', fontWeight: '400' }}>{user.userId}</p>
                        </div>
                        <p
                            style={{
                                color: user.isStudy ? '#2EC316' : '#D0D7CF',
                                fontFamily: 'Basic',
                                fontWeight: '400',
                                fontSize: '15px',

                            }}
                        >
                            {user.isStudy ? 'studying...' : 'studying...'}
                        </p>
                    </button>
                ))}
            </div>

            {/* Popup */}
            <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
            {showPopup && selectedUser && (
                <div className={`popup ${showPopup ? 'active' : ''}`}>
                    <div className="popup-content">
                        <p style={{ marginBottom: '0', color: "#FF7A00" }}>[STUDY with ME]</p>
                        <p style={{ marginTop: '0' }}>를 신청하시겠습니까?</p>
                        <div className="row-content">
                            <button
                                className="round-button"
                                style={{ backgroundColor: '#FFFFFF', color: 'black', fontSize: '12px' }}
                                onClick={() => setShowPopup(false)}
                            >
                                취소
                            </button>
                            <div style={{ width: '1.5vh' }}></div>
                            <button
                                className="round-button-orange"
                                style={{ backgroundColor: '#FF9500', color: 'white', fontSize: '12px' }}
                                onClick={handleStudyRequest}
                            >
                                네
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default studyroom;
