import React from 'react';
import PropTypes from 'prop-types';
import MuiContainer from '@material-ui/core/Container';
import Page from '@/components/Page';
import Orders from '@/sections/orders/Orders';
import {Role} from '@/utils/enums';
import {connectMobX} from '@/mobx';

const OrdersPage = ({store}) => {
  const fetchPageData = async () => {
    await Promise.all([store.ordersStore.fetchData()]);
  };

  React.useEffect(() => {
    fetchPageData();
  }, []);

  const shouldOrdersBeRendered = store.ordersStore.isLoaded;
  return (
    <Page access={[Role.BARMAN]} title="Orders">
      <MuiContainer>{shouldOrdersBeRendered ? <Orders /> : 'Loading...'}</MuiContainer>
    </Page>
  );
};

OrdersPage.propTypes = {
  store: PropTypes.object,
};

export default connectMobX(OrdersPage);
