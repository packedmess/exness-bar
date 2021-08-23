import {types} from 'mobx-state-tree';

import {roofBarApi} from '@/utils/api';

// Define a couple models
const Drink = types.model({
  id: types.number,
  category: types.frozen(),
  title: types.string,
  description: types.string,
  volume: types.frozen(),
  ['has_alcohol']: types.boolean,
  ['is_hot']: types.boolean,
  ingredients: types.frozen(),
  picture: types.frozen(),
  ['is_out_of_stock']: types.boolean,
});

const DrinksStore = types
  .model({
    drinks: types.array(Drink),
    isLoading: types.boolean,
    isLoaded: types.boolean,
    error: types.string,
  })
  .views(self => ({
    findDrink(id) {
      return self.drinks.find(drink => drink.id === id);
    },
    filterDrinksByCategory(id) {
      return self.drinks.filter(drink => drink.category.id === id);
    },
  }))
  .actions(self => ({
    startLoading() {
      self.isLoading = true;
    },
    saveDataFromServer(drinks) {
      self.drinks = drinks;
      self.isLoading = false;
      self.isLoaded = true;
    },
    async fetchFilteredData(filter) {
      self.startLoading();
      const response = await roofBarApi.fetchFilteredDrinks(filter);
      const drinks = response.payload;
      self.saveDataFromServer(drinks);
    },
  }));

const initialState = {
  drinks: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export default {
  model: DrinksStore,
  initialState: initialState,
};
