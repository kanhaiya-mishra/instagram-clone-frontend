import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import React from 'react';

export const OverrideTheme = {
    palette: {
        primary: {
            main: "#0095f6",
            light: '#edc03b',
            dark: '#bd8f06',
        }
    },
    typography: {
        fontFamily: [
            'Open Sans',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
};

const theme = createMuiTheme(OverrideTheme);

export function overrideTheme(ChildComponent) {
    return (props) => (
        <ThemeProvider theme={theme}>
            <ChildComponent {...props} />
        </ThemeProvider>
    );
}
