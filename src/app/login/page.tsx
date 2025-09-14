
import { LoginForm } from '@/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <div className="mt-4 text-center text-sm">
            <Link href="/login/forgot-password" className="underline text-muted-foreground hover:text-primary">
                Forgot your password?
            </Link>
        </div>
      </div>
    </div>
  );
}
