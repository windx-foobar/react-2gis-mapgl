import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: '1rem',
      marginLeft: '.5rem',
      marginRight: '.5rem'
   },
   buttonWrapper: {
      padding: '0 5px',
      marginBottom: '.5rem',

      '& > button': {
         padding: '5px 10px',
         backgroundColor: '#006db3',
         outline: 'none',
         color: 'white',
         border: 0,
         fontSize: '1rem',
         fontWeight: 'bold',
         cursor: 'pointer',
         borderRadius: '5px'
      }
   },
   infoWrapper: {
      flex: '0 0 85%',
      maxWidth: '85%',
      margin: '0 0 1rem 10px'
   }
}));