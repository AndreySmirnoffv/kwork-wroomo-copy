'use client';

import { Button } from '@shared/ui/button';
import s from './LoginForm.module.scss';
import { Input } from '@shared/ui';
import Link from 'next/link';
import { PathNames } from '@shared/const';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormType = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();

  const onSubmit: SubmitHandler<LoginFormType> = async data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Input
        {...register('login', { required: 'Логин не может быть пустым' })}
        name='login'
        type='text'
        title='Логин'
      />
      <Input
        {...register('password', { required: 'Пароль не может быть пустым' })}
        isPass
        name='password'
        title='Пароль'
      />
      <Link href={PathNames.auth.root}>Забыли пароль?</Link>
      <Button>Войти</Button>
    </form>
  );
};
