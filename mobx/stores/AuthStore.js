import {types} from 'mobx-state-tree';

import {Role} from '@/utils/enums';

const UserInfo = types.model({
  avatar: types.string,
  role: types.enumeration('Role', ['', Role.BARMAN, Role.BUYER]),
  ['first_name']: types.string,
  ['last_name']: types.string,
});

// Main model
const AuthStore = types
  .model({
    info: UserInfo, // TODO: find correct type
    isLoggedIn: types.boolean,
    isInfoLoaded: types.boolean,
    error: types.string,
  })
  .actions(self => ({
    saveUserInfo(info) {
      self.info = info;
      self.isLoggedIn = true;
      self.isInfoLoaded = true;
      self.error = '';
    },
    clearUserInfo() {
      self.info = {
        avatar: '',
        role: '',
        ['first_name']: '',
        ['last_name']: '',
      };
      self.isLoggedIn = false;
      self.isInfoLoaded = false;
      self.error = '';
    },
  }))
  .views(self => ({
    get roleInfo() {
      return {
        isBarman: self.info.role === Role.BARMAN,
        isBuyer: self.info.role === Role.BUYER,
      };
    },
  }));

// Initial state for main model
const initialState = {
  info: {
    avatar: '',
    role: '',
    ['first_name']: '',
    ['last_name']: '',
  }, // Current user data
  isLoggedIn: false, // Is current user logged in
  isInfoLoaded: false, // Is current user logged in
  error: '', // Any errors from server
};

export default {
  model: AuthStore,
  initialState: initialState,
};
