import React, { useEffect, useState } from 'react';
import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AppLoader from '../../components/app-loader-component/app-loader';
import DBLayer from '../../dblayer';
import { Avatar } from '@material-ui/core';
import CreatePostModal from '../../components/upload-post-component/upload-image-modal';
import InstPostModal from '../../components/insta-post-modal-container/insta-post-modal';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
    const instaPostRef = React.useRef();

    useEffect(() => {
        DBLayer.allUserPosts(username)
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

    const postCreated = (post) => {
        const allUserPosts = JSON.parse(JSON.stringify(userPosts));
        allUserPosts.unshift(post);
        setUserPosts(allUserPosts);
    }

    const openInstaPostModal = (post) => {
        const instaPostRefCurrent = instaPostRef && instaPostRef.current ? instaPostRef.current : undefined;
        instaPostRefCurrent.open(post);
    }

    return (
        <div className="app__profile">
            <AppLoader showLoader={showLoader} />
            <CreatePostModal
                ref={createPostRef}
                postCreated={postCreated}
            />
            <InstPostModal
                ref={instaPostRef}
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
                        {userPosts.length > 0 ? <PaintUserProfile openInstaPostModal={openInstaPostModal} userPosts={userPosts} /> : <div>Click Create Post to create a new Post!</div>}
                    </div>
                </>
            }
        </div>
    )
}

const PaintUserProfile = (props) => {
    return (
        <>
            <Grid container spacing={3}>
                {props.userPosts.map((post) => {
                    return (
                        <Grid item xs={6} sm={3}>
                            <ThumbnailPainter imageURL={post.imageURL} likeCount={post.likeCount} openInstaPostModal={() => props.openInstaPostModal(post)} />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

const ThumbnailPainter = (props) => {
    const [showThumbnail, setShowThumbnail] = React.useState(false);
    const showLikes = (show) => {
        setShowThumbnail(show);
    }
    return (
        <div className="thumbnail__container"
            onMouseEnter={(e) => showLikes(true)}
            onMouseLeave={(e) => showLikes(false)}
            onClick={props.openInstaPostModal}
        >
            <img className="thumbnail__image"
                src={props.imageURL}
                alt="post-thumbnail" />
            <div className={showThumbnail ? "thumbnail__hovershow" : "thumbnail__hoverhide"}></div>
            <div className={showThumbnail ? "thumbnail__like" : "thumbnail__hoverhide"}>
                <FavoriteIcon />{props.likeCount}</div>
        </div>
    )
}

export default Profile;