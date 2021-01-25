import React, { useEffect, useState } from 'react';
import './app-header.css';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/user-service';
import DBLayer from '../../dblayer';
import _ from 'lodash';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';

import AutoComplete from '../autocomplete-component/autocomplete';

function AppHeader() {
   const history = useHistory();
   let currentUser = UserService.getUser();
   if (!currentUser) { currentUser = {}; }
   const [user, setUser] = useState(currentUser);

   useEffect(() => {
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

   const redirect = (arg) => {
      if (arg === 'HOME') {
         history.push('/')
      } else if (arg === 'PROFILE') {
         const username = user.username;
         history.push(`/profile/${username}`);
      }
   }

   return (
      <div className="app__header">
         <img className="app__headerImg"
            src="https://www.instagram.com/static/images/branding/logoWhiteoutLockup.png/3a62b1a95da3.png"
            onClick={() => redirect('HOME')}
            alt="logo" />
         {Object.keys(user).length !== 0 &&
            <div>
               <AutoComplete />
            </div>
         }
         <div>
            {Object.keys(user).length !== 0 &&
               <span className="rightColumn">
                  <HomeIcon onClick={() => redirect('HOME')}
                     style={{ marginRight: "8px" }}
                     className="iconButtons" />
                  <Avatar
                     title="My Profile"
                     onClick={() => redirect('PROFILE')}
                     className="profileAvatar"
                     alt={user.username}
                     src={user.profileURL}
                  ></Avatar>
                  <ExitToAppIcon onClick={logout} className="iconButtons" />
               </span>
            }
         </div>
      </div>
   )
}

export default AppHeader;