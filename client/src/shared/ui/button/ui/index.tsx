import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import s from './Button.module.scss';

type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button ref={ref} className={s.button} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
