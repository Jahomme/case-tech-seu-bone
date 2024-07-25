import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
