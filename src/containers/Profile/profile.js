import React, { useEffect, useState } from 'react';
import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InstaPost from '../../components/insta-post-component/insta-post';
import AppLoader from '../../components/app-loader-component/app-loader';
import DBLayer from '../../dblayer';
import { Avatar } from '@material-ui/core';
import CreatePostModal from '../../components/upload-post-component/upload-image-modal';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        fontWeight: 600,
        width: '275px',
        marginTop: '20px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const username = props.computedMatch.params.id;
    const [userDetails, setUserDetails] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const createPostRef = React.useRef();

    useEffect(() => {
        DBLayer.getProfile(username)
            .then(res => {
                setUserDetails(res.data.userProfile);
                setUserPosts(res.data.instaPosts);
                setShowLoader(false);
            })
            .catch(err => {
                setShowLoader(false);
            })
    }, []);

    const updateProfilePic = () => {

    }

    const openCreatePostDialog = (e) => {
        const createPostRefCurrent = createPostRef && createPostRef.current ? createPostRef.current : undefined;
        createPostRefCurrent.open();
    }

    return (
        <div className="app__profile">
            <AppLoader showLoader={showLoader} />
            <CreatePostModal
                ref={createPostRef}
            />
            {!showLoader &&
                <>
                    <div className="profile__head">
                        <Avatar
                            onClick={updateProfilePic}
                            className="avatar__profilepic"
                            src={userDetails.profileURL}
                        ></Avatar>
                        <div className="profile__info">
                            <strong><div>{userDetails.name} &nbsp; @{userDetails.username}</div></strong>
                            <div style={{ marginTop: '10px' }}>
                                <span>
                                    <strong>{userPosts.length}</strong> posts
                                </span> &nbsp;
                                <span>
                                    <strong>{userDetails.followers.length}</strong> followers
                                </span> &nbsp;
                                <span>
                                    <strong>{userDetails.following.length}</strong> following
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={openCreatePostDialog}
                        disableElevation>
                        Create Post
                    </Button>
                    <hr className="profile__divider" />
                    <div className="profile__container">
                        {userPosts.length > 0 ? <PaintUserProfile userPosts={userPosts} /> : <div>Click Create Post to create a new Post!</div>}
                    </div>
                </>
            }
        </div>
    )
}

const PaintUserProfile = (props) => {
    return (
        props.userPosts.map((post) => {
            return <InstaPost imageURL={post.imageURL} caption={post.caption} username={post.postOwner.username} />
        })
    )
}

export default Profile;