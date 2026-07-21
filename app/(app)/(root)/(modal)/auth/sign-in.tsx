import { selectAuthLoggedIn } from '@/src/store/slices/auth.slice';
import useAppSelector from '@/src/common/hooks/useAppSelector';
import LoginPage from '@/src/features/auth/sign-in';
import { Redirect } from 'expo-router';

function SignInScreen() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  if(isLoggedIn){
    return <Redirect  href={'/'}/>
  }
  
  return <LoginPage />;
}

export default SignInScreen;