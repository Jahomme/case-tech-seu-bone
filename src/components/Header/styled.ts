import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: ${theme.colors.primary};
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
