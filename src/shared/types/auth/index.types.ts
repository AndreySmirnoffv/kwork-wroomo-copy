type AuthDTO = {
	login: string
	password: string
}

type LoginDTO = AuthDTO
type RegisterDTO = AuthDTO & { name: string; surname: string; email: string; password: string, birthDate: string }

export type { LoginDTO, RegisterDTO, AuthDTO }