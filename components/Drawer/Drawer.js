import PropTypes from 'prop-types';
import MuiDrawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    minWidth: theme.spacing(40),
  },
}));

const Drawer = ({isDrawerOpened, handleDrawerClose, children}) => {
  const classes = useStyles();

  return (
    <div>
      <MuiDrawer onClose={handleDrawerClose} open={isDrawerOpened} classes={{paper: classes.drawerPaper}}>
        {children}
      </MuiDrawer>
    </div>
  );
};

Drawer.propTypes = {
  isDrawerOpened: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  children: PropTypes.node,
};

export default Drawer;
