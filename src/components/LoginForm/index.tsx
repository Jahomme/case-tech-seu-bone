'use client';

import { loginUserAction } from '@/data/actions/auth-actions';
import { useFormState } from 'react-dom';
import { ZodErrors } from '../ZodErrors';
import { StrapiErrors } from '../StrapiErrors';
import { Container } from './styled';
import { useForm } from 'react-hook-form';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  return (
    <Container>
      <div className="form-container">
        <h1>Entrar no Sistema</h1>
        <form action={formAction}>
          <div>
            {' '}
            <label className="form-label" htmlFor="email">
              {' '}
              Email:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              name="identifier"
              id="email"
              required
              placeholder="digite seu email ou nome de usuário"
            />
            <ZodErrors error={formState?.zodErrors?.identifier} />
          </div>
          <div>
            {' '}
            <label className="form-label" htmlFor="password">
              {' '}
              Senha:{' '}
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              required
              placeholder="digite sua senha"
            />
            <ZodErrors error={formState.zodErrors?.password} />
          </div>
          <div>
            {' '}
            <button type="submit"> Entrar </button>
            <StrapiErrors error={formState?.strapiErrors} />
          </div>
        </form>
      </div>
    </Container>
  );
}
