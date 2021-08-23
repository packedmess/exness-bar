import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MuiIconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    width: theme.spacing(6),
    '& input': {textAlign: 'center'},
  },
}));

const Counter = ({name, onItemQuantityChange}) => {
  const classes = useStyles();

  const [count, setCount] = React.useState(1);

  const increaseCount = () => {
    setCount(count + 1);
    onItemQuantityChange(name, count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
      onItemQuantityChange(name, count - 1);
    }
  };

  return (
    <div className={classes.root}>
      <MuiIconButton onClick={decreaseCount} disabled={count === 1}>
        <RemoveCircleIcon />
      </MuiIconButton>
      <MuiTextField
        variant="outlined"
        size="small"
        value={count}
        disabled
        className={classes.field}
        name={name}
        onChange={onItemQuantityChange}
      />
      <MuiIconButton onClick={increaseCount}>
        <AddCircleIcon />
      </MuiIconButton>
    </div>
  );
};

Counter.propTypes = {
  isDrawerOpened: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.number,
  onItemQuantityChange: PropTypes.func,
};

export default Counter;
