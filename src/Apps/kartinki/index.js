import React, { Component } from 'react';

import { Helmet } from 'react-helmet';

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
    scriptTag.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2https://connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v6.0&appId=281985576166744&autoLogAppEvents=1.4&appId=281985576166744';
    scriptTag.addEventListener('load', () => {
      window.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
      window.FB.getLoginStatus(self.onStatusChange.bind(self));
    });
    document.body.appendChild(scriptTag);
  }

  onStatusChange(response) {
    if (response.status === 'connected') {
      const { accessToken, userID } = response.authResponse;
      console.log(response.authResponse);


      fetch(`https://graph.facebook.com/me/?access_token=${accessToken}`)
        .then((res) => res.json())
        .then((data) => {
          // Work with JSON data here
          this.setState({ accessToken, userID, name: data.name });
          console.log(data);
        })
        .catch((err) => {
          // Do something for an error here
        });
    } else {
      // this.onFailure();
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

            {name}
          </h1>
        ) : (
          <div
            className="fb-login-button"
            data-width={this.props.width}
            data-max-rows="1"
            data-size="large"
            data-button-type="login_with"
            data-show-faces="false"
            data-auto-logout-link="true"
            data-use-continue-as="false"
            data-scope={this.props.dataScope}
          />
        )}

      </div>
    );
  }
}

export default FbLoginBtn;
