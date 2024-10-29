// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import ResultPage from './pages/ResultPage';
import './App.css';  // Import global CSS if needed

const App = () => {
    const [capturedImage, setCapturedImage] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

    return (
        <Router>
            <div>
                <Header />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Page1 />} />
                        <Route 
                            path="/page2" 
                            element={
                                <Page2 
                                    setCapturedImage={setCapturedImage} 
                                    setApiResponse={setApiResponse} 
                                />
                            } 
                        />
                        <Route path="/page3" element={<Page3 />} />
                        <Route 
                            path="/result" 
                            element={
                                <ResultPage 
                                    capturedImage={capturedImage} 
                                    apiResponse={apiResponse} 
                                />
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
