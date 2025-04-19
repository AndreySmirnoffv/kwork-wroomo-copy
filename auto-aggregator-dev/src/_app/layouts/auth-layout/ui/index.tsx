'use client';

import s from './AuthLayout.module.scss';
import { ChildrenProps } from '@shared/types';
import { LogoIcon } from '@shared/assets';
import Link from 'next/link';
import { PathNames } from '@shared/const';
import { usePathname } from 'next/navigation';
import { pathData, pathDataKeyType } from '../model';
import { Title } from '@shared/ui';

export const AuthLayout = ({ children }: ChildrenProps) => {
  const pathname = (usePathname().replace('/auth', '').replace(/^\//, '') || 'login') as pathDataKeyType;
  const data = pathData[pathname];
  const dataLink = data['link'];

  return (
    <section className={s.container}>
      <header className={s.header}>
        <Link href={PathNames.root.r} className={s.logo}>
          <LogoIcon />
        </Link>
      </header>
      <div className={s.content}>
        <section className={s.top}>
          <Title className={s.title} textAlign='center' weight='medium' el='h2'>
            {data.title}
          </Title>
          <p>
            {data.text} <Link href={dataLink.href}>{dataLink.text}</Link>
          </p>
        </section>
        {children}
      </div>
      <footer className={s.footer}>
        <small>Copyright © 2024 Wroomo. All Rights Reserved.</small>
      </footer>
    </section>
  );
};
