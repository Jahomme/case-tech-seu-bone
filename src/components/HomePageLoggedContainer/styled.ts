import styled from 'styled-components';

export const Container = styled.div`
  gap: 2rem;
  margin-top: 10rem;
  max-width: 100%;
  padding: 10px;
  align-items: center;
  text-align: center;
  justify-content: center;

  button {
    padding: 15px 200px;
    font-size: 22px;
    font-weight: bold;
    margin-top: 2rem;
  }

  h1 {
    margin-top: 2rem;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }

  h2 {
    margin-top: 2rem;
  }
`;
