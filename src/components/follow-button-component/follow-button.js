import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DBLayer from '../../dblayer';

const useStyles = makeStyles((theme) => ({
    followButton: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        width: '275px',
        marginTop: '20px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    unfollowButton: {
        color: 'black',
        fontWeight: 600,
        width: '275px',
        marginTop: '20px',
        textTransform: 'none',
        '&:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main
        }
    }
}));

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={17}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={17}
                thickness={4}
                {...props}
            />
        </div>
    );
}

const FollowButton = props => {
    const classes = useStyles();
    const [showLoader, setShowLoader] = useState(false);
    const [following, setFollowing] = useState(props.following);

    const followOrUnfollowUser = (e) => {
        setShowLoader(true);
        decide()
            .then((res) => {
                setShowLoader(false);
                if (res.data.addedFollowing) setFollowing(true);
                if (res.data.removedFollowing) setFollowing(false);
                props.followerCountChanged(res.data.followers);
            })
            .catch((err) => { setShowLoader(false); console.log(err); })

    }

    const decide = () => {
        return following ? DBLayer.unfollowUser(props.username) : DBLayer.followUser(props.username);
    }

    return (
        <Button
            variant="contained"
            className={following ? classes.unfollowButton : classes.followButton}
            onClick={followOrUnfollowUser}
            disableElevation>
            {showLoader ?
                <FacebookCircularProgress /> : following ? 'Following' : 'Follow'
            }
        </Button>
    );
}

export default FollowButton;
