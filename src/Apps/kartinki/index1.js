import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import axios from 'axios';

class FbLoginBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null, userID: null, name: null,
    };
    // this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = 'https://connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v7.0&appId=281985576166744&autoLogAppEvents=1';
    scriptTag.addEventListener('load', () => {
      window.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
      window.FB.getLoginStatus(self.onStatusChange.bind(self));
    });
    document.body.appendChild(scriptTag);
  }

  onStatusChange(response) {
    if (response.status === 'connected') {
      const { accessToken, userID } = response.authResponse;
      axios.get(`https://graph.facebook.com/me/?access_token=${accessToken}`)
        .then((response) => {
          this.setState({ accessToken, userID, name: response.data.name });
        });
    } else {
      this.setState({
        accessToken: null, userID: null,
      });
    }
  }

  render() {
    const { userID, name } = this.state;
    return (
      <div>

        {userID ? (
          <h1>
            Welcome

            {` ${name}`}
          </h1>
        ) : (
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="login_with"
            data-show-faces="false"
            data-auto-logout-link="true"
            data-use-continue-as="false"
          />
        )}

      </div>
    );
  }
}

export default FbLoginBtn;
