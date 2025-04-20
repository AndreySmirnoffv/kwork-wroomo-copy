import { LogoIcon } from '@shared/assets';
import s from './Header.module.scss';
import Link from 'next/link';
import { PathNames } from '@shared/const';
import { navList } from '../model';
import { HeaderActions } from '@features/header-actions';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link className={s.logo} href={PathNames.root.r}>
          <LogoIcon />
        </Link>
        <ul className={s.nav}>
          {navList.map(item => (
            <li key={item.id}>
              <Link href={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>
        <HeaderActions />
      </div>
    </header>
  );
};
