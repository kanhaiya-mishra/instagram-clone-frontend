import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DBLayer from '../../dblayer';
import { InputBase, InputAdornment, Button, Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UserService from '../../services/user-service';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '12px 0px 0px 0px',
        width: "100%",
        height: "100%",
    },
    viewComments: {
        height: "80%",
        overflowY: 'auto',
        overflowX: 'hidden',
        borderBottom: '1px solid lightgray',
        '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
        }
    },
    commentLikeCount: {
        height: "10%",
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid lightgray'
    },
    addCommentHandler: {
        height: "10%",
    },
    nakedInput: {
        width: '100%'
    },
    postButton: {
        margin: 0,
        padding: 0,
        textTransform: 'capitalize',
        fontWeight: 600,
        minWidth: '35px',
        width: '35px',
    },
    likecomment: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        height: '22px',
        width: '22px',
        marginRight: '4px'
    },
    commentFirstSection: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14
    },
    deleteButton: {
        color: 'maroon',
        cursor: 'pointer',
        fontSize: '18px',
        right: '8px',
    },
    eachComment: {
        display: 'flex',
        padding: '4px 0',
        wordWrap: 'break-word'
    },
    commentText: {
        width: '335px',
    },
    commentSecondSection: {
        fontSize: 12,
        fontWeight: 600,
        marginTop: 6,
        color: 'gray'
    }
}));

const CommentsHandler = (props, ref) => {
    const classes = useStyles();
    const [allComments, setAllComments] = useState([]);
    const [commentCount, setCommentCount] = useState(props.commentCount || 0);
    const [likeCount, setLikeCount] = useState(props.likeCount || 0);

    const returnCommentLikeCount = () => {
        return { commentCount, likeCount };
    }

    useImperativeHandle(ref, () => ({
        getCommentLikeCount: () => {
            return returnCommentLikeCount();
        }
    }));

    useEffect(() => {
        DBLayer.getComments(props.postId)
            .then((res) => {
                const sortedComments = sortComments(res.data);
                setAllComments(sortedComments);
            })
            .catch((err) => console.log(err))
    }, []);

    const sortComments = (comments) => {
        comments.sort(function (a, b) {
            var dateA = new Date(a.createdOn), dateB = new Date(b.createdOn);
            return dateA - dateB;
        });
        return comments;
    }

    const addComment = (commentText) => {
        const user = UserService.getUser();
        DBLayer.addComment({ postId: props.postId, commentText, profilePicURL: user.profilePicURL })
            .then((res) => {
                const currentAllComments = JSON.parse(JSON.stringify(allComments));
                currentAllComments.push(res.data);
                let oldCount = commentCount;
                setCommentCount(++oldCount);
                setAllComments(currentAllComments);
            })
    }

    const deleteComment = (commentId) => {
        DBLayer.deleteComment(commentId)
            .then((res) => {
                let oldCount = commentCount;
                setCommentCount(--oldCount);
                const oldComments = JSON.parse(JSON.stringify(allComments));
                const newComments = oldComments.filter((comment) => comment._id !== commentId);
                setAllComments(newComments);
            })
    }

    const likeComment = (comments) => {
        return comments;
    }

    return (
        <div className={classes.root}>
            <div className={classes.viewComments}>
                {!_.isEmpty(allComments) && allComments.map((comment) => {
                    return (
                        <CommentPainter key={comment._id} comment={comment} onDeleteComment={deleteComment} />
                    )
                })}
                {_.isEmpty(allComments) &&
                    <div style={{ textAlign: 'center' }}>There are no comments on this post!</div>
                }
            </div>
            <CommentLikeCount commentCount={commentCount} likeCount={likeCount} />
            <AddCommentHandler onAddComment={addComment} ifEnter={addComment} />
        </div>
    )
}

const CommentPainter = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.eachComment}>
            <Avatar
                className={classes.avatar}
                src={props.comment.profilePicURL} />
            <div>
                <div className={classes.commentFirstSection}>
                    <div className={classes.commentText}>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>{'@' + props.comment.commentOwnerIdUsername + ' '}</span>{props.comment.commentText}
                    </div>
                    {UserService.getUser().username === props.comment.commentOwnerIdUsername &&
                        <DeleteIcon className={classes.deleteButton} onClick={() => props.onDeleteComment(props.comment._id)} />
                    }
                </div>
                <div className={classes.commentSecondSection}>
                    {moment(props.comment.createdOn).fromNow()} &nbsp;
                    {props.comment.likeCount + ' likes'}
                </div>
            </div>
        </div>
    )
}

const CommentLikeCount = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.commentLikeCount} >
            <span className={classes.likecomment} style={{ marginRight: '8px' }}>
                {props.likeCount}&nbsp;<FavoriteIcon /></span>
            <span className={classes.likecomment}
                onClick={() => document.getElementById("add-comment-textfield").focus()}>
                {props.commentCount || 0}&nbsp;<ChatBubbleOutlineIcon /></span>
        </div>
    )
}

const AddCommentHandler = (props) => {
    const classes = useStyles();
    const [commentText, setCommentText] = useState("");

    const ifEnter = (e) => {
        if (e.which === 13) {
            e.stopPropagation();
            e.preventDefault();
            props.onAddComment(commentText);
            setCommentText("");
        }
    }
    return (
        <div className={classes.addCommentHandler}>
            <InputBase
                className={classes.nakedInput}
                id='add-comment-textfield'
                placeholder={'Add a comment...'}
                inputProps={{ 'aria-label': 'naked' }}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={ifEnter}
                value={commentText}
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            color="primary"
                            disabled={commentText.length > 0 ? false : true}
                            disableElevation
                            disableRipple
                            onClick={() => { props.onAddComment(commentText); setCommentText(""); }}
                            className={classes.postButton}>Post</Button>
                    </InputAdornment>
                }
            />
        </div>
    )
}

export default forwardRef(CommentsHandler);