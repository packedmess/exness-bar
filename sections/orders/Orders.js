import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import MuiBox from '@material-ui/core/Box';
import {connectMobX} from '@/mobx';
import OrderList from './OrderList';

const Orders = ({store, isProfilePage}) => {
  const {isBarman} = store.authStore.roleInfo;

  return (
    <MuiBox py={2}>
      <MuiTypography variant="h3" component="h2" gutterBottom>
        {isBarman ? 'Orders' : 'My orders'}
      </MuiTypography>
      <OrderList isBarman={isBarman} isProfilePage={isProfilePage} />
    </MuiBox>
  );
};

Orders.propTypes = {
  store: PropTypes.object,
  isProfilePage: PropTypes.bool,
};

export default connectMobX(Orders);
