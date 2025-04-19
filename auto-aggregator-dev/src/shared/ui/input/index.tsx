'use client';
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId, useState } from 'react';
import { EyeStyle, InputContainerStyle, InputStyle, LabelStyle } from './style';
import { Title } from '../title';
import { EyePassIcon, EyePassShowIcon } from '@shared/assets/icons';

type InputProps = {
  title?: string;
  isPass?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, isPass, type, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();
    const [isShow, setIsShow] = useState(false);
    const inputType = isPass ? (isShow ? type : 'password') : type;

    return (
      <InputContainerStyle>
        {title && (
          <Title el='h4' type='secondary'>
            {title}
          </Title>
        )}
        <LabelStyle isPass htmlFor={id}>
          <InputStyle type={inputType} ref={ref} id={id} {...props} />
          {isPass && (
            <EyeStyle onClick={() => setIsShow(prev => !prev)}>
              {isShow ? <EyePassShowIcon /> : <EyePassIcon />}
            </EyeStyle>
          )}
        </LabelStyle>
      </InputContainerStyle>
    );
  }
);

Input.displayName = 'Input';
