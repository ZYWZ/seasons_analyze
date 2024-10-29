// src/pages/Page2.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Page2.css';  // Import the updated CSS file

const Page2 = ({ setCapturedImage, setApiResponse }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Function to access the camera
        const getCameraFeed = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera: ", error);
            }
        };

        getCameraFeed();

        // Cleanup the video stream when the component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // Capture image and send to backend
    const captureAndSendImage = async () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const video = videoRef.current;

            // Set canvas size to match video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the video frame onto the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to base64
            const base64Image = canvas.toDataURL('image/png');
            
            try {
                // Send base64 image to backend
                const response = await fetch('http://localhost:5000//face-analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: base64Image })
                });

                const data = await response.json();

                // Save the response in the state
                setCapturedImage(base64Image);
                setApiResponse(data);
                console.log(data);
                
                // setBoundingBoxes(data.bounding_boxes);
                navigate('/result');
            } catch (error) {
                console.error('Error sending image to backend:', error);
            }
        }
    };

    return (
        <div className="page2-container">
            <div className="camera-section">
                <div className="camera-wrapper">
                    {/* Video element to display the camera feed */}
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        className="video"
                    />
                </div>
                
                {/* Button to capture the image */}
                <button className="capture-button" onClick={captureAndSendImage}>
                    拍摄并分析
                </button>
            </div>

            {/* Hidden Canvas Element for Image Capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default Page2;
