import { OrInterval } from '@shared/ui';
import { Language } from '../language';
import s from './HeaderActions.module.scss';
import { HeaderAuth } from '../auth';

export const HeaderActions = () => {
  return (
    <div className={s['header-actions']}>
      <Language />
      <OrInterval margin={8}/>
      <HeaderAuth />
    </div>
  );
};
