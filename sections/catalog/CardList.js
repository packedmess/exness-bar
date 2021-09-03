import React from 'react';
import PropTypes from 'prop-types';
import MuiBox from '@material-ui/core/Box';
import Modal from '@/components/Modal';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {roofBarApi} from '@/utils/api';
import Card from './Card';
import EditCard from './EditCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing(25)}px, 1fr))`,
    gap: theme.spacing(2),
  },
}));

const CardList = ({drinks, store}) => {
  const classes = useStyles();

  const [isModalOpened, setModalOpened] = React.useState(false);

  const [drinkToEdit, setDrinkToEdit] = React.useState(null);

  const handleModalOpen = id => {
    setDrinkToEdit(store.drinksStore.findDrink(id));
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleDrinkDelete = async id => {
    await roofBarApi.deleteDrink(id);

    await store.drinksStore.fetchFilteredData();
  };

  const handleAddToCart = async id => {
    await roofBarApi.addToCart(id);
    await store.cartStore.fetchData();
  };

  const isInCart = id => store.cartStore.items.some(item => item.drink.id === id);

  return (
    <>
      <MuiBox className={classes.root}>
        {drinks.map(drink => {
          return (
            <Card
              key={drink.id}
              drink={drink}
              handleModalOpen={handleModalOpen}
              handleDrinkDelete={handleDrinkDelete}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart(drink.id)}
            />
          );
        })}
      </MuiBox>
      <Modal isModalOpened={isModalOpened} handleModalClose={handleModalClose} title="Edit drink">
        <EditCard drink={drinkToEdit} />
      </Modal>
    </>
  );
};

CardList.propTypes = {
  drinks: PropTypes.array,
  store: PropTypes.object,
};

export default connectMobX(CardList);
