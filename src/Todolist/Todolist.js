import React from 'react';
import '../App.css';
import './Todolist.css';

const Todolist = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
   
    return(
    <div className="main">
        <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: '14px' }}>{month},</p>
            <div style={{ width: "2vw" }}></div>
            <p style={{ color: "#FF7A00", display: "flex", alignItems: "center", fontWeight: "bold", fontSize: '14px' }}>{day}</p>
            </div>
        <p classname = "Weekely">Weekely Notes</p>
        
    </div>
    );
};
export default Todolist;