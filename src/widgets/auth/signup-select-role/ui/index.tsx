'use client';

import { Button } from '@shared/ui/button';
import { RolesContainerStyle, RolesStyle } from './style';
import { RoleOption } from './RoleOption';
import { useState } from 'react';
import { SignupForm } from '@features/auth';
import { RoleType } from '@shared/types';

export const SignupSelectRole = () => {
  const name = 'roles-input-name';
  const client = 'client';
  const rentner = 'rentner';
  const [selectedRole, setSelectedRole] = useState<RoleType>('client');
  const [goNext, setGoNext] = useState(false);

  if (goNext) return <SignupForm role={selectedRole} />;

  return (
    <RolesContainerStyle>
      <RolesStyle>
        <RoleOption name={name} isChecked={selectedRole === client} onClick={() => setSelectedRole(client)}>
          Я водитель, хочу арендовать
        </RoleOption>
        <RoleOption name={name} isChecked={selectedRole === rentner} onClick={() => setSelectedRole(rentner)}>
          Я владелец, хочу сдавать
        </RoleOption>
      </RolesStyle>
      <Button onClick={() => setGoNext(true)}>Далее</Button>
    </RolesContainerStyle>
  );
};
