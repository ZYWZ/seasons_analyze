// src/pages/Page1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Page1.css';  // Import the CSS file

const Page1 = () => {
    const navigate = useNavigate();

    const goToNextPage = () => {
        navigate('/page2');
    };

    return (
        <div className="page1-container">
            <div className="content">
                <h2 className="heading">欢迎使用</h2>
                <p className="paragraph">这里播放动画和Logo</p>
                <button className="button" onClick={goToNextPage}>开始</button>
            </div>
        </div>
    );
};

export default Page1;
