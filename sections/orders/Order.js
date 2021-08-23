import React from 'react';
import PropTypes from 'prop-types';
import {getSnapshot} from 'mobx-state-tree';
import {Field, Form} from 'react-final-form';
import MuiBox from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiDivider from '@material-ui/core/Divider';
import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiList from '@material-ui/core/List';
import {TextField as MuiTextField, Select as MuiSelect} from 'mui-rff';
import {makeStyles} from '@material-ui/core/styles';
import {OrderItemStatus, OrderStatus} from '@/utils/enums';
import {roofBarApi} from '@/utils/api';
import {concatLinks} from '@/utils/url';
import {connectMobX} from '@/mobx';
import OrderItem from './OrderItem';

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

const validate = values => {
  const errors = {};

  // Declined Order should have comment
  if (values.status === OrderStatus.DECLINED && values.comment?.trim().length === 0) {
    errors.comment = 'Specify reasons for order decline';
  }

  // Each declined item should have filled reason
  for (const [key, value] of Object.entries(values)) {
    if (key.includes('products_') && value.status === OrderItemStatus.DECLINED && value.reason?.trim().length === 0) {
      errors[`products_${value.id}`] = 'Specify the reason for item decline';
    }
  }

  return errors;
};

const Order = ({onModalClose, order, renderDate, isProfilePage, store}) => {
  const classes = useStyles();

  // Map REST API Order scheme to Final Form initial values scheme
  const orderSnapshot = getSnapshot(order);
  const initialValues = {
    id: orderSnapshot.id,
    comment: orderSnapshot['barman_comment'],
    status: orderSnapshot.status,
  };

  for (const product of orderSnapshot.products) {
    initialValues[`products_${product.id}`] = product;
  }

  const handleSaveChanges = async values => {
    const products = Object.entries(values)
      .filter(([key]) => key.includes('products_'))
      // eslint-disable-next-line
      .map(([key, value]) => ({
        id: value.id,
        reason: value.reason,
        status: value.status,
      }));

    await roofBarApi.changeOrderStatus(values.id, values.status, values.comment, products);

    onModalClose();

    await store.ordersStore.fetchData();
  };

  return (
    <Form
      validate={validate}
      initialValues={initialValues}
      onSubmit={handleSaveChanges}
      render={({handleSubmit, submitting}) => (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <MuiBox mb={2}>
            <MuiGrid container alignItems="center" spacing={2}>
              <MuiGrid i Cart componenttem className={classes.customer}>
                <MuiAvatar
                  src={concatLinks(process.env.NEXT_PUBLIC_API_STORAGE_URL, order.user.avatar)}
                  className={classes.customerAvatar}
                />
                <MuiTypography>
                  {order.user['first_name']} {order.user['last_name']}
                </MuiTypography>
              </MuiGrid>
              <MuiGrid item>
                <MuiTypography>{renderDate(order['created_at'])}</MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiBox>
          <MuiBox mb={2}>
            <MuiTypography variant="h5" gutterBottom>
              Items
            </MuiTypography>
            <MuiList disablePadding>
              <MuiDivider />
              {order.products.map(product => (
                <Field name={`products_${product.id}`} key={product.id}>
                  {({input, meta}) => (
                    <OrderItem isProfilePage={isProfilePage} error={meta.touched && meta.error} {...input} />
                  )}
                </Field>
              ))}
            </MuiList>
          </MuiBox>
          <MuiBox mb={2}>
            <MuiTypography>Comments:</MuiTypography>
            <MuiTypography color="textSecondary">{order.comment !== '' ? order?.comment : 'None'}</MuiTypography>
          </MuiBox>
          <MuiGrid container spacing={2}>
            {!isProfilePage && (
              <MuiGrid item className={classes.status}>
                <MuiFormControl variant="outlined" size="small" fullWidth>
                  <MuiSelect name="status" labelId="status" variant="outlined" label="Status">
                    <MuiMenuItem value={OrderStatus.NEW}>New</MuiMenuItem>
                    <MuiMenuItem value={OrderStatus.IN_PROGRESS}>In progress</MuiMenuItem>
                    <MuiMenuItem value={OrderStatus.COMPLETED}>Completed</MuiMenuItem>
                    <MuiMenuItem value={OrderStatus.DECLINED}>Declined</MuiMenuItem>
                  </MuiSelect>
                </MuiFormControl>
              </MuiGrid>
            )}
            {isProfilePage ? (
              <MuiBox mb={2}>
                <MuiTypography>Barman comments:</MuiTypography>
                <MuiTypography color="textSecondary">
                  {order['barman_comment'] !== null ? order['barman_comment'] : 'None'}
                </MuiTypography>
              </MuiBox>
            ) : (
              <MuiGrid item className={classes.comment}>
                <MuiTextField
                  name="comment"
                  label="Comments"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                  defaultValue={order['barman_comment']}
                />
              </MuiGrid>
            )}
          </MuiGrid>
          {!isProfilePage && (
            <div className={classes.footer}>
              <MuiButton variant="contained" color="primary" type="submit" disabled={submitting}>
                Save changes
              </MuiButton>
            </div>
          )}
        </form>
      )}
    />
  );
};

Order.propTypes = {
  store: PropTypes.object,
  onModalClose: PropTypes.func,
  order: PropTypes.object,
  renderDate: PropTypes.func,
  isProfilePage: PropTypes.bool,
};

export default connectMobX(Order);
