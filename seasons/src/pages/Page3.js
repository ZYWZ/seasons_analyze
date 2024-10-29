// src/pages/Page1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Page1.css';  // Import the CSS file

const Page3 = () => {
    const navigate = useNavigate();

    const goToNextPage = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="heading">感谢使用</h2>
                <p className="paragraph">这里显示结束语</p>
                <button className="button" onClick={goToNextPage}>返回</button>
            </div>
        </div>
    );
};

export default Page3;
