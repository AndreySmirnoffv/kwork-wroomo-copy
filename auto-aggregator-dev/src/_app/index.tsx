import { ChildrenProps } from '@shared/types';
import { RootLayout } from './layouts';
import { Providers } from './providers';
import './styles/index.scss';

export const App = ({ children }: ChildrenProps) => {
  return (
    <Providers>
      <RootLayout>{children}</RootLayout>
    </Providers>
  );
};
