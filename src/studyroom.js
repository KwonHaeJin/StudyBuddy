/* eslint-disable */
import './App.css';
import pictureAlram from './images/alram.png';

function studyroom() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    return (
        <div className="main">
            <div style={{ height: "7vh" }}></div>
            <div style={{ display: "flex", position: "relative", alignItems: "center", width: "100%" }}>
                <div className='date-box' style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>{month},</p>
                    <div style={{ width: "2vw" }}></div>
                    <p style={{ color: "#FF7A00", display: "flex", alignItems: "center" }}>{day}</p>
                </div>
                <img src={pictureAlram} width='20vw' height='20vh' style={{ position: "absolute", right: "0" }} />
            </div>
            <div style={{width:"100%"}}>
                <p style={{ display: "flex", alignItems: "flex-start", fontFamily: "Basic", fontWeight: "bold", fontSize: "28px", marginBottom:"1vh", color:"#FF7A00"}}>
                    Who is
                </p>
                <p style={{ fontFamily: "Basic", fontWeight: "bold", fontSize: "28px",color:"#FF7A00", margin:"0" }}>
                    Studying
                </p>
                <p style={{fontFamily:"Basic", fontSize:"22px", fontWeight:"bold", marginBottom:"1vh"}}>
                    favorite
                </p>
                <span style={{ display: "block", width: "100%", height: "1px", backgroundColor: "#CECECE", margin: "5px auto 0 auto" }}></span>
            </div>
            
        </div>
    );
}

export default studyroom;
