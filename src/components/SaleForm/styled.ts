import styled from 'styled-components';

export const Container = styled.div`
  width: 694px;
  height: 182px;
  border-radius: 8px;

  .form-card-top-row {
    display: flex;
  }

  .form-card-bottom-row {
    display: flex;
    justify-content: space-between;
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

  .form-card-name-sku {
    display: flex;
    flex-direction: column;
  }
`;
