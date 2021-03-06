import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
   root: {},
   mapContainer: {
      width: '100%',
      height: '800px',
      zIndex: 124,
      left: 0,
      top: 0,

      '&.fullSize': {
         width: '100vw',
         height: '100vh',
         position: 'absolute',
      }
   }
}));