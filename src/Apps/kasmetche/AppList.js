import React from 'react';


const Applist = () => {
  const apps = [{
    title: '🎄 Новогодишна баница с късмети 2020 🎄',
    slug: 'banica',
  }, {
    title: '🎄 Изтегли си цитат-късметче 🎄',
    slug: 'quote',
  }];

  return apps.map((item) => (<h2 key={item.slug}><a href={item.slug}>{item.title}</a></h2>));
};
export default Applist;
