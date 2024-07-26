'use client';

import Link from 'next/link';
import { Container } from './styled';

export default function HomePageLoggedContainer() {
  return (
    <Container>
      <h1>
        Bem vindo ao Sistema de Gerenciamento de Vendas da <span>Seu Boné</span>
      </h1>
      <h2>Clique no botão abaixo para acessar o sistema</h2>
      <Link href="/dashboard">
        <button>Acessar o Sistema</button>
      </Link>
    </Container>
  );
}
