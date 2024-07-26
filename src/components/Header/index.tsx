'use client';

import Link from 'next/link';
import { Nav } from './styled';
import { LogoutButton } from '../LogoutButton';

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

export default function Header({ data }: { data: HeaderProps }) {
  return (
    <Nav>
      <Link href="/">
        {' '}
        <img
          alt="logo seu boné"
          src="https://seubone.com/wp-content/uploads/2022/06/LOGO-SB_05-1024x250.png"
        />
      </Link>
      <div>
        {' '}
        {data.ok && <span>{data.data.username}</span>}
        {data.ok && (
          <small>
            {data.data.jobRole === 'manager' ? 'Gerente' : 'Vendedor'}
          </small>
        )}
      </div>
      {data.ok && <LogoutButton />}
    </Nav>
  );
}
