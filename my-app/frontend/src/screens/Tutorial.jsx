import React from 'react';
import Header from '../components/Header';

const Tutorial = () => {
    return (
        <>
            <Header />
            <div style={{ maxWidth: '700px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h1>Welcome to VitaeAI Tutorial</h1>
                <ol style={{ lineHeight: 1.8 }}>
                    <li>
                        <strong>Sign Up / Log In:</strong> Create an account or log in with your credentials to access all features.
                    </li>
                    <li>
                        <strong>Profile Setup:</strong> Complete your profile with accurate information to personalize your experience.
                    </li>
                    <li>
                        <strong>Upload Documents:</strong> Use the upload section to add your CV, cover letter, or other relevant documents.
                    </li>
                    <li>
                        <strong>AI Analysis:</strong> Let VitaeAI analyze your documents and provide feedback or suggestions for improvement.
                    </li>
                    <li>
                        <strong>Get Support:</strong> If you need help, visit the Help section or contact support.
                    </li>
                </ol>
                <p>
                    For more detailed instructions, check the <a href="/help">Help</a> page.
                </p>
            </div>
        </>
    );
};

export default Tutorial;