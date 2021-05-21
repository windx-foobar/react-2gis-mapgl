import { makeStyles } from '@material-ui/styles';
export default makeStyles(function (theme) { return ({
    root: {
        position: 'absolute',
        transform: 'translate(-50%, -105%)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '280px',
    },
    content: {
        fontSize: '14px',
        padding: '10px 10px 15px',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0 1px 2px 0 rgba(38, 38, 38, 0.2)',
    },
    closeButton: {
        textAlign: 'right',
    },
    closeButtonIcon: {
        fontSize: '16px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
    },
    tip: {
        width: 0,
        height: 0,
        alignSelf: 'center',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid #fff',
        position: 'relative',
        top: '-2px',
    }
}); });
