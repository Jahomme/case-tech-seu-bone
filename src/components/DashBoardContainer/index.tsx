'use client';

import Link from 'next/link';
import { Nav } from './styled';

export type userData = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  jobRole: string;
};

export type HeaderProps = {
  ok: boolean;
  data: userData | any;
  error: any | null;
};

export default function DashBoardContainer({ data }: { data: HeaderProps }) {
  return (
    <Nav>
      <ul>
        <li>
          {' '}
          <Link href="/dashboard">Listagem de Vendas</Link>
        </li>
        <li>
          {' '}
          {data.data.jobRole === 'seller' && (
            <Link href="/dashboard/newSale">Cadastrar Venda</Link>
          )}
        </li>
        <li>
          {' '}
          {data.data.jobRole === 'manager' && (
            <Link href="/dashboard/register">Registrar Vendedor</Link>
          )}
        </li>
      </ul>
    </Nav>
  );
}
