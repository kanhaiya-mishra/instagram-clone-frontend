import React from 'react';
import {
    Typography,
    CircularProgress,
    Box,
} from '@material-ui/core/';

function AppLoader(props) {
    const position = props.relativeParent ? 'absolute' : 'fixed';
    if (props.showLoader) {
        return (
            <Box className="loader-container" zIndex={9999}
                bgcolor={'transparent'} position={position} top={0} left={0} right={0} bottom={0}>
                <Box className="loader" flexDirection="column" display="flex"
                    height={1} justifyContent="center" alignItems="center">
                    <CircularProgress color="primary" disableShrink={true} />
                    <Typography color="primary">{props.text}</Typography>
                </Box>
            </Box>
        );
    } else {
        return null;
    }

}

export default AppLoader;
