import { PathNames } from '@shared/const'
import { pathDataKeyType } from '../type/index.type'

type PathDataType = Record<
	pathDataKeyType,
	{ title: string; text: string; link: { text: string; href: string } }
>

export const pathData: PathDataType = {
	login: {
		title: 'Войти',
		text: 'Нет аккаунта?',
		link: {
			text: 'Зарегистрироваться',
			href: PathNames.auth.signup,
		},
	},
	signup: {
		title: 'Регистрация',
		text: 'Уже есть аккаунт?',
		link: {
			text: 'Войти',
			href: PathNames.auth.root,
		},
	},
}