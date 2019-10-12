import React, { useState } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { useCookies } from 'react-cookie';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
const App = () => {
  const [count, setCount] = useState({});
  const [cookies, setCookie] = useCookies(['profile']);
  const handleResponse = data => {
    console.log(data);
    setCookie('profile', data, { path: '/' });
    setCount(data);
  };

  const handleError = error => {
    this.setState({ error });
  };
  return (
    <Row type="flex" justify="center" align="middle" style={{ backgroundColor: 'red' }}>
      <FacebookProvider appId="505742793540575">
        {count.profile || cookies.profile ? (
          <div> </div>
        ) : (
          <div>
            <Col span={1} style={{ height: 200 }}></Col>
            <LoginButton scope="email" onCompleted={handleResponse} onError={handleError}>
              <span>Login via Facebook</span>
            </LoginButton>
            <Col span={1} style={{ height: 200 }}></Col>
          </div>
        )}
      </FacebookProvider>
    </Row>
  );
};
export default App;
