import React from 'react';
import useAxios from 'axios-hooks';
import { Helmet } from 'react-helmet';
import 'antd/dist/antd.css';
// or 'antd/dist/antd.less'
function App(props) {
  const { isIndex, match } = props;
  const [{ data, loading, error }] = useAxios(
    `//db.arpecop.xyz/porn/_all_docs?limit=25${isIndex ? '' : `&start_key="${match.params.id}"`}`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <Helmet>
        <title>kartinki</title>
        <meta
          property="og:url"
          content={`https://kartinki.netlify.com/${data.rows[0].key}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="kartinki" />

        <meta
          property="og:image"
          content={`https://s3.eu-west-1.amazonaws.com/imgserve.fbook.space/${data.rows[0].value.md5}.jpg`}
        />
        <meta property="og:image:width" content={data.rows[0].value.w} />
        <meta property="og:image:height" content={data.rows[0].value.h} />
        <meta property="fb:app_id" content="770341770061627" />
      </Helmet>
      {data.rows.map((item) => (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <hr />
          <a key={item.id} href={`/${item.id}`}>
            <img
              alt=""
              src={`https://s3.eu-west-1.amazonaws.com/imgserve.fbook.space/${item.value.md5}.jpg`}
              style={{ maxWidth: '100%' }}
            />
          </a>
          <div>
            <a
              className="ant-btn ant-btn-primary"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://kartinki.netlify.com/${item.key}`}
            >
              Сподели
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;
