import {types} from 'mobx-state-tree';

import {roofBarApi} from '@/utils/api';

// Define a couple models
const Category = types.model({
  id: types.number,
  title: types.string,
});

const CategoriesStore = types
  .model({
    drinks: types.array(Category),
    isLoading: types.boolean,
    isLoaded: types.boolean,
    error: types.string,
  })
  .actions(self => ({
    startLoading() {
      self.isLoading = true;
    },
    saveDataFromServer(categories) {
      self.categories = categories;
      self.isLoading = false;
      self.isLoaded = true;
    },
    async fetchData() {
      self.startLoading();
      const response = await roofBarApi.fetchCategories();
      const categories = response.payload;
      self.saveDataFromServer(categories);
    },
    async fetchDataIfNeeded() {
      if (!self.isLoaded) {
        await self.fetchData();
      }
    },
  }));

const initialState = {
  drinks: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export default {
  model: CategoriesStore,
  initialState: initialState,
};
