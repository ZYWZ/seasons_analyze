// src/components/BackgroundWrapper.js
import React from 'react';

const BackgroundWrapper = ({ children }) => {
    return (
        <div style={styles.wrapper}>
            {children}
        </div>
    );
};

const styles = {
    wrapper: {
        backgroundColor: '#e0f7fa',  /* Example: Light cyan background */
        minHeight: '100vh',          /* Ensure full viewport height */
        padding: '20px',
        boxSizing: 'border-box',
    },
};

export default BackgroundWrapper;
