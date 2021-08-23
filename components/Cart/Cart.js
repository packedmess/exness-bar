import React from 'react';
import PropTypes from 'prop-types';
import MuiBox from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiTextField from '@material-ui/core/TextField';
import MuiDivider from '@material-ui/core/Divider';
import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiList from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {roofBarApi} from '@/utils/api';
import CartItem from './CartItem';

const useStyles = makeStyles(theme => ({
  customer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  customerAvatar: {
    marginRight: theme.spacing(1),
  },
  status: {
    minWidth: theme.spacing(20),
  },
  comment: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const Cart = ({handleModalClose, store}) => {
  const classes = useStyles();
  const {cartStore} = store;

  const handleItemDelete = id => {
    cartStore.deleteCartItem(id);
  };

  if (cartStore.items.length < 1) {
    handleModalClose();
  }

  const handleOrder = async () => {
    await roofBarApi.addOrder(cartStore.items, cartStore.comment);
    await store.cartStore.fetchData();
    handleModalClose();
  };

  return (
    <>
      <MuiBox mb={2}>
        <MuiTypography variant="h5" gutterBottom>
          Items
        </MuiTypography>
        <MuiList disablePadding>
          <MuiDivider />
          {store.cartStore.items.map(item => {
            return (
              <CartItem
                key={item.id}
                item={item}
                handleItemCommentChange={cartStore.changeItemComment}
                handleItemQuantityChange={cartStore.changeItemQuantity}
                handleItemDelete={handleItemDelete}
              />
            );
          })}
        </MuiList>
      </MuiBox>

      <MuiGrid container spacing={2}>
        <MuiGrid item className={classes.comment}>
          <MuiTextField
            label="Comments"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={3}
            onChange={event => cartStore.changeComment(event.target.value)}
          />
        </MuiGrid>
      </MuiGrid>

      <div className={classes.footer}>
        <MuiButton variant="contained" color="primary" onClick={handleOrder}>
          Order
        </MuiButton>
      </div>
    </>
  );
};

Cart.propTypes = {
  store: PropTypes.object,
  handleModalClose: PropTypes.func,
};

export default connectMobX(Cart);
