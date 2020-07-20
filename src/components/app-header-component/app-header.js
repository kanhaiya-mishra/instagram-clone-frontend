import React from 'react';
import './app-header.css';
import { useHistory } from 'react-router-dom';

function AppHeader() {
    const history = useHistory();
    return (
        <div className="app__header">
            <img className="app__headerImg"
                src="https://www.instagram.com/static/images/branding/logoWhiteoutLockup.png/3a62b1a95da3.png"
                onClick={history.push("/")}
                alt="logo" />
        </div>
    )
}

export default AppHeader;