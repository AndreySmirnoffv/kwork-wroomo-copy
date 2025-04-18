export type TypeUser = {
    name: string,
    surname: string
    email: string
    password: string
    emailVerified: boolean
    accessToken?: string,
    refreshToken?: string
    avatarUrl?: string
    birthDate?: string
}