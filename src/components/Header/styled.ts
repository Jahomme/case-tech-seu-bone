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
  gap: 1rem;

  button {
    background-color: transparent;
  }

  a {
    flex: 1;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 22px;
    color: white;
    font-weight: bold;
    line-height: 140%;
  }

  small {
    font-size: 14px;
    color: #fcbb19;
    border-top: 2px solid white;
    padding: 0 4px 0;
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
