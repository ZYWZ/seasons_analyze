// src/pages/ResultPage.js
import React from 'react';
import './css/ResultPage.css';  // Import CSS file for ResultPage

const ResultPage = ({ capturedImage, apiResponse }) => {
    // Extract data from the API response
    const detailedInfo = apiResponse?.detailed_info || {};
    const lipShape = apiResponse?.lip_shape || 'Unknown';

    return (
        <div className="result-page-container">
            <h2 className="result-heading">Detection Result</h2>
            
            {/* Image and information container */}
            <div className="result-content">
                {/* Display the captured image */}
                <div className="image-container">
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="captured-image"
                    />
                </div>

                {/* Display detailed information */}
                <div className="info-container">
                    <h3 className="info-heading">Lip Shape: {lipShape}</h3>
                    <ul className="info-list">
                        <li className="info-item">Final Shape: {detailedInfo.final_shape || 'N/A'}</li>
                        <li className="info-item">Left Angle: {detailedInfo.left_angle?.toFixed(2) || 'N/A'}°</li>
                        <li className="info-item">Right Angle: {detailedInfo.right_angle?.toFixed(2) || 'N/A'}°</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
