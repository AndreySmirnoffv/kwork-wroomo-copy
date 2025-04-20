import s from './BtnLink.module.scss';
import { ChildrenProps } from '@shared/types';
import Link from 'next/link';
import { forwardRef } from 'react';

type BtnLinkProps = {
  href: string;
  style?: 'primary' | 'secondary';
};

export const BtnLink = forwardRef<HTMLAnchorElement, ChildrenProps<BtnLinkProps>>(
  ({ children, href, style = 'secondary' }, ref) => {
    return (
      <Link className={`${s.btn} ${s[style]}`} href={href} ref={ref}>
        {children}
      </Link>
    );
  }
);

BtnLink.displayName = 'BtnLink';
