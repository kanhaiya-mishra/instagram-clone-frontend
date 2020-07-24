import React, { useEffect, useState } from 'react';
import './app-header.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/user-service';
import DBLayer from '../../dblayer';
import _ from 'lodash';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    iconButtons: {
        cursor: 'pointer',
    },
    rightColumn: {
        display: 'flex'
    },
    profileAvatar: {
        height: "24px",
        width: "24px",
        marginRight: "8px",
        cursor: 'pointer'
    }
}));


function AppHeader() {
    const history = useHistory();
    const classes = useStyles();
    let currentUser = UserService.getUser();
    if (!currentUser) { currentUser = {}; }
    const [user, setUser] = useState(currentUser);

    React.useEffect(() => {
        const checkAndUpdateUser = setInterval(() => {
            const newUser = UserService.getUser();
            if (newUser) {
                if (!_.isEqual(newUser, currentUser)) {
                    setUser(newUser);
                }
                currentUser = newUser;
            } else {
                if (Object.keys(currentUser).length !== 0) {
                    setUser({});
                }
                currentUser = {};
            }
        }, 300);
        return () => {
            clearInterval(checkAndUpdateUser);
        };
    }, []);

    const logout = () => {
        DBLayer.signOut().then(() => {
            UserService.removeUser();
            setUser({});
            history.push('/signin');
        }).catch(() => {
            alert("Error in logging you out!. Please try again!");
        })
    };

    return (
        <div className="app__header">
            <img className="app__headerImg"
                src="https://www.instagram.com/static/images/branding/logoWhiteoutLockup.png/3a62b1a95da3.png"
                onClick={history.push("/")}
                alt="logo" />
            {/* <Idhar Search Dalna Hai> */}
            <div>
                {Object.keys(user).length !== 0 &&
                    <span className={classes.rightColumn}>
                        <HomeIcon onClick={history.push('/')}
                            style={{ marginRight: "8px" }}
                            className={classes.iconButtons} />
                        <Avatar
                            title="My Profile"
                            className={classes.profileAvatar}
                            alt={user.username}
                            src={user.profileURL}
                        ></Avatar>
                        <ExitToAppIcon onClick={logout} className={classes.iconButtons} />
                    </span>
                }
            </div>
        </div>
    )
}

export default AppHeader;