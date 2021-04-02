import {teal} from "@material-ui/core/colors";
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4cb2a8',
            main: '#008279',
            dark: '#00554d',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ff5d46',
            main: '#c9251c',
            dark: '#900000',
            contrastText: '#ffffff',
        },
        background: {
            default: '#fff',
            secondary: '#e0e0e0'
        },
        button: {
            secondary: '#e0e0e0'
        }
    },
    spacing: 5,
    overrides: {
        MuiTableCell: {
            root: {
                padding: '2px 4px',
                borderBottom: 0,
            },
        },
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: teal['50'],
                },
                "&$selected:hover": {
                    backgroundColor: teal['100'],
                }
            }
        }
    }
});

export default theme;
