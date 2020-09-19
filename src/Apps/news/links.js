import React from 'react';

const link = [
  { id: 1, url: 'https://duh.netlify.com', link: 'Blog' },
  { id: 2, url: 'https://arpecop.xyz', link: 'Вицове' },
  {
    id: 3,
    url: 'https://freeteenpicsandmovies.netlify.app',
    link: 'Free teen pics',
  },
  { id: 4, url: 'https://rudixlab.com', link: 'DevOps Bulgaria' },
  { id: 5, url: 'https://novinata.netlify.app/', link: 'Новини' },
  { id: 5, url: 'https://news.rudixlab.com/', link: 'Новини 2' },
];

const Links = () => (
  <>
    {link.map((item) => (
      <a key={item.id} href={item.url} style={{ marginLeft: 5 }}>
        {item.link}
      </a>
    ))}
  </>
);

export default Links;
