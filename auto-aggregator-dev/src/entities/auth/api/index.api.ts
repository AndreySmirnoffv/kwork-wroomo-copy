import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginDTO, RegisterDTO, UserType } from '@shared/types'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/auth/',
		credentials: 'include',
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserType, LoginDTO>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
		}),
		createUser: builder.mutation<UserType, RegisterDTO>({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: data,
			}),
		}),
	}),
})

