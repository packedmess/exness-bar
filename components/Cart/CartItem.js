/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiListItem from '@material-ui/core/ListItem';
import MuiTooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import Counter from '@/components/Counter/Counter';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiTextField from '@material-ui/core/TextField';
import MuiDivider from '@material-ui/core/Divider';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto',
    gridTemplateRows: 'auto auto',
    gap: theme.spacing(1),
  },
  itemImageWrapper: {
    gridRow: '1/-1',
    width: 100,
    height: 100,
    [theme.breakpoints.down('sm')]: {
      gridRow: '1/2',
      width: 50,
      height: 50,
    },
  },
  itemImage: {objectFit: 'contain'},
  counter: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      marginLeft: -12,
    },
  },
  itemCancel: {
    marginRight: -12,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/-1',
      gridRow: '1/2',
    },
  },
  itemComment: {
    gridColumn: '2/-1',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
    },
  },
}));

const CartItem = ({item, handleItemQuantityChange, handleItemCommentChange, handleItemDelete}) => {
  const classes = useStyles();

  return (
    <>
      <MuiListItem className={classes.item}>
        <MuiAvatar
          variant="rounded"
          src={item.drink.picture}
          classes={{root: classes.itemImageWrapper, img: classes.itemImage}}
        />
        <MuiTypography>{item.drink.title}</MuiTypography>
        <div className={classes.counter}>
          <Counter name={item.id} onItemQuantityChange={handleItemQuantityChange} />
        </div>
        {item.deleteProgress.isLoading ? (
          <MuiCircularProgress size={48} color="default" thickness={1} className={classes.itemCancel} />
        ) : (
          <MuiIconButton color="default" className={classes.itemCancel} onClick={() => handleItemDelete(item.id)}>
            <MuiTooltip title="Remove" arrow>
              <CancelIcon />
            </MuiTooltip>
          </MuiIconButton>
        )}
        <MuiTextField
          label="Additional comments"
          variant="outlined"
          size="small"
          fullWidth
          name={item.id}
          className={classes.itemComment}
          onChange={event => handleItemCommentChange(item.id, event.target.value)}
        />
        {item.deleteProgress.deleteError && <div style={{color: 'red'}}>{item.deleteProgress.error}</div>}
      </MuiListItem>
      <MuiDivider />
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleItemQuantityChange: PropTypes.func.isRequired,
  handleItemCommentChange: PropTypes.func.isRequired,
  handleItemDelete: PropTypes.func.isRequired,
};

export default connectMobX(CartItem);
