import React from 'react';
import PropTypes from 'prop-types';
import Catalog from '@/sections/catalog/Catalog';
import Page from '@/components/Page';
import {Role} from '@/utils/enums';
import {connectMobX} from '@/mobx';

const CatalogPage = ({store}) => {
  const fetchPageData = async () => {
    await Promise.all([store.categoriesStore.fetchData(), store.cartStore.fetchData(), store.ordersStore.fetchData()]);
  };

  React.useEffect(() => {
    fetchPageData();
  }, []);

  const shouldCatalogBeRendered = store.categoriesStore.isLoaded && store.drinksStore.isLoaded;

  return (
    <Page access={[Role.BARMAN, Role.BUYER]} title="Catalog" isCatalogPage>
      {shouldCatalogBeRendered ? <Catalog /> : 'Loading...'}
    </Page>
  );
};

CatalogPage.propTypes = {
  store: PropTypes.object,
};

export default connectMobX(CatalogPage);
