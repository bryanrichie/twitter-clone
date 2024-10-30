'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

type LoginFormValuesType = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValuesType) => {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formData,
      });

      console.log({ response });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Form>
  );
};
