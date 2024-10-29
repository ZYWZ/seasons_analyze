// src/pages/Page2.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
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
                const response = await fetch('http://localhost:5000/yolo-detect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: base64Image })
                });

                const data = await response.json();
                console.log('Response from backend:', data);
            } catch (error) {
                console.error('Error sending image to backend:', error);
            }
        }
    };

    return (
        <div>
            <h2>Page 2 - Camera View</h2>
            <div style={{ border: '1px solid black', width: '640px', height: '480px' }}>
                {/* Video element to display the camera feed */}
                <video 
                    ref={videoRef} 
                    autoPlay 
                    style={{ width: '100%', height: '100%' }} 
                />
            </div>

            {/* Hidden Canvas Element for Image Capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <button onClick={captureAndSendImage} style={{ marginTop: '20px' }}>Capture and Send Image</button>
        </div>
    );
};

export default Page2;
