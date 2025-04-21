'use client'

import styled from 'styled-components'

export const RolesStyle = styled.div`
    display: flex;
    gap: 20px;
`

export const RolesContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const BaseRoleBlockStyle = styled.label`
	border-radius: 12px;
	padding: 20px;
	width: 199px;
	border: 1px solid var(--border-secondary-color);
	transition: border 0.3s ease;
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
	text-align: center;

	div {
		width: 20px;
		height: 20px;
		border: 1px solid var(--border-color);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export const RolesBlockStyle = styled(BaseRoleBlockStyle)<{ isChecked: boolean }>`

	${({ isChecked }) => isChecked ? `
		border-color: var(--border-color);

		div {
				background-color: var(--border-color);

				svg {
						display: block;
				}
		}
	` : `
		div svg {
			display: none;
		}
	`}

	p {
		line-height: 25px;
	}
`