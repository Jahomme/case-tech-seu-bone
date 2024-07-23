'use client';

import { LoadingContainer, LoadingSpinner, LoadingText } from './styled';

export default function LoadingComponent() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>Carregando...</LoadingText>
    </LoadingContainer>
  );
}
