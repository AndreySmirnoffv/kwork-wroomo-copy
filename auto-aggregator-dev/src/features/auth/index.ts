import { SignupForm } from './signup-form/ui'
import { LoginForm } from './login-form/ui'
import { authSlice } from './slice/index.slice'
export { LoginForm, SignupForm }
export const { setUser, logout } = authSlice.actions
export default authSlice