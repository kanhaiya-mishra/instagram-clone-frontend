import React, { useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import imageCompression from 'browser-image-compression';
import { TextField } from '@material-ui/core';
import DBLayer from '../../dblayer';
import UserService from '../../services/user-service';
import AppLoader from '../../components/app-loader-component/app-loader';

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
    },
    actionButtons: {
        color: 'white',
        fontWeight: 600,
        marginTop: '20px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    preview: {
        height: '400px',
        width: '400px',
        objectFit: 'contain'
    }
}));

const CreatePostModal = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const reader = new FileReader();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [image, setImage] = useState({});
    const [localImageURL, setLocalImageURL] = useState("");
    const [caption, updateCaption] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    useImperativeHandle(ref, () => ({
        open: handleClickOpen,
    }));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (success) => {
        if (success.post && Object.keys(success.post).length > 0) {
            props.postCreated(success.post);
        }
        resetStates();
        setOpen(false);
    };

    const resetStates = () => {
        setImage({});
        setLocalImageURL("");
        updateCaption("");
        setShowLoader(false);
    }

    const changeCaption = (e) => {
        updateCaption(e.target.value);
    }

    const onUploadImage = (e) => {
        const fileExists = e.target.files;
        if (fileExists && fileExists.length > 0) {
            const file = fileExists[0];
            const fileType = file.type.split('/');

            if (fileType[0] === 'image') {
                const options = {
                    maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
                    maxWidthOrHeight: 600,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
                    useWebWorker: true,
                }
                imageCompression(file, options)
                    .then((compressedFile) => {
                        reader.readAsDataURL(compressedFile);
                        reader.onloadend = function (e) {
                            setLocalImageURL(reader.result);
                        }.bind(this);
                        setImage(compressedFile);
                    })
            }
        }
    }

    const onCreatePost = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'insta-clone');
        data.append('cloud_name', 'kanhaiya-insta-clone');
        setShowLoader(true);
        DBLayer.uploadImage(data)
            .then(cloudinary => {
                const user = UserService.getUser();
                const userDetails = {
                    name: user.name,
                    profilePicURL: user.profilePicURL,
                    username: user.username
                }
                return DBLayer.postInstaPost({
                    imageURL: cloudinary.data.url,
                    caption: caption,
                    user: userDetails
                });
            })
            .then((result) => {
                handleClose(result.data);
            })
            .catch((err) => {
                setShowLoader(false);
                console.log(err);
            });
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Create Post"}</DialogTitle>
                <AppLoader showLoader={showLoader} />
                <DialogContent>
                    {!localImageURL ?
                        <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            className={classes.button}
                            disableElevation>
                            Choose Image
                                    <input
                                type="file"
                                accept="image/*" multiple="false"
                                onChange={onUploadImage}
                                style={{ display: "none" }}
                            />
                        </Button>
                        :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                label="Caption"
                                value={caption}
                                onChange={changeCaption}
                                multiline
                                rows={2}
                                style={{ marginBottom: '8px' }}
                                variant="outlined"
                            />
                            <img
                                src={localImageURL}
                                className={classes.preview} />
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.actionButtons}
                        onClick={onCreatePost}
                        disabled={!localImageURL}
                        disableElevation>
                        Create
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.actionButtons}
                        onClick={handleClose}
                        disableElevation>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})

export default CreatePostModal;
