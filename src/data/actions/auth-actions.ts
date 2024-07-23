'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  loginUserService,
  registerUserService,
} from '../services/auth-service';

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    jobRole: 'seller',
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    };
  }

  redirect('/dashboard');
}
const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Este campo deve ter pelo menos 3 caracteres',
    })
    .max(20, {
      message: 'Este campo deve ter entre 3 e 20 caracteres',
    }),
  password: z
    .string()
    .min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres',
    })
    .max(100, {
      message: 'A senha deve ter entre 6 e 100 caracteres',
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Login.',
    };
  }

  cookies().set('jwt', responseData.jwt);
  redirect('/dashboard');
}

export async function logoutAction() {
  cookies().set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}
