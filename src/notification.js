/* eslint-disable */
import './App.css';
import pictureUturn from './images/uturn.png';
import pictureProfile from './images/profile.png';
import pictureProfile2 from './images/profile2.jpg';
import pictureHeart from './images/heart.png';
import { useState } from 'react';
import pictureAlram from './images/bell3.png';
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
                <button style={{ position: "absolute", left: "1px", border: "none", backgroundColor: "transparent" }} onClick={() => { navigate(-1); }}>
                    <img src={pictureUturn} width='20vw' height='20vh'>
                    </img>
                </button>
                <div className="date-box" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <p style={{ fontWeight: '500', display: 'flex', alignItems: 'center', fontSize: '14px' }}>{month},</p>
                    <div style={{ width: '2vw' }}></div>
                    <p style={{ color: '#FF9500', display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '14px' }}>{day}</p>
                </div>
            </div>
            <div style={{ height: "4vh" }}></div>

            <div className="row-content" style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "0.2vh", marginTop: "1.5vh" }}>
                <img src={pictureAlram} style={{ width: "6vw", height: "6vw" }}></img>
                <p style={{ fontFamily: "Basic", fontWeight: "bold", fontSize: "20px", marginLeft: "3vw", color: "#707070" }}>
                    Notification
                </p>
            </div>
            {Sample.map((sample, index) => (
                <div key={index} className='notification-box' >
                    <img src={pictureHeart} style={{width:"6vw", height:"6vw", marginRight:"1vw"}}></img>
                    <p style={{ fontFamily: "Basic", fontSize: "15px", fontWeight: "bold" }}>{sample.id}님이 좋아요를 누르셨습니다.</p>
                </div>
            ))}

        </div>


    );
}

export default notification;
