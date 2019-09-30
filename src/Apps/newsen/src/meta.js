import React from 'react';
import { Helmet } from 'react-helmet';
export const Meta = ({ single }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{single.title}</title>
      <meta property="og:url" content={`https://novinata.netlify.com/${single._id}`} />
      <meta property="og:title" content={single.title} />
      <meta
        property="og:description"
        content="Veed is a simple but powerfull video editor, try our free video editor to, resize video, trim video add loads more!"
      />
      <meta property="og:image" content={single.urlToImage} />
      <meta property="og:image:url" content={single.urlToImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@JoanaTuba" />
      <meta name="twitter:creator" content="@JoanaTuba" />
      <meta property="og:url" content={`https://novinata.netlify.com/${single._id}`} />
      <meta property="og:title" content={single.title} />
      <meta property="og:description" content={single.title} />
      <meta property="og:image" content={single.urlToImage} />
    </Helmet>
  );
};
