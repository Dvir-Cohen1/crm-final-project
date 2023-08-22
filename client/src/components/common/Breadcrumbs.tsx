import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb, Button } from 'antd';
import Link from 'next/link';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

const Breadcrumbs = () => {
     const router = useRouter();
     const pathName = router.asPath.split('/').filter((x) => x);

     if (pathName.length === 0) {
          return null;
     }

     const items: ItemType[] = [
          {
               path: '/',
               title: 'Home',
               href: '/',
          },
     ];

     let url = '';

     pathName.forEach((item, index) => {
          url += `/${item}`;
          items.push({
               path: url,
               title: item,
               href: url,
          });
     });

     const itemRender = (route: any, _: [], routes: any) => {
          const isLast = routes.indexOf(route) === routes.length - 1;
          const link = route.href ? <div onClick={() => router.push('/' + route.href)} >{route.title}</div> : <span>{route.title}</span>;
          return isLast ? <div style={{ cursor: 'default', pointerEvents: 'none' }}>{route.title}</div> : link;
     };

     return (
          <section className='breadcrumb-section my-5'>
               <Breadcrumb itemRender={itemRender} items={items} />
          </section>
     )
          ;
};

export default Breadcrumbs;
