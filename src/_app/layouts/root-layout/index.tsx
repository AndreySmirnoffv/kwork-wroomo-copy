import { ChildrenProps } from '@shared/types';

export const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <html data-theme='dark'>
      <body>{children}</body>
    </html>
  );
};
