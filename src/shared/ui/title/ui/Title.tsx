import { HTMLAttributes, memo } from 'react';
import s from './Title.module.scss';
import classNames from '@shared/lib/classnames';
import { Props } from '../model/types';

export const Title = memo(
  ({
    el = 'h1',
    children,
    className,
    weight = 'regular',
    align = 'left',
    textAlign = 'left',
    ref,
    type = 'primary',
    withWrapper = false,
    ...props
  }: Props & HTMLAttributes<HTMLHeadingElement>) => {
    const Tag = el;
    const titleElement = (
      <Tag
        ref={ref}
        className={classNames(s.title, className, s[el], s[weight], s['text-' + textAlign], s[type])}
        {...props}>
        {children}
      </Tag>
    );

    if (!withWrapper) {
      return titleElement;
    }

    return <div className={classNames(s['title-wrapper'], s[align])}>{titleElement}</div>;
  }
);

Title.displayName = 'Title';
