import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: ${theme.colors.primary};
  padding: 0 10px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  button {
    background-color: transparent;
  }

  div {
    display: flex;
    color: ${theme.colors.white};
    align-items: center;
    text-align: center;
  }

  .loginButton {
    background-color: ${theme.colors.primary};
  }

  .loginButton span {
    margin: 0 0 0 5px;
  }

  img {
    width: 10%;
    height: 10%;
  }

  a {
    &:hover {
      filter: brightness(85%);
    }
  }
`;
