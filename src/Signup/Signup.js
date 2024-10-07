import React from 'react';
import './Signup.css';
import '../App.css'; 
import pictureProfile3 from '../images/profile3.png';

const Signup = () => {
    return (
      <div className="signup-container">
        <p className="p1">Sign up for</p>
        <p className="p2">study BUDDY</p>
        <img src={pictureProfile3} alt="profile"></img>
        <form className="signup-form">
          <div className="form">
            <div className="input-form">
              <div className="id-text">아이디</div>
              <div className="input-group">
                <input type="text" id="username" />
              </div>
            </div>
            <div className="input-form">
            <div className="name-text">이름</div>
            <div className="input-group">
              <input type="text" id="name" name="name" />
            </div>
          </div>
          <div className="input-form">
            <label htmlFor="password">비밀번호</label>
            <div className="input-group">
              <input type="password" id="password" name="password" />
            </div>
          </div>

          <div className="input-form">
            <label htmlFor="confirmPassword">재확인</label>
            <div className="input-group">
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="button-group">
            <button type="button" className="cancel">취소</button>
            <button type="submit" className="submit">완료</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
