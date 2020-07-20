import React, { forwardRef, useImperativeHandle } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    // test: {
    //     backgroundColor: theme.palette.primary.main,
    //     color: theme.palette.secondary.main,
    //     fontWeight: theme.typography.fontWeightBold,
    // },
}));

const Toastr = forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [alertType, setAlertType] = React.useState('info');

    useImperativeHandle(ref, () => ({

        handleClick: (alertText, userAlertType) => {
            setAlertText(alertText);
            setAlertType(userAlertType ? userAlertType : 'info');
            setOpen(true);
        },

    }));

    const handleClose = (openCheck) => {
        setOpen(openCheck);
    };

    return (
        <>
            {alertText ? <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={3000} onClose={() => handleClose(false)}
                    style={
                        {
                            position: 'fixed',
                            left: '50%',
                            top: '40px',
                            bottom: 'auto',
                            right: 'auto',
                            zIndex: 12000,
                        }}
                >
                    <Alert onClose={() => handleClose(false)} severity={alertType}>
                        {alertText}
                    </Alert>
                </Snackbar>
            </div> : <></>}
        </>
    );
});

export default Toastr;
