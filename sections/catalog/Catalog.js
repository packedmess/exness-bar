import React from 'react';
import PropTypes from 'prop-types';
import MuiContainer from '@material-ui/core/Container';
import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import {Element} from 'react-scroll';
import {connectMobX} from '@/mobx';
import CardList from './CardList';

const Catalog = ({store}) => {
  return (
    <MuiBox>
      <MuiContainer maxWidth="xl">
        {store.categoriesStore.categories.map(category => {
          const drinks = store.drinksStore.filterDrinksByCategory(category.id);

          if (drinks.length === 0) {
            return null;
          }

          return (
            <MuiBox key={category.id} py={2}>
              <Element name={category.title}>
                <MuiTypography variant="h3" component="h2" gutterBottom>
                  {category.title}
                </MuiTypography>
                <CardList drinks={drinks} />
              </Element>
            </MuiBox>
          );
        })}
      </MuiContainer>
    </MuiBox>
  );
};

Catalog.propTypes = {
  drinks: PropTypes.array,
  store: PropTypes.object,
};

export default connectMobX(Catalog);
