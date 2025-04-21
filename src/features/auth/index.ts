import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'
import { authSlice } from './slice/index.slice'
export { SignupForm, LoginForm }
export const { setUser, logout } = authSlice.actions
export default authSlice