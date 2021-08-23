import {types, flow} from 'mobx-state-tree';

import {roofBarApi} from '@/utils/api';

// Define a couple models
const Item = types.model({
  id: types.number,
  drink: types.frozen(),
  deleteProgress: types.model({
    error: types.string,
    isLoading: types.boolean,
  }),
  quantity: types.number,
  comment: types.string,
});

const CartStore = types
  .model({
    items: types.array(Item),
    isLoading: types.boolean,
    isLoaded: types.boolean,
    error: types.string,
    comment: types.string,
  })
  .actions(self => ({
    // Fetch logic
    startLoading() {
      self.isLoading = true;
    },
    saveDataFromServer(items) {
      self.items = items;
      self.isLoading = false;
      self.isLoaded = true;
    },
    async fetchData() {
      self.startLoading();
      const response = await roofBarApi.fetchCart();
      const items = response.payload.map(item => ({
        ...item,
        deleteProgress: {
          error: '',
          isLoading: false,
        },
        quantity: 1,
        comment: '',
      }));
      self.saveDataFromServer(items);
    },
    async fetchDataIfNeeded() {
      if (!self.isLoaded) {
        await self.fetchData();
      }
    },

    // Delete item logic
    deleteCartItem: flow(function* (id) {
      const item = self.findCartItemById(id);

      if (!item) {
        return;
      }

      item.deleteProgress.isLoading = true;
      const deleteResponse = yield roofBarApi.deleteCartItem(id);

      if (deleteResponse.success) {
        yield self.fetchData();
      } else {
        item.deleteProgress.error = `Error deleting cart item. Reason: ${deleteResponse.message}`;
        item.deleteProgress.isLoading = false;
      }
    }),

    // Change item logic
    changeItemQuantity(id, value) {
      self.findCartItemById(id).quantity = value;
    },
    changeItemComment(id, value) {
      self.findCartItemById(id).comment = value;
    },

    // Comment logic
    changeComment(value) {
      self.comment = value;
    },
  }))
  .views(self => ({
    findCartItemById(id) {
      return self.items.find(item => item.id === id);
    },
  }));

const initialState = {
  items: [],
  isLoading: false,
  isLoaded: false,
  error: '',
  comment: '',
};

export default {
  model: CartStore,
  initialState: initialState,
};
