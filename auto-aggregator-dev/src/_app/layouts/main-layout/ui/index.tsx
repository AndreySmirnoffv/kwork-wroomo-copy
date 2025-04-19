import { ChildrenProps } from '@shared/types';
import s from './MainLayout.module.scss';
import { Header } from '@widgets/header';

export const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <div className={s.layout}>
      <Header />
      {children}
    </div>
  );
};
