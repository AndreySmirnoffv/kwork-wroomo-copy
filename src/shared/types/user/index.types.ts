export type UserType = {
	name: string,
	surname: string
	email: string
	password: string
	emailVerified: boolean
	accessToken?: string,
	refreshToken?: string
	avatarUrl?: string
	birthDate?: string
	role?: 'client' | 'rentner' | 'admin' | 'manager'
}

export type RoleType = UserType['role'];