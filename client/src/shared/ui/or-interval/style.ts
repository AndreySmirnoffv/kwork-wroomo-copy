'use client'

import styled from 'styled-components'
import { IntervalProps } from './model/index.types'

const IntervalContainerStyle = styled.div<IntervalProps>`
	${({ pos, margin }) => pos === 'horizontal' ? `width: 100%; height: 5px; margin: ${margin}px 0;` : `height: auto; width: 2px; margin: 0 ${margin}px; `}
	background-color: var(--border-secondary-color);
`

export { IntervalContainerStyle }