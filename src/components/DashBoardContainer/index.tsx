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
          <Link href="/dashboard">INÍCIO</Link>
        </li>
        <li>
          {' '}
          <Link href="/dashboard/sales">VENDAS CADASTRADAS</Link>
        </li>
        <li>
          {' '}
          {data.data.jobRole === 'seller' && (
            <Link href="/dashboard/newSale">NOVA VENDA</Link>
          )}
        </li>
        <li>
          {' '}
          {data.data.jobRole === 'manager' && (
            <Link href="/dashboard/register">REGISTRAR NOVO VENDEDOR</Link>
          )}
        </li>
      </ul>
    </Nav>
  );
}
