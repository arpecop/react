import React from 'react';


const Applist = () => {
  const apps = [{
    title: '🎄 Коледна баница с късмети 🎄',
    slug: 'banica',
  }, {
    title: '🎄 Изтегли си цитат-късметче 🎄',
    slug: 'quote',
  }];

  return apps.map((item) => (<h2 key={item.slug}><a href={item.slug}>{item.title}</a></h2>));
};
export default Applist;
