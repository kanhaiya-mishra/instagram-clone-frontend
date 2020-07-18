import React from 'react';
import './insta-post.css';
import Avatar from '@material-ui/core/Avatar';

function InstaPost(props) {
    return (
        <div className="instapost">
            <div className="instapost__header">
                <div className="instapost__header__left">
                    <Avatar
                        className="instapost__avatar"
                        alt={props.username}
                        src={props.imageURL}
                    ></Avatar>
                    <h4>{props.username}</h4>
                </div>
                {/* <options></options> */}
            </div>

            <img className="instapost__image"
                src={props.imageURL}
                alt="insta-post" />
            <div className="instapost__footer">
                <span className="instapost__username">{props.username}</span> {props.caption}
            </div>
        </div>
    )
}

export default InstaPost;