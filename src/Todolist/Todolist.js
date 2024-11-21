/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLongPress } from 'use-long-press';
import pictureAlram from '../images/bell3.png';
import iconImg from '../images/todoicon.png';
import iconImg2 from '../images/todoicon2.png';
import iconImg3 from '../images/todoicon3.png';
import iconImg4 from '../images/todoicon4.png';
import iconImg5 from '../images/todoicon5.png';
import iconImg12 from '../images/todoicon6.png';
import iconImg7 from '../images/todoicon7.png';
import iconImg8 from '../images/todoicon8.png';
import iconImg9 from '../images/todoicon9.png';
import iconImg10 from '../images/todoicon10.png';
import iconImg11 from '../images/todoicon11.png';
import iconImg6 from '../images/plusicon.png';
import pirctureNote from '../images/edit.png';
import pirctureClipbo from '../images/clipboard.png';
import etc from '../images/etc.png';
import '../App.css';
import './Todolist.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BaseURL } from '../App';

const Todolist = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const navigate = useNavigate();
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showDPopup, setDShowPopup] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isExiting2, setIsExiting2] = useState(false);
    const [longPressTimeout, setLongPressTimeout] = useState(null);
    const [Todolist, setTodolist] = useState([]);
    const [oneTodolist, setoneTodolist] = useState(null);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleXButtonClick = () => {
        setShowPopup(false);
setDShowPopup(false);
    };

    const handleDelteButton = () => {
        setDShowPopup(false);
    };

    const saveNote = event => {
        setNote(event.target.value);
        localStorage.setItem("note", event.target.value);
        console.log(event.target.value);
    };
    const saveTitle = event => {
        setTitle(event.target.value);
        console.log(event.target.value);
    };
    const saveContent = event => {
        setContent(event.target.value);
        console.log(event.target.value);
    };

    const colors = ["#B3E4C7", "#9BC6DB", "#F4C2C2", "#FACE92", "#EFEEEE"];
    const icons = [iconImg, iconImg2, iconImg3, iconImg4, iconImg5, iconImg7,iconImg8, iconImg9, iconImg10, iconImg11, iconImg12];

    const handleCheckboxChange = (id) => {
        checkTodo(id);
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 엔터 키의 기본 동작을 방지 (폼 제출 등)
            specificFunction(); // 엔터를 눌렀을 때 실행할 함수
        }
    };
    const specificFunction = () => {
        putNote();
    };

    const bind = async (task) => {
        try {
            await getOneTodo(task.id);
            setDShowPopup(true);
        } catch (error) {
            console.error('특정 todo 클릭 실패', error);
        }
    };

    const checkTodo = async (task) => {
        const URL = `${BaseURL}/todos/${task.id}`;
        try {
            const response = await axios.put(
                URL,
                {
                    "title": task.title,
                    "contents": task.contents,
                    "isCheck": !task.isCheck  // 체크 상태를 반전
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
                    text: "todo 체크 변경 성공!",
                });
                getTodo(); // 전체 목록을 다시 불러오는 함수
                console.log('체크박스 변경 성공');
            }
        } catch (error) {
            Swal.fire({
                icon: "warning",
                text: "Todo 체크 실패",
            });
            console.error(error.response);
        }
    };

    const checkboxf = async (task) => {
        try {
            await checkTodo(task);  // 바로 체크 상태 변경
        } catch (error) {
            console.error('투두 체크 실패', error);
        }
    };


    const putNote = async () => {
        try {
            const response = await axios.put(
                `${BaseURL}/users/${localStorage.getItem("id")}/weeklyNote`, { weeklyNote: note },
                {
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: "작성 성공!",
                });
                getUser();
            }
        } catch (error) {
            console.log(`${localStorage.getItem("id")}`);
            console.log(`Bearer ${localStorage.getItem("token")}`);
            console.log("보내는 note 데이터:", note);
            console.error("노트 업데이트 실패", error.response?.status, error.response?.data || error.message);
        }
    };

    const getTodo = async () => {
        try {
            const response = await axios.get(
                `${BaseURL}/todos`,
                {
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
            if (response.status === 200) {
                setTodolist(response.data);
                console.log("투두 목록 가져오기 성공", response.data);
            }
        } catch (error) {
            console.log(`Bearer ${localStorage.getItem("token")}`);
            console.error("투두 목록 가져오기 실패", error.status);
        }
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
                setNote(response.data.weeklyNote);
                console.log("유저 정보 가져오기 성공", response.data);
            }
        } catch (error) {
            console.log(`Bearer ${localStorage.getItem("token")}`);
            console.error("유저 정보 가져오기 실패", error.status);
        }
    };

    const getOneTodo = async (id) => {
        try {
            const response = await axios.get(`${BaseURL}/todos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setoneTodolist(response.data); // 상태 업데이트
                console.log("특정 투두 가져오기 성공", response.data);
            }
        } catch (error) {
            console.error("특정 투두 가져오기 실패", error.response);
            console.error(error);
            console.log(id);
        }
    };

    function createTodo() {
        axios.post(
            `${BaseURL}/todos`,
            { "title": title, "contents": content },
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            if (response.status == 201) {
                handleXButtonClick();
                Swal.fire({
                    icon: "success",
                    text: "Todo 만들기 성공!",
                });
                getTodo();
                console.log(`Bearer ${localStorage.getItem("token")}`);
            }
            else {
                Swal.fire({
                    icon: "warning",
                    text: "Todo 만들기 실패",
                });
            }
        }).catch((error) => {
            console.log(error.response);
            console.log(`${localStorage.getItem('token')}`);
            Swal.fire({
                icon: "warning",
                text: "Todo 만들기 실패",
            });

        });
    };

    const deleteTodo = async () => {
        try {
            const response = await axios.delete(
                `${BaseURL}/todos/${oneTodolist.id}`,
                {
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
            if (response.status === 204) {
                Swal.fire({
                    icon: "success",
                    text: "Todo 삭제 성공!",
                });
                handleDelteButton();
                console.log("투두 삭제 성공");
                getTodo();
            }
        } catch (error) {
            Swal.fire({
                icon: "warning",
                text: "Todo 삭제 실패",
            });
        }
    };

    useEffect(() => {
        getTodo();
        getUser();
    }, []);


    return (
        <div className="main" style={{ marginBottom: "2vh" }}>
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
            <div style={{ height: "6vh" }}></div>
            <div className='row-content' style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1.5vh" }}>
                <img src={pirctureNote} style={{ width: "6vw", height: "6vw" }}></img>
                <p style={{ marginLeft: "3vw", fontFamily: 'Basic', fontSize: '20px', fontWeight: '500', marginBottom: '0.5vh', marginTop: '0.5vh' }}>Weekly Notes</p>
            </div>
            <textarea className="note-box" type="text" value={note} onChange={saveNote} onKeyDown={handleEnterKey} />
            <div className='row-content' style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginBottom: "1.5vh", marginTop:"1.5vh" }}>
                <img src={pirctureClipbo} style={{ width: "6vw", height: "6vw" }}></img>
                <p style={{ marginLeft: "3vw", fontFamily: 'Basic', fontSize: '20px', fontWeight: '500', marginBottom: '0.5vh', marginTop: '0.5vh' }}>Today, To Do List</p>
            </div>            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', width: "100%", alignItems: "flex-start" }}>
                {Todolist.map((task, index) => (
                    <div key={task.id} style={{ position: "relative", flexDirection: "column", border:  `2px solid ${colors[index % colors.length]}`, borderRadius: '3vh', padding: '1.5vh', height: "15vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", }}>
                        <div className='row-content'style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <img src={icons[index % icons.length]} style={{
                                width: '5vh',
                                height: '5vh',
                                marginTop:"3vh"
                            }}></img>
                            <input
                                className='check-box'
                                type="checkbox"
                                checked={task.isCheck}
                                style={{
                                    position: 'absolute', 
                                    top: '0', 
                                    right: '0', 
                                    marginTop: '1vh',
                                    marginRight:"0",
                                    border:  `1px solid ${colors[index % colors.length]}`,
                                }} 
                                onChange={() => checkboxf(task)}
                            />
                        </div>
                        <div className='row-content'>
                            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                                <p style={{ marginTop: "2vh", marginBottom: "0", fontFamily: "Basic", fontSize: "17px", fontWeight: "700", color:`${colors[index % colors.length]}` }}>{task.title}</p>
                                <p style={{ marginTop: "0", fontFamily: "Basic", fontSize: "12px",  color:`${colors[index % colors.length]}` }}>{task.contents}</p>
                            </div>
                            <img onClick={() => bind(task)} style={{ width: "2vh", height: "2vh",  position: 'absolute', 
                                    bottom: '1.5vh', 
                                    right: '1vh' }} src={etc}></img>
                        </div>
                    </div>
                ))}
                <button onClick={handleButtonClick} style={{ display: "flex", border:"none",borderRadius: '3vh', padding: '3vh', height: "18.4vh", alignItems: "center", justifyContent: "center", backgroundColor: "#AEAEAE", flexDirection: "column", color:"white" }}>
                    <img src={iconImg6} style={{
                        width: '2.4vh',
                        height: '2.4vh',
                    }}></img>
                    <p style={{  marginTop: "1vh",marginBottom: "0", fontFamily: "Basic", fontSize: "14px", }}>Add to</p>
                    <p style={{ marginTop: "0",marginBottom: "0",fontFamily: "Basic", fontSize: "18px", }}>TASK</p>
                </button>
                <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
                {showPopup && (
                    <div className={`popup ${isExiting ? 'exiting' : ''}`}>
                        <div className="popup-content" style={{ width: "80vw", height: "28vh", backgroundColor: "white", border: "1px solid #E6E6E6" }}>
                            <div style={{ height: "2vh" }}></div>
                            <div className='row-content' style={{display:"flex", justifyContent:"space-between"}}>
                                <p style={{ fontFamily: "Basic", fontSize: "15px", fontWeight:"200" }} >Title</p>
                                <input className="edit-input2" type='text' value={title} onChange={saveTitle} style={{ fontFamily: "Basic", fontSize: "16px", fontWeight:"normal"}} />
                            </div>
                            <div  className='row-content' style={{display:"flex", justifyContent:"space-between"}}>
                                <p style={{ fontFamily: "Basic", fontSize: "15px", fontWeight:"300" }}>Contents</p>
                                <input className="edit-input2" type='text' value={content} onChange={saveContent} style={{ fontFamily: "Basic", fontSize: "16px", fontWeight:"normal"}} />
                            </div>
                            <div style={{ height: "9vh" }}></div>
                            <div className='row-content'>
                                <button className="cancel" style={{width:"32vw", height:"3.7vh"}}onClick={handleXButtonClick}>취소</button>
                                <div style={{ width: "1.5vh" }}></div>
                                <button className="submit" style={{width:"32vw", height:"3.7vh"}}onClick={() => { createTodo(); }}>완료</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`shadow ${showDPopup ? 'active' : ''}`} style={{ display: showDPopup ? 'block' : 'none' }}></div>
                {showDPopup && (
                    <div className={`popup ${isExiting2 ? 'exiting' : ''}`}>
                        <div className="popup-content" style={{ width: "80vw", height: "13vh", backgroundColor: "white", border: "1px solid #E6E6E6", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column" }}>
                            <div className='row-content'>
                                <p style={{ fontFamily: "Basic", fontSize: "13px", fontWeight: "normal" }} >{oneTodolist.title}</p>
                                <div style={{ width: "2vw" }}></div>
                                <p style={{ fontFamily: "Basic", fontSize: "13px", fontWeight: "normal" }} >삭제합니다.</p>
                            </div>
                            <div className='row-content' style={{marginTop:"2vh"}}>
                                <button className="cancel" style={{width:"32vw", height:"3.7vh"}}onClick={handleXButtonClick}>취소</button>
                                <div style={{ width: "1.5vh" }}></div>
                                <button className="submit" style={{width:"32vw", height:"3.7vh"}}onClick={() => { deleteTodo(); }}>네</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Todolist;