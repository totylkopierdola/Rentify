import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      // Handle successful sign-up here (e.g., redirect to login page or show success message)
    } catch (error) {
      setSignUpError(error.message);
      // Optionally set specific errors for fields
      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'Email already in use',
        });
      }
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign Up</h2>
        <p className='text-center text-muted-foreground'>
          Create an account using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type='password'
              placeholder='Password'
            />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('confirmPassword')}
              type='password'
              placeholder='Confirm Password'
            />
            {errors['confirmPassword'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['confirmPassword'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} type='submit'>
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>

          {signUpError && (
            <div className='text-center text-sm text-red-500'>
              {signUpError}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
