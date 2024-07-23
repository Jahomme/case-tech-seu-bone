import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 85vw;

  h1 {
    margin: 0px 0px 40px;
  }

  .form-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 60px;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-label {
    margin-bottom: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  .form-input {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 5px;
    width: 100%;
  }

  .form-input:focus {
    border-color: ${({ theme }) => theme.colors.gray};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .form-card {
    margin-bottom: 40px;
  }

  .form-error {
    font-size: 1.5rem;
    color: red;
  }
`;
