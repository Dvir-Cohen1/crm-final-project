import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

const Breadcrumbs = () => {
     const router = useRouter();
     const pathName = router.asPath.split('/').filter((x) => x);

     if (pathName.length === 0) {
          return null;
     }

     const items = [
          {
               path: '/',
               breadcrumbName: 'Home',
               href: '/',
          },
     ];

     let url = '';

     pathName.forEach((item, index) => {
          url += `/${item}`;
          items.push({
               path: url,
               breadcrumbName: item,
               href: url,
          });
     });

     const itemRender = (route: any, _: [], routes: any) => {
          const isLast = routes.indexOf(route) === routes.length - 1;
          const link = route.href ? <Link href={route.href}>{route.title}</Link> : <span>{route.title}</span>;
          return isLast ? <span>{route.title}</span> : link;
     };

     return (
          <section className='breadcrumb-section my-5'>
               <Breadcrumb itemRender={itemRender} routes={items} />
          </section>
     )
          ;
};

export default Breadcrumbs;
