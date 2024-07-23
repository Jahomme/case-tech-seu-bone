'use client';

import { Container } from './styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserAction } from '@/data/actions/auth-actions';

const loginSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Nome precisa ter entre 3 e 20 caracteres',
    })
    .max(20, {
      message: 'Nome precisa ter entre 3 e 20 caracteres',
    }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter entre 6 e 50 caracteres' })
    .max(50, { message: 'A senha deve conter entre 6 e 50 caracteres' }),
  email: z.string().email({
    message: 'Digite um email válido',
  }),
});

export type FormFields = z.infer<typeof loginSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await registerUserAction(data);
      if (response.strapiErrors) {
        setError('root', {
          type: 'manual',
          message: response.strapiErrors.message,
        });
      }
    } catch (error) {}
  };

  return (
    <Container>
      <div className="form-container">
        <h1>Cadastrar novo vendedor</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card">
            {' '}
            <label className="form-label" htmlFor="username">
              {' '}
              Nome:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="digite seu nome"
              {...register('username')}
            />
            {errors.username && (
              <div className="form-error">{errors.username.message}</div>
            )}
          </div>
          <div className="form-card">
            {' '}
            <label className="form-label" htmlFor="email">
              {' '}
              Email:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="digite seu nome"
              {...register('email')}
            />
            {errors.email && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-card">
            {' '}
            <label className="form-label" htmlFor="password">
              {' '}
              Senha:{' '}
            </label>
            <input
              className="form-input"
              type="password"
              placeholder="digite sua senha"
              {...register('password')}
            />
            {errors.password && (
              <div className="form-error">{errors?.password?.message}</div>
            )}
          </div>
          <div>
            {' '}
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Carregando...' : 'Cadastrar'}{' '}
            </button>
            {errors.root && (
              <div className="form-error">{errors?.root?.message}</div>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
