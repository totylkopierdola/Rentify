import { Card, Button } from '@/components/ui';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center '>
      <h1 className='text-6xl font-bold '>404</h1>
      <h3 className='text-xl '>Page Not Found</h3>
      <p>
        Oops! The page you're trying to reach seems to be missing. Let's get you
        back on track.
      </p>
      <Button asChild>
        <Link to='/' className='mt-4 rounded  px-4 py-2  '>
          Go Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
