'use server';

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

export async function registerUserAction(formData: any) {
  const responseData = await registerUserService(formData);

  if (!responseData) {
    return {
      strapiErrors: responseData.error,
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
    };
  }

  redirect('/dashboard');
}

export async function loginUserAction(formData: any) {
  const responseData = await loginUserService(formData);

  if (!responseData) {
    return {
      strapiErrors: responseData.error,
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
    };
  }

  cookies().set('jwt', responseData.jwt);
  redirect('/dashboard');
}

export async function logoutAction() {
  cookies().set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}
