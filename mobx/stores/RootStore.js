import {types} from 'mobx-state-tree';

import AuthStore from '@/mobx/stores/AuthStore';
import DrinksStore from '@/mobx/stores/DrinksStore';
import CategoriesStore from '@/mobx/stores/CategoriesStore';
import CartStore from '@/mobx/stores/CartStore';
import OrdersStore from '@/mobx/stores/OrdersStore';

// Define a store just like a model
export const model = types.model({
  authStore: AuthStore.model,
  drinksStore: DrinksStore.model,
  categoriesStore: CategoriesStore.model,
  cartStore: CartStore.model,
  ordersStore: OrdersStore.model,
});

// Define an initial states of all stores
export const initialState = {
  authStore: AuthStore.initialState,
  drinksStore: DrinksStore.initialState,
  categoriesStore: CategoriesStore.initialState,
  cartStore: CartStore.initialState,
  ordersStore: OrdersStore.initialState,
};
