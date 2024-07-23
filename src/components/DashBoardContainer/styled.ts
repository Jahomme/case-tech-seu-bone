import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  height: 100vh;
  background-color: #333;
  color: #fff;

  ul {
    list-style: none;
  }

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #fff;
  }

  a:hover {
    background-color: #555;
  }

  a.active {
    background-color: #777;
  }
`;
