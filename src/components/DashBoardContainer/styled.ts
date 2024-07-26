import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 15vw;
  height: 100vh;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;

  ul {
    list-style: none;
  }

  a {
    display: block;
    width: 15vw;
    padding: 1.5rem;
    text-decoration: none;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }

  a:hover {
    background-color: #555;
  }

  a.active {
    background-color: #777;
  }
`;
