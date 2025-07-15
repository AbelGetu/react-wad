import { LoginForm } from '@/components/auth/login-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userInfo } = useSelector((state: any) => state.auth)

  if (userInfo) {
    navigate('/dashboard')
  }
  return (
    <LoginForm />
  )
}

export default Login