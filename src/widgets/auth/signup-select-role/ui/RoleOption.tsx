'use client';

import { SelectRoleIcon } from '@shared/assets/icons';
import { RolesBlockStyle } from './style';
import React, { useId } from 'react';
import { ChildrenProps } from '@shared/types';

interface RoleOptionProps {
  name: string;
  isChecked: boolean;
  onClick: () => void;
}

export const RoleOption = ({ name, isChecked, onClick, children }: ChildrenProps<RoleOptionProps>) => {
  const id = useId();

  return (
    <RolesBlockStyle isChecked={isChecked} onClick={onClick} htmlFor={id}>
      <input type='radio' name={name} id={id} checked={isChecked} onChange={onClick} style={{ display: 'none' }} />
      <div>
        <SelectRoleIcon />
      </div>
      <p>{children}</p>
    </RolesBlockStyle>
  );
};
