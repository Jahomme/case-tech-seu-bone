'use client';

import { updateSaleService } from '@/data/services/sale-update-service';
import { Container } from './styled';
import { FormEvent, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { getSalesData } from '@/data/services/get-sales-data';

export type userData = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  jobRole: string;
};

export type HeaderProps = {
  ok: boolean;
  data: userData | any;
  error: any | null;
};

export type SalesAttributes = {
  deadlineType: string;
  freightValue: number;
  discount: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  products: {
    id: number;
    sku: string;
    name: string;
    amount: number;
    unitPrice: number;
    totalPrice: number;
  }[];
};

export type SalesData = {
  data: {
    id: number;
    attributes: SalesAttributes;
  }[];
};

export default function SalesList({
  initialData,
  userData,
}: {
  initialData: SalesData;
  userData: HeaderProps;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const handleApprove = async (id: number) => {
    setIsLoading(true);

    await updateSaleService({ data: { status: 'approved' } }, id);
    window.location.reload();

    setIsLoading(false);
  };

  const handleDisapprove = async (id: number) => {
    setIsLoading(true);

    await updateSaleService({ data: { status: 'disapproved' } }, id);
    window.location.reload();

    setIsLoading(false);
  };

  const [filterQuery, setFilterQuery] = useState('');

  const handleFilterFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await getSalesData(filterQuery).then((data) =>
      setData(data),
    );
    setIsLoading(false);
  };

  return (
    <>
      <h1>Vendas Cadastradas</h1>
      <form onSubmit={handleFilterFormSubmit}>
        <select
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        >
          <option value="">selecione uma opção de filtragem...</option>
          <option value="&sort=totalPrice:desc">Maior valor</option>
          <option value="&sort=totalPrice:asc">Menor valor</option>
          <option value="&sort=publishedAt:desc">Mais recentes</option>
          <option value="&sort=publishedAt:asc">Mais antigo</option>
        </select>
        <button type="submit">Filtrar</button>
      </form>

      {data.data.map((sale) => (
        <Container key={sale.id}>
          <h2>Produtos</h2>
          {sale.attributes.products?.map((product) => (
            <div key={product.id}>
              {' '}
              <h3>SKU:{product.sku}</h3>
              <h3>Nome:{product.name}</h3>
              <h3>Quantidade:{product.amount}</h3>
              <h3>Preço unitário:{product.unitPrice}</h3>
              <h3>Preço total:{product.totalPrice}</h3>
            </div>
          ))}
          <h2>Detalhes da Venda</h2>
          <h3>Prazo: {sale.attributes.deadlineType}</h3>
          <h3>Valor do Frete: {sale.attributes.freightValue}</h3>
          <h3>Forma de Pagamento: {sale.attributes.paymentMethod}</h3>
          <h3>Desconto: {sale.attributes.discount}</h3>
          <h3>Preço Total da Venda: {sale.attributes.totalPrice}</h3>
          <h3>Status: {sale.attributes.status}</h3>
          {userData.data.jobRole === 'manager' &&
          sale.attributes.status === 'pending' ? (
            <>
              <button
                disabled={isLoading}
                onClick={() => handleApprove(sale.id)}
              >
                aprovar
              </button>
              <button
                disabled={isLoading}
                onClick={() => handleDisapprove(sale.id)}
              >
                reprovar
              </button>
            </>
          ) : (
            ''
          )}
          {isLoading && <LoadingComponent />}
        </Container>
      ))}
    </>
  );
}
