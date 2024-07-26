'use client';

import Link from 'next/link';
import { Container } from './styled';

export default function HomePageContainer() {
  return (
    <Container>
      <h1>
        Bem vindo ao Sistema de Gerenciamento de Vendas da <span>Seu Boné</span>
      </h1>
      <h2>Entre com suas credenciais para utilizar os recursos do site</h2>
      <Link href="login">
        <button>Entrar no Sistema</button>
      </Link>
    </Container>
  );
}
