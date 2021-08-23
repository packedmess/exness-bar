import {types} from 'mobx-state-tree';

import {roofBarApi} from '@/utils/api';

// Define a couple models
const Product = types.model({
  id: types.number,
  drink: types.frozen(),
  comment: types.optional(types.string, '', [null]),
  reason: types.optional(types.string, '', [null]),
  status: types.number,
  quantity: types.number,
});

const Item = types.model({
  id: types.number,
  products: types.array(Product),
  user: types.frozen(),
  comment: types.frozen(),
  status: types.number,
  ['created_at']: types.string,
  ['barman_comment']: types.frozen(),
});

const OrdersStore = types
  .model({
    items: types.array(Item),
    isLoading: types.boolean,
    isLoaded: types.boolean,
    error: types.string,
  })
  .views(self => ({
    findItem(id) {
      return self.items.find(item => item.id === id);
    },
  }))
  .actions(self => ({
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
      const response = await roofBarApi.fetchOrders();
      const items = response.payload;
      self.saveDataFromServer(items);
    },
    async fetchDataIfNeeded() {
      if (!self.isLoaded) {
        await self.fetchData();
      }
    },
    // Change item logic
    changeItemComment(id, value) {
      self.findItemById(id)['barman_comment'] = value;
    },
    changeItemStatus(id, value) {
      self.findItemById(id).status = value;
    },
    changeOrderItemStatus(orderId, itemId) {
      const itemToChange = self.findItemById(orderId).products.find(item => item.id === itemId);
      itemToChange.status = 4;
    },
    changeOrderItemComment(orderId, itemId, value) {
      const itemToChange = self.findItemById(orderId).products.find(item => item.id === itemId);
      itemToChange.reason = value;
    },
    // Comment logic
    changeComment(value) {
      self.comment = value;
    },
  }))
  .views(self => ({
    findItemById(id) {
      return self.items.find(item => item.id === id);
    },
  }));

const initialState = {
  items: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export default {
  model: OrdersStore,
  initialState: initialState,
};
