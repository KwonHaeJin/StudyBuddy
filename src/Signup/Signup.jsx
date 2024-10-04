import React from 'react';
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">
            <h1>Sign up for</h1>
            <h2>study BUDDY</h2>
            <div className="avatar"></div>
            <form className="signup-form">
                <label>아이디</label>
                <input type="text" placeholder="아이디를 입력하세요" />
                
                <label>이름</label>
                <input type="text" placeholder="이름을 입력하세요" />
                
                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호를 입력하세요" />
                
                <label>재확인</label>
                <input type="password" placeholder="비밀번호를 재확인하세요" />
                
                <div className="button-group">
                    <button type="button" className="cancel">취소</button>
                    <button type="submit" className="submit">완료</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
