import React, { useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import UserService from '../../services/user-service';
import AppLoader from '../../components/app-loader-component/app-loader';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import CommentsHandler from '../comment-handler-component/comment-handler';

const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: "800px"
    },
    dialogContent: {
        padding: 0,
        margin: 0,
        '&:first-child': {
            padding: 0,
        }
    },
    instaPostModelContainer: {
        display: 'flex',
        width: '100%',
    },
    instaPostRightPanel: {
        height: '395px',
        width: '50%',
        padding: '8px',
        paddingBottom: 0
    },
    preview: {
        height: '400px',
        width: '50%',
        objectFit: 'contain'
    },
    header: {
        display: 'flex',
        minWidth: '200px',
        height: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0px',
        borderBottom: '1px solid lightgray',
    },
    commentSection: {
        height: '87%',
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
    const [post, setPost] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const commentRef = React.createRef();

    useImperativeHandle(ref, () => ({
        open: handleClickOpen,
    }));

    const handleClickOpen = (post) => {
        setPost(post);
        setOpen(true);
    };

    const handleClose = () => {
        resetStates();
        const commentRefCurrent = commentRef && commentRef.current ? commentRef.current : undefined;
        const likeCommentCount = commentRefCurrent.getCommentLikeCount();
        props.updateCommentLikeCount({ postId: post._id, likeCommentCount });
        setOpen(false);
    };

    const resetStates = () => {
        setPost({});
        setShowLoader(false);
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            classes={{ paper: classes.paper }}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <AppLoader showLoader={showLoader} />
            <DialogContent className={classes.dialogContent}>
                <AppLoader showLoader={showLoader} />
                <div className={classes.instaPostModelContainer}>
                    {!showLoader &&
                        <>
                            <img
                                src={post.imageURL}
                                className={classes.preview}
                                alt="img" />
                            <div className={classes.instaPostRightPanel}>
                                <Header close={handleClose} />
                                <div className={classes.commentSection}>
                                    <CommentsHandler
                                        ref={commentRef}
                                        postId={post._id}
                                        likeCount={post.likeCount}
                                        commentCount={post.commentCount} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </DialogContent>
        </Dialog>
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

export default CreatePostModal;
