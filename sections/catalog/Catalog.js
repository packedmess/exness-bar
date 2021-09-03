import React from 'react';
import PropTypes from 'prop-types';
import MuiContainer from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import {Element} from 'react-scroll';
import {connectMobX} from '@/mobx';
import MuiChip from '@material-ui/core/Chip';
import CardList from './CardList';

const useStyles = makeStyles(theme => ({
  chipList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: theme.typography.body2,
}));

const Catalog = ({store}) => {
  const classes = useStyles();

  // const drinksByCategory = store.categoriesStore.categories.reduce((acc, meta) => {
  //   const drinks = store.drinksStore.filterDrinksByCategory(meta.id);

  //   if (drinks.length === 0) return acc;

  //   return [
  //     ...acc,
  //     {
  //       meta,
  //       drinks,
  //     },
  //   ];
  // }, []);

  const data = store.categoriesStore.categories
    .map(category => {
      const drinks = store.drinksStore.filterDrinksByCategory(category.id);

      if (drinks.length === 0) {
        return null;
      }

      return {category, drinks};
    })
    .filter(item => item !== null);

  return (
    <MuiBox>
      <MuiContainer maxWidth="xl">
        <MuiBox paddingY={2} className={classes.chipList}>
          {data.map(item => {
            return (
              <MuiChip key={item.category.id} label={item.category.title} clickable color="" className={classes.chip} />
            );
          })}
        </MuiBox>
        {data.map(item => {
          return (
            <MuiBox key={item.category.id} paddingBottom={2}>
              <Element name={item.category.title}>
                <MuiTypography variant="h3" component="h2" gutterBottom>
                  {item.category.title}
                </MuiTypography>
                <CardList drinks={item.drinks} />
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
