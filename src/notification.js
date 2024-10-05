/* eslint-disable */
import './App.css';
import pictureUturn from './images/uturn.png';
import pictureProfile from './images/profile.png';
import pictureProfile2 from './images/profile2.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function notification() {
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

    const navigate = useNavigate();
    return (
        <div className="main">
            <div style={{ height: "7vh" }}></div>
            <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
                <button style={{ position: "absolute", left: "1px", border: "none", backgroundColor: "transparent" }} onClick={() => { navigate('/studyroom'); }}>
                    <img src={pictureUturn} width='20vw' height='20vh'>
                    </img>
                </button>
                <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '14px' }}>{month},</p>
                    <div style={{ width: "2vw" }}></div>
                    <p style={{ color: "#FF7A00", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '14px' }}>{day}</p>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <div style={{ height: "1.2vh" }}></div>
                <p style={{ display: "flex", alignItems: "flex-start", fontFamily: "Basic", fontWeight: "bold", fontSize: "28px", marginBottom: "0", color: "#FF7A00" }}>
                    Notification
                </p>
                <div style={{ height: "2vh" }}></div>
                {Sample.map((sample, index) => (
                    <div key={index} className='notification-box' >
                        <p style={{ fontFamily: "Basic", fontSize: "15px", fontWeight: "bold"}}>{sample.id}님이 좋아요를 누르셨습니다.</p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default notification;
