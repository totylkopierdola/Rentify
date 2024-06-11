import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// import api from '@/api';
// import { useAuth } from '@/components/AuthProvider';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';
import { useAuth } from './AuthProvider';
import { doSignInWithEmailAndPassword, doSignOut } from '../firebase/auth';
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const { userLoggedIn, setUserLoggedIn } = useAuth();

  // log email from the form:
  console.log('email', register('email'));

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await doSignInWithEmailAndPassword(email, password);

      alert('success');
      // setUserLoggedIn(true);
      // redirect to homepage
      navigate('/');
    } catch (error) {
      // Handle errors appropriately
      setError('root', {
        message: error.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <h1>userLoggedIn: {userLoggedIn.toString()} </h1>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>

          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
