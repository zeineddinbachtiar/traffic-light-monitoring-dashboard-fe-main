import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-700">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8 text-black'
        )}
      >
        Back
      </Link>
      <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-black p-8 shadow-2xl hover:shadow-[0px_0px_30px_5px_rgba(255,255,255,0.5)] transition-shadow duration-300">
        <div className="flex flex-col space-y-4 text-center">
          <h1 className="text-3xl font-bold text-white">ECGuard</h1>
          <p className="text-sm text-white">
            Enter your Email and Password below
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}