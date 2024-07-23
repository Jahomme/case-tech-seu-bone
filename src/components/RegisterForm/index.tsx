'use client';

import { registerUserAction } from '@/data/actions/auth-actions';
import { useFormState } from 'react-dom';
import { ZodErrors } from '../ZodErrors';
import { StrapiErrors } from '../StrapiErrors';
import { Container } from './styled';

const INITIAL_STATE = {
  zodErrors: null,
  data: null,
  message: null,
};

export default function RegisterForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );
  return (
    <Container>
      <div className="form-container">
        <h1>Cadastrar Novo Vendedor</h1>
        <form action={formAction}>
          <div>
            {' '}
            <label className="form-label" htmlFor="username">
              {' '}
              Nome:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              name="username"
              id="username"
              required
              placeholder="digite seu nome"
            />
            <ZodErrors error={formState?.zodErrors?.username} />
          </div>

          <div>
            {' '}
            <label className="form-label" htmlFor="email">
              {' '}
              Email:{' '}
            </label>
            <input
              className="form-input"
              type="text"
              name="email"
              id="email"
              required
              placeholder="digite seu email"
            />
            <ZodErrors error={formState?.zodErrors?.email} />
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
            <button type="submit"> Cadastrar </button>
            <StrapiErrors error={formState?.strapiErrors} />
          </div>
        </form>
      </div>
    </Container>
  );
}
