import { selectAuthLoggedIn } from '@/src/store/slices/auth.slice';
import useAppSelector from '@/src/common/hooks/useAppSelector';
import LoginPage from '@/src/features/auth/login';
import { Redirect } from 'expo-router';

function LoginScreen() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  if(isLoggedIn){
    return <Redirect  href={'/'}/>
  }
  
  return <LoginPage />;
}

export default LoginScreen;