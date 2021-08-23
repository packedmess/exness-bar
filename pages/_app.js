import NextApp from 'next/app';
import PropTypes from 'prop-types';
import {Provider} from 'mobx-react';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PushNotificationsProvider from '@/components/PushNotificationsProvider';
import {withMobXStore} from '@/mobx';
import theme from '@/styles/theme';
import {roofBarApi} from '@/utils/api';

class App extends NextApp {
  static propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  state = {
    appIsLoading: true,
  };

  componentDidMount() {
    this.removeJssServerSide();
    this.fetchCurrentUserData();
  }

  removeJssServerSide() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  async fetchCurrentUserData() {
    const {store} = this.props;
    // Load user info into store if it hasn't been fetched from server yet
    if (!store.authStore.isInfoLoaded) {
      await roofBarApi.fetchCurrentUserData(store);
    }

    this.setState({
      appIsLoading: false,
    });
  }

  render() {
    const {Component, pageProps, store} = this.props;
    const {appIsLoading} = this.state;

    return (
      <Provider store={store}>
        <PushNotificationsProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {appIsLoading ? 'App is loading...' : <Component {...pageProps} />}
          </ThemeProvider>
        </PushNotificationsProvider>
      </Provider>
    );
  }
}

export default withMobXStore(App);
