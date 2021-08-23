import {PureComponent} from 'react';

import Page from '@/components/Page';
import {roofBarApi} from '@/utils/api';

class Login extends PureComponent {
  componentDidMount() {
    this.fetchAndSaveToken();
  }

  async fetchAndSaveToken() {
    const {success, message} = await roofBarApi.fetchAndSaveToken();

    if (!success) {
      alert(`Error logging in. Reason: ${message}`);
    }

    window.location.replace('/');
  }

  render() {
    return (
      <Page title="Login redirect" shouldLayoutRender={false}>
        <p>Please wait...</p>
      </Page>
    );
  }
}

export default Login;
