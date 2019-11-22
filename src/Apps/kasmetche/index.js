import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import 'antd/dist/antd.css';
import { FacebookProvider, LoginButton, ShareButton } from 'react-facebook';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const App = (props) => {
  const [cookies, setCookie] = useCookies(['name', 'id']);
  const [state, setState] = useImmer({
    name: 'Michel',
  });

  useEffect(() => {
    async function mount() {
      setState((draft) => {
        draft.name = 'Ivan';
      });
    }
    mount();
  }, []);
  const handleResponse = async (data) => {
    setState((draft) => {
      draft.loading = true;
    });
    const response = await axios('https://grafix.herokuapp.com/?url=http://kasmetche.netlify.com/banica/shot');
    setCookie('name', data.profile.first_name, { path: '/' });
    setCookie('id', data.profile.id, { path: '/' });
    setCookie('resultImg', response.data.id, { path: '/' });
    setCookie('resultId', response.data._id, { path: '/' });
    setState((draft) => {
      draft.name = data.profile.first_name;
      draft.id = data.profile.id;
      draft.resultImg = response.data.id;
      draft.resultId = response.data._id;
      draft.loading = false;
    });
  };

  const handleError = (error) => {
    this.setState({ error });
  };
  return (
    <HelmetProvider>
      <Helmet>

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Коледна Баница с късмети" />
        <meta property="og:image" content="https://grafix.herokuapp.com/" />
      </Helmet>
      <div
        className="App"
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'inline-block' }}>
          <FacebookProvider appId="2839078742783517">
            {state.loading ? (<div>Loading</div>) : null}
            {!cookies.name ? (
              <div>

                <h1>Коледна баница с късмети</h1>
                <LoginButton
                  className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg"
                  onCompleted={handleResponse}
                  onError={handleError}
                >
                  <span>Изтегли си</span>
                </LoginButton>
              </div>

            ) : (
              <div>

                <img src={cookies.resultImg || state.resultImg} alt="" style={{ maxWidth: '100%' }} />
                <div style={{ textAlign: 'center' }}>

                  <ShareButton href="http://www.facebook.com" className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg">
                      Сподели
                  </ShareButton>
                </div>
              </div>
            )}

          </FacebookProvider>
        </div>
      </div>
    </HelmetProvider>
  );
};
export default App;
