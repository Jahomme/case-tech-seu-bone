import { createGlobalStyle, styled } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    html {
    font-size: 62.5%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: ${({ theme }) => theme.font.sizes.medium};
    background-color: ${({ theme }) => theme.colors.background};
  }
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: opacity 300ms ease-in-out;
    &:hover {
      opacity: .6;
    }
  }
  button{
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #fff;
  padding: 10px 20px;
  transition: all 300ms;
  text-transform: uppercase;


  &:hover {
    filter: brightness(85%);
  }
}

`;
