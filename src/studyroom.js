/* eslint-disable */
import './App.css';
import pictureAlram from './images/bell3.png';
import pictureProfile from './images/profile.png';
import pictureProfile2 from './images/profile2.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function studyroom() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });

    const Sample = [
        { profile: pictureProfile, name: '이우림', id: 'dldnfla', isStudying: true },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile, name: '김수민', id: 'sumin', isStudying: false },
        { profile: pictureProfile, name: '이우림', id: 'dldnfla', isStudying: true },
        { profile: pictureProfile, name: '이우림', id: 'dldnfla', isStudying: true },
        { profile: pictureProfile, name: '이우림', id: 'dldnfla', isStudying: true },

    ];

    const Sample2 = [
        { profile: pictureProfile, name: '이우림', id: 'dldnfla', isStudying: true },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile, name: '김수민', id: 'sumin', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: true },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },
        { profile: pictureProfile2, name: '권해진', id: 'hjji', isStudying: false },

    ];
    const [showPopup, setShowPopup] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleXButtonClick = () => {
        setShowPopup(false);

    };

    return (
        <div className="main" style={{marginBottom:"2vh"}}>
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
                    navigate('/notification');
                }}>
                    <img src={pictureAlram} width='20vw' height='20vh'>
                    </img>
                </button>
            </div>
            <div style={{ width: "100%" }}>
                <div style={{ height: "1.2vh" }}></div>
                <p style={{ display: "flex", alignItems: "flex-start", fontFamily: "Basic", fontWeight: "bold", fontSize: "28px", marginBottom: "0", color: "#FF7A00" }}>
                    Who is
                </p>
                <p style={{ fontFamily: "Basic", fontWeight: "bold", fontSize: "28px", color: "#FF7A00", margin: "0" }}>
                    Studying
                </p>
                <p style={{ fontFamily: "Basic", fontSize: "22px", fontWeight: "bold", marginBottom: "0.5vh", marginTop: "0.5vh" }}>
                    favorite
                </p>
                <span style={{ display: "block", width: "100%", height: "1px", backgroundColor: "#CECECE", margin: "5px auto 0 auto" }}></span>
                <div className='scroll-box'>
                    {Sample.map((sample, index) => (
                        <button key={index} onClick={handleButtonClick} className='room-friend-box'>
                            <div style={{ width: "1.3vh" }}></div>
                            <img src={sample.profile} style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                marginRight: '2vh',
                            }}></img>
                            <div style={{ display: "flex", textAlign: "left", flexDirection: "column" }}>
                                <p style={{ margin: "-2px", fontFamily: "Basic", fontWeight: "bold", marginTop: "0.2vh", fontSize: "16px" }}>{sample.name}</p>
                                <p style={{ margin: "0", fontFamily: "Basic", fontSize: "12px", }}>{sample.id}</p>
                            </div>
                            <div style={{ width: "57%", display: "flex", justifyContent: "flex-end" }}>
                                <p style={{ color: sample.isStudying ? '#2EC316' : '#D0D7CF', fontFamily: "Basic", fontWeight: "bold", fontSize: "15px" }}>studying...</p>
                            </div>
                        </button>
                    ))}
                    <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
                    {showPopup && (
                        <div className={`popup ${isExiting ? 'exiting' : ''}`}>
                            <div className="popup-content">
                                <p style={{ marginBottom: "0" }}>study with me</p>
                                <p style={{ marginTop: "0" }}>를 신청하시겠습니까?</p>
                                <div className='row-content'>
                                    <button className="round-button" style={{ backgroundColor: "#FFFFFF", color: "black", fontSize: "12px" }} onClick={handleXButtonClick}>취소</button>
                                    <div style={{ width: "1.5vh" }}></div>
                                    <button className="round-button-orange" style={{ backgroundColor: "#FF7A00", color: "white", fontSize: "12px" }}>네</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <p style={{ fontFamily: "Basic", fontSize: "22px", fontWeight: "bold", marginBottom: "1vh" }}>
                    other user
                </p>
                <span style={{ display: "block", width: "100%", height: "1px", backgroundColor: "#CECECE", margin: "5px auto 0 auto" }}></span>
                {Sample2.map((sample, index) => (
                    <button key={index} onClick={handleButtonClick} className='room-friend-box'>
                        <div style={{ width: "1.3vh" }}></div>
                        <img src={sample.profile} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            marginRight: '2vh',
                        }}></img>
                        <div style={{ display: "flex", textAlign: "left", flexDirection: "column" }}>
                            <p style={{ margin: "-2px", fontFamily: "Basic", fontWeight: "bold", marginTop: "0.2vh", fontSize: "16px" }}>{sample.name}</p>
                            <p style={{ margin: "0", fontFamily: "Basic", fontSize: "12px" }}>{sample.id}</p>
                        </div>
                        <div style={{ width: "57%", display: "flex", justifyContent: "flex-end" }}>
                            <p style={{ color: sample.isStudying ? '#2EC316' : '#D0D7CF', fontFamily: "Basic", fontWeight: "bold", fontSize: "15px" }}>studying...</p>
                        </div>
                    </button>
                ))}
                <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
                {showPopup && (
                    <div className={`popup ${isExiting ? 'exiting' : ''}`}>
                        <div className="popup-content">
                            <p style={{ marginBottom: "0", fontSize: "15px", textShadow: "none" }}>study with me</p>
                            <p style={{ marginTop: "0", fontSize: "15px" }}>를 신청하시겠습니까?</p>
                            <div className='row-content'>
                                <button className="round-button" style={{ backgroundColor: "#FFFFFF", color: "black", fontSize: "12px" }} onClick={handleXButtonClick}>취소</button>
                                <div style={{ width: "1.5vh" }}></div>
                                <button className="round-button-orange" style={{ backgroundColor: "#FF7A00", color: "white", fontSize: "12px" }}>네</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default studyroom;
