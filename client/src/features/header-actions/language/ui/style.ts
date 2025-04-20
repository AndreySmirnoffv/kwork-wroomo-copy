'use client'
import styled from 'styled-components'

const commonStyles = `
  border: 1px solid var(--border-secondary-color);
  border-radius: 8px;
  transition: all 0.2s ease; // Унифицированная анимация
`

export const LanguageContainerStyle = styled.div`
  position: relative;
`

export const LanguageLabelStyle = styled.label`
	${commonStyles}
	display: inline-flex;
	height: 44px;
	width: 44px;
	color: var(--text-color);
	background-color: transparent;
	cursor: pointer;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: var(--border-secondary-color);
	}
`

export const ListStyle = styled.ul<{ isActive: boolean }>`
  ${commonStyles}
  position: absolute;
  top: ${({ isActive }) => (isActive ? '120%' : '90%')};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--block-bg);
  overflow: hidden;

  li {
    width: 100%;
    padding: 8px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: var(--border-secondary-color);
    }
  }
`