export type TypeUser = {
    email: string
    password: string
    emailVerified: boolean
    accessToken?: string,
    refreshToken?: string
    avatarUrl?: string | any
}