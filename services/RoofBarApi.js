import qs from 'query-string';
import {serialize} from 'object-to-formdata';
import Api from '@/services/Api';
import {isClient} from '@/utils/env';

/**
 * Extended Api class with custom functions specific for RoofBar REST API
 * @class RoofBarApi
 * @extends Api
 */
export default class RoofBarApi extends Api {
  /**
   * Get token from localStorage, add it to headers and returns class itself for chaining
   * @returns {RoofBarApi}
   */
  withToken() {
    this.baseOptions.headers.Authorization = `Token ${this.token}`;

    // barman
    // this.baseOptions.headers.Authorization = `Token f205086b98fe60ea9db089446b837ff38c034eca`;

    return this;
  }

  /**
   * Save token to localStorage
   * @return {string}
   */
  get token() {
    if (!isClient) {
      return '';
    }

    return localStorage.getItem('roofBarToken');
  }

  /**
   * Get token from localStorage
   * @param value {string}
   */
  set token(value) {
    if (!isClient) {
      return;
    }

    localStorage.setItem('roofBarToken', value);
  }

  /**
   * Removes token from localStorage
   */
  removeToken() {
    if (!isClient) {
      return;
    }

    localStorage.removeItem('roofBarToken');
  }

  /**
   * Opens Facebook login dialog with redirect back to this app
   */
  openFbLoginDialog() {
    const oauthParams = {
      ['client_id']: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      ['redirect_uri']: process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_REDIRECT_TO,
      ['state']: Date.now(),
    };

    window.location.href = `https://www.facebook.com/v10.0/dialog/oauth?${qs.stringify(oauthParams)}`;
  }

  /**
   * Opens Google login dialog with redirect back to this app
   */
  openGoogleLoginDialog() {
    const oauthParams = {
      ['client_id']: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
      ['redirect_uri']: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_TO,
      ['response_type']: 'code',
      ['scope']: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    };

    window.location.href = `https://accounts.google.com/o/oauth2/auth?${qs.stringify(oauthParams)}`;
  }

  /**
   * Fetch REST API bearer token, save it in Cookies and return boolean value of success or failure
   * @see https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
   * @return {Promise<ApiResponse>}
   */
  async fetchAndSaveToken() {
    const query = qs.parse(window.location.search);

    // Possible errors
    if (query.error) {
      return this.makeResponse({}, -1, query.error);
    }

    if (!query.code) {
      return this.makeResponse({}, -1, '"code" field is not specified by OAuth provider');
    }

    if (!query.provider) {
      return this.makeResponse({}, -1, '"provider" field is not specified in redirect URL');
    }

    // Set up correct redirect URL
    let redirectURI;
    switch (query.provider) {
      case 'facebook':
        redirectURI = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_REDIRECT_TO;
        break;
      case 'google-oauth2':
        redirectURI = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_TO;
        break;
      default:
        redirectURI = '';
    }

    // Auth through app REST API and get token from response
    const apiRes = await this.post({
      route: '/login/social/token/',
      data: {
        provider: query.provider,
        code: query.code,
        ['redirect_uri']: redirectURI,
      },
    });

    if (!apiRes.success) {
      return apiRes;
    }

    // Save token in localStorage
    this.token = apiRes.payload.token;
    return apiRes;
  }

  /**
   * Validates auth by token on server and save user data to store
   * @param store {Object}
   * @return {Promise<void>|Object}
   */
  async fetchCurrentUserData(store) {
    // no token, no auth
    if (!this.token) {
      return;
    }

    const {authStore} = store;
    const response = await this.withToken().get({route: '/whoami/'});

    if (!response.success) {
      this.removeToken();
      authStore.clearUserInfo();
      return;
    }

    // Save info about current user into store
    authStore.saveUserInfo(response.payload);
  }

  async fetchCategories() {
    return await this.withToken().get({
      route: '/categories/',
      data: {},
    });
  }

  async fetchFilteredDrinks(filter) {
    return await this.withToken().get({
      route: `/drinks/?${filter}`,
      data: {},
    });
  }

  async addDrink(formData) {
    return await this.withToken().post({
      route: '/drinks/',
      data: serialize(formData),
      dataType: 'form-data',
    });
  }

  async editDrink(id, formData) {
    return await this.withToken().patch({
      route: `/drinks/${id}/`,
      data: serialize(formData),
      dataType: 'form-data',
    });
  }

  async deleteDrink(id) {
    return await this.withToken().delete({
      route: `/drinks/${id}/`,
      data: {id},
    });
  }

  async addToCart(id) {
    return await this.withToken().post({
      route: `/cart/add/`,
      data: {['drink_id']: id},
    });
  }

  async fetchCart() {
    return await this.withToken().get({
      route: '/cart/',
      data: {},
    });
  }

  async deleteCartItem(id) {
    return await this.withToken().delete({
      route: `/cart/${id}/`,
      data: {id},
      convertResponseData: 'text',
    });
  }

  async fetchOrders() {
    return await this.withToken().get({
      route: '/orders/',
      data: {},
    });
  }

  async addOrder(cartItems, comment) {
    return await this.withToken().post({
      route: '/orders/',
      convertResponseData: 'text',
      data: {
        comment,
        products: cartItems.map(({id, comment, quantity}) => ({
          id,
          comment,
          quantity,
        })),
      },
    });
  }

  async changeOrderStatus(id, status, comment, products) {
    return await this.withToken().post({
      route: `/orders/${id}/change-status/${status}/`,
      data: {
        comment,
        products: products.map(({id, reason, status}) => ({
          id,
          reason,
          status,
        })),
      },
    });
  }

  async subscibeToPushNotifications(subscriptionOptions) {
    return await this.withToken().post({
      route: '/webpush/subscribe/',
      convertResponseData: 'text',
      data: {
        ['subscription_options']: subscriptionOptions,
      },
    });
  }
}
