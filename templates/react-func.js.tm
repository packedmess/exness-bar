import PropTypes from 'prop-types';
import cn from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
}));

function ${TM:COMPONENT_NAME}({className}) {
  const classes = useStyles();

  return (
    <div className={cn(classes.root, className)}>
      ${TM:COMPONENT_NAME} component
    </div>
  );
}

${TM:COMPONENT_NAME}.defaultProps = {
  className: '',
};

${TM:COMPONENT_NAME}.propTypes = {
  className: PropTypes.string,
};

export default ${TM:COMPONENT_NAME};
