import { RegisterForm } from '@/components/register-form';

export const dynamic = 'force-dynamic';

export default function RegisterPage({ searchParams }: { searchParams?: { course?: string } }) {
  const selectedCourse = searchParams?.course;
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <RegisterForm selectedCourse={selectedCourse} />
      </div>
    </div>
  );
}
