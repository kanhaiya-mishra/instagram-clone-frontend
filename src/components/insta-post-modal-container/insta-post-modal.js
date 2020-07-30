import React, { useImperativeHandle, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import imageCompression from 'browser-image-compression';
import { TextField } from '@material-ui/core';
import DBLayer from '../../dblayer';
import UserService from '../../services/user-service';
import AppLoader from '../../components/app-loader-component/app-loader';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    dialogParent: {
        minWidth: '600px',
    },
    instaPostModelContainer: {
        display: 'flex',
        width: '100%',
    },
    instaPostRightPanel: {
        paddingLeft: '8px'
    },
    preview: {
        height: '400px',
        width: '350px',
        objectFit: 'contain'
    },
    header: {
        display: 'flex',
        minWidth: '200px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0px',
        borderBottom: '1px solid lightgray',
    },
    usernameText: {
        fontSize: '18px',
        fontWeight: 600
    },
    avatar: {
        height: '22px',
        width: '22px',
        marginRight: '4px'
    }
}));

const CreatePostModal = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        DBLayer.getComment(post._id)
            .then((response) => {
                setComments(response.data);
                setShowLoader(false);
            })
            .catch((err) => {
                setShowLoader(false);
            })
    }, [post]);

    useImperativeHandle(ref, () => ({
        open: handleClickOpen,
    }));

    const handleClickOpen = (post) => {
        setPost(post);
        setOpen(true);
        setShowLoader(true);
    };

    const handleClose = () => {
        resetStates();
        setOpen(false);
    };

    const resetStates = () => {
        setPost({});
        setComments([]);
        setShowLoader(false);
    }

    return (
        <div className={classes.dialogParent}>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <AppLoader showLoader={showLoader} />
                <DialogContent>
                    <AppLoader showLoader={showLoader} />
                    <div className={classes.instaPostModelContainer}>
                        {!showLoader &&
                            <>
                                <img
                                    src={post.imageURL}
                                    className={classes.preview} />
                                <div className={classes.instaPostRightPanel}>
                                    <Header close={handleClose} />
                                    <CommentsHandler />
                                    <LikesHandler />
                                </div>
                            </>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
})

const Header = (props) => {
    const classes = useStyles();
    const user = UserService.getUser();
    return (
        <div className={classes.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    className={classes.avatar}
                    src={props.imageURL}
                    alt={user.username}
                ></Avatar>
                <span className={classes.usernameText}>@{user.username}</span>
            </div>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={props.close} />
        </div>
    )
}

const CommentsHandler = (props) => {
    return (
        <div style={{ height: '315px' }}></div>
    )
}

const LikesHandler = (props) => {
    return (
        <div></div>
    )
}

export default CreatePostModal;
