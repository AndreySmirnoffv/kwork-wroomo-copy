import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@shared/types'

const initialState: UserType = {
	name: '',
	surname: '',
	email: '',
	password: '',
	emailVerified: false,
	accessToken: undefined,
	refreshToken: undefined,
	avatarUrl: undefined,
	birthDate: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			state.name = action.payload.name
			state.surname = action.payload.surname
			state.email = action.payload.email
			state.password = action.payload.password
			state.emailVerified = action.payload.emailVerified
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			state.avatarUrl = action.payload.avatarUrl
			state.birthDate = action.payload.birthDate
		},
		logout: (state) => {
			state.name = ''
			state.surname = ''
			state.email = ''
			state.password = ''
			state.emailVerified = false
			state.accessToken = undefined
			state.refreshToken = undefined
			state.avatarUrl = undefined
			state.birthDate = undefined
		},
	},
})

export { authSlice }