import { BtnLink } from '@shared/ui/btn-link';
import s from './HeaderAuth.module.scss';
import { PathNames } from '@shared/const';

export const HeaderAuth = () => {
  const isAuth = false;

  return (
    <div className={s.container}>
      {isAuth ? (
        'profile'
      ) : (
        <>
          <BtnLink href={PathNames.auth.signup}>Сдать транспорт</BtnLink>
          <BtnLink style='primary' href={PathNames.auth.root}>
            Войти
          </BtnLink>
        </>
      )}
    </div>
  );
};
