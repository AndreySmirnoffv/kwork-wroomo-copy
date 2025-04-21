'use client';

import { ChildrenProps } from '@shared/types';
import StyledComponentSSRProvider from './registry-provider';
import { Provider } from 'react-redux';
import { store } from '@_app/store';

export const Providers = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
        <StyledComponentSSRProvider>{children}</StyledComponentSSRProvider>
    </Provider>
  );
};
