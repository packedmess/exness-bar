import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MuiContainer from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
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

  const [categoryData, setCategoryData] = useState([]);

  const drinksByCategoryData = store.categoriesStore.categories.reduce((acc, category) => {
    const drinks = store.drinksStore.filterDrinksByCategory(category.id);

    if (drinks.length === 0) return acc;

    return [
      ...acc,
      {
        category,
        isActive: false,
        drinks,
      },
    ];
  }, []);

  const allCategoryData = [
    {
      category: {
        id: 0,
        title: 'All',
      },
      isActive: true,
      drinks: store.drinksStore,
    },
    ...drinksByCategoryData,
  ];

  useEffect(() => {
    setCategoryData(allCategoryData);
  }, []);

  const handleSetFilterByCategory = id => {
    const newCategoryData = categoryData.map(item => {
      if (item.category.id === id) {
        return {
          ...item,
          isActive: true,
        };
      }
      return {
        ...item,
        isActive: false,
      };
    });

    setCategoryData(newCategoryData);

    const activeCategory = newCategoryData.find(item => item.isActive === true);
    const activeCategoryId = activeCategory.category.id;

    store.drinksStore.fetchFilteredData(activeCategoryId === 0 ? '' : `category_id=${activeCategoryId}`);
  };

  return (
    <MuiBox>
      <MuiContainer maxWidth="xl">
        <MuiBox paddingY={2} className={classes.chipList}>
          {categoryData.map(item => {
            return (
              <MuiChip
                key={item.category.id}
                label={item.category.title}
                clickable
                color={item.isActive ? 'primary' : ''}
                className={classes.chip}
                onClick={() => handleSetFilterByCategory(item.category.id)}
              />
            );
          })}
        </MuiBox>
        {drinksByCategoryData.map(item => {
          return (
            <MuiBox key={item.category.id} paddingBottom={2}>
              <MuiTypography variant="h3" component="h2" gutterBottom>
                {item.category.title}
              </MuiTypography>
              <CardList drinks={item.drinks} />
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
