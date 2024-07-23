'use client';

import { loginUserAction } from '@/data/actions/auth-actions';
import { Container } from './styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  identifier: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter entre 6 e 50 caracteres' })
    .max(50, { message: 'A senha deve conter entre 6 e 50 caracteres' }),
});

export type FormFields = z.infer<typeof loginSchema>;

export default function SignInForm() {
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
      const response = await loginUserAction(data);
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
        <h1>Entrar no Sistema</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-card">
            {' '}
            <label className="form-label" htmlFor="identifier">
              {' '}
              Email:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="digite seu email ou nome de usuário"
              {...register('identifier')}
            />
            {errors.identifier && (
              <div className="form-error">{errors.identifier.message}</div>
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
              {isSubmitting ? 'Carregando...' : 'Entrar'}{' '}
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
