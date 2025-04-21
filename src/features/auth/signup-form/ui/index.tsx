'use client';

import { Button } from '@shared/ui/button';
import s from './SignupForm.module.scss';
import { Input } from '@shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUserMutation } from '@entities/auth';
import { RegisterDTO, RoleType } from '@shared/types';
import { useEffect } from 'react';
import { DatePicker } from '@features/auth/date-selection'

type RegisterFormType = RegisterDTO;
type SignupFormProps = {
  role: RoleType;
};

export const SignupForm = ({ role }: SignupFormProps) => {
  const { register, handleSubmit } = useForm<RegisterFormType>();
  const [create] = useCreateUserMutation();

  const onSubmit: SubmitHandler<RegisterFormType> = async data => {
    try {
      const response = await create(data).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s['flex']}>
        <Input {...register('name', { required: 'Имя не может быть пустым' })} name='name' type='text' title='Имя' />
        <Input
          {...register('surname', { required: 'surname не может быть пустым' })}
          name='surname'
          type='text'
          title='Фамилия'
        />
      </div>
      <DatePicker />
      <Input
        {...register('birthDate', { required: 'birthDate не может быть пустым' })}
        name='birthDate'
        value={'+49 15227542724'}
        title='Дата рождения'
      />
      <Input {...register('email', { required: 'email не может быть пустым' })} name='email' title='Емаил' />
      <Input
        {...register('password', { required: 'Пароль не может быть пустым' })}
        isPass
        name='password'
        title='Пароль'
      />
      <Button>Зарегистрироваться</Button>
    </form>
  );
};
