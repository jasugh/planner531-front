import {deepOrange, teal} from "@material-ui/core/colors";
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        // primary: {
        //     main: '#009688'
        // },
        primary: {
            main: '#19857b',
            dark: '#00695f',
            light:  teal['50']
        },
        secondary: {
            main: '#f44336',
        },
        background: {
            default: '#fff',
            list: deepOrange
        },
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
