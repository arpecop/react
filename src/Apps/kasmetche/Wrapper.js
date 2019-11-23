import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { FacebookProvider, LoginButton, ShareButton } from 'react-facebook';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Wrapper = ({ props, title, children }) => {
  const [cookies, setCookie] = useCookies(['name', 'id']);
  const [state, setState] = useImmer({

    loading: false,
    resultId: null,
    resultImg: null,
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
    const response = await axios(`https://grafix.herokuapp.com/?url=http://kasmetche.netlify.com/banica/shot/${data.profile.id}`);
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
  const { match } = props;
  return (
    <>
      {match ? (
        <HelmetProvider>
          <Helmet>
            <meta property="og:url" content={`https://kasmetche.netlify.com/${match.params.id}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={`https://grafix.herokuapp.com/${match.params.id}.jpg`} />
            <meta property="og:image:width" content="632" />
            <meta property="og:image:height" content="387" />
          </Helmet>
        </HelmetProvider>
      ) : null}
      {match && match.params.id2 === 'shot' 
        ? children
        : null}
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
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 'lighter' }}>
                  {`${title}`}
                </h1>
                <LoginButton
                  className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg"
                  onCompleted={handleResponse}
                >
                  <span>Изтегли си</span>
                </LoginButton>
              </div>
            ) : (
              <div>
                <img src={cookies.resultImg || state.resultImg} alt="" style={{ maxWidth: '100%' }} />
                <div style={{ textAlign: 'center' }}>
                  <ShareButton href={`https://kasmetche.netlify.com/${cookies.resultId || state.resultId}`} className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg">
                                            Сподели
                  </ShareButton>
                </div>
              </div>
            )}
          </FacebookProvider>
        </div>
      </div>
    </>
  );
};
export default Wrapper;
