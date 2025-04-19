import { TitleTagNameType } from '@shared/types'
import { ReactNode, RefObject } from 'react'

export type Weight = 'bold' | 'medium' | 'regular'

export type Props = {
	el?: TitleTagNameType
	children: ReactNode
	className?: string
	weight?: Weight
	align?: 'left' | 'center' | 'right'
	ref?: RefObject<HTMLHeadingElement>
	withWrapper?: boolean
	textAlign?: 'left' | 'center' | 'right'
	type?: 'primary' | 'secondary'
}