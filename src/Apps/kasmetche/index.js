import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import 'antd/dist/antd.css';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { useCookies } from 'react-cookie';
import {
  Button,
} from 'antd';

const Imagex = ({ url }) => {
  const [image] = useImage(url);
  return <Image image={image} />;
};
const App = (props) => {
  const [cookies, setCookie] = useCookies(['name', 'id']);
  const [state, setState] = useImmer({
    name: 'Michel',
  });
  function updateName(name) {
    setState((draft) => {
      draft.name = name;
    });
  }
  useEffect(() => {
    async function mount() {
      setState((draft) => {
        draft.name = 'Ivan';
      });
    }
    mount();
  }, []);
  const handleResponse = (data) => {
    setCookie('name', data.profile.first_name, { path: '/' });
    setCookie('id', data.profile.id, { path: '/' });
    setState((draft) => {
      draft.name = data.profile.first_name;
      draft.id = data.profile.id;
    });
  };

  const handleError = (error) => {
    this.setState({ error });
  };
  return (
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
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer y={21}>
                  <Imagex url="https://konvajs.org/assets/lion.png" x={21} />
                </Layer>
              </Stage>
              <button className="ant-btn ant-btn-primary ant-btn-round ant-btn-lg">Сподели</button>

            </div>
          )}

        </FacebookProvider>
      </div>


    </div>
  );
};
export default App;
