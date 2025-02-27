// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
      <h1>Repair Shop</h1>
      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Register</RegisterLink>
      </Button>
    </main>
  );
}
