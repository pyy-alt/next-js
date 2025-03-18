// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type Props = {
  title: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ title, className, variant, ...props }: Props) {
  console.log(props);
  const router = useRouter();
  return (
    <Button className={className} variant={variant} onClick={() => router.back()} title={title}>
      {title}
    </Button>
  );
}
