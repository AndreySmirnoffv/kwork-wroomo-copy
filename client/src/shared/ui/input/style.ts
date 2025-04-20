'use client'
import styled from 'styled-components'

export const InputContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const InputStyle = styled.input`
	background-color: transparent;
	border: none;
	width: 100%;
	
	color: var(--text-color);
`

export const LabelStyle = styled.label<{ isPass: boolean }>`
	position: relative;
	border: 1px solid var(--border-secondary-color);
	border-radius: 8px;
	padding: 12px;
	${({ isPass }) => isPass && `padding-right: 46px;`}
	cursor: text;
`

export const EyeStyle = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 46px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`