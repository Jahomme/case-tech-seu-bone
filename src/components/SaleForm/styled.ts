import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;

  button.remove {
    padding: 2px 6px;
    background-color: #a52d2d;
  }

  .form-box {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .form-card-row {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-end;
  }

  .form-card-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-card-field label {
    font-size: 18px;
    font-weight: bold;
  }

  .form-card-field small {
    font-size: 12px;
    height: 0;
  }

  .form-card-field select,
  .form-card-field input {
    background-color: #f6f6f6;
    height: 40px;
    border-radius: 8px;
    padding: 0 1rem;
    border: 0;
    display: flex;
    align-items: center;
  }

  .form-card-field span {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const FormCard = styled.div`
  .form-card-product-select {
    width: 509px;
    height: 33px;
  }

  .form-card-amount {
    width: 104px;
    height: 33px;
  }

  .form-card-unit-price {
    width: 274px;
    height: 86px;
  }

  .form-card-total-price {
    width: 274px;
    height: 86px;
  }
`;
