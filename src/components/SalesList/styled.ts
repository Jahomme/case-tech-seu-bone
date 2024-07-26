import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .item-sale-details {
    padding: 1rem;
    background-color: #f5af00;
    border-radius: 8px;
  }

  .list-filter {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  .list-filter form {
    display: flex;
    gap: 2rem;
    padding-bottom: 2rem;
  }

  .list-filter select {
    background-color: #cacaca;
    height: 40px;
    border-radius: 8px;
    padding: 0 1rem;
    border: 0;
    display: flex;
    align-items: center;
  }

  .list-itens {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .list-item {
    max-width: 800px;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list-item-product {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }

  .list-item-product-row {
    gap: 1.5rem;
    display: flex;
    justify-content: space-between;
  }

  .list-item-product-row div {
    display: flex;
    flex-direction: column;
    min-width: 180px;
  }

  label {
    font-size: 18px;
    font-weight: bold;
  }

  span {
    font-size: 26px;
    font-weight: bold;
  }
`;
