
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 xl:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-6">
           <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://i.ibb.co/gLxhYndw/Login-Button-with-Padlock-Icon.png"
          alt="Image"
          width="1920"
          height="1080"
          data-ai-hint="login security"
          className="h-full w-full object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  );
}
