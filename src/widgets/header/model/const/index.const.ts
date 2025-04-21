import { PathNames } from '@shared/const'

type NavListType = {
	id: number
	href: string
	text: string
}

export const navList: NavListType[] = [
	{
		id: 1,
		href: PathNames.root.searchAuto,
		text: 'Найти авто',
	},
	{
		id: 2,
		href: PathNames.root.places,
		text: 'Места',
	},
	{
		id: 3,
		href: PathNames.root.news,
		text: 'Новости',
	},
	{
		id: 4,
		href: PathNames.root.blog,
		text: 'Блог',
	},
	{
		id: 5,
		href: PathNames.root.about,
		text: 'О нас',
	},
]