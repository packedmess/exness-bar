import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiIconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiTypography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {marginRight: theme.spacing(2)},
  closeButton: {
    margin: '-12px',
    marginLeft: 'auto',
  },
}));

const Modal = ({isModalOpened, handleModalClose, title, children, isProfilePage, status}) => {
  const classes = useStyles();

  return (
    <div>
      <MuiDialog maxWidth="md" fullWidth={true} onClose={handleModalClose} open={isModalOpened}>
        <MuiDialogTitle disableTypography className={classes.header}>
          <MuiTypography variant="h4" component="h2" className={classes.title}>
            {title}
          </MuiTypography>
          {isProfilePage && (
            <MuiTypography variant="h4" component="h4" color="textSecondary">
              {status}
            </MuiTypography>
          )}
          <MuiIconButton onClick={handleModalClose} className={classes.closeButton}>
            <CloseIcon />
          </MuiIconButton>
        </MuiDialogTitle>
        <MuiDialogContent dividers>{children}</MuiDialogContent>
      </MuiDialog>
    </div>
  );
};

Modal.propTypes = {
  isModalOpened: PropTypes.bool,
  handleModalClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  isProfilePage: PropTypes.bool,
  status: PropTypes.string,
};

export default Modal;
