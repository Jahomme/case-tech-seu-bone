'use client';

import { updateSaleService } from '@/data/services/sale-update-service';
import { Container } from './styled';
import { FormEvent, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { getSalesData } from '@/data/services/get-sales-data';
import { toast } from 'react-toastify';

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

  // function countOccurrences(arr, key, value) {
  //   return arr.reduce((count, obj) => {
  //     if (obj[key] === value) {
  //       return count + 1;
  //     }
  //     return count;
  //   }, 0);
  // }

  const countOcurrences = initialData.data.reduce((acc, sale) => {
    if (sale.attributes.status === 'pending') {
      return acc + 1;
    }
    return acc;
  }, 0);

  userData.data.jobRole === 'manager' &&
    countOcurrences &&
    toast.warning(`Você tem ${countOcurrences} novas solicitações`, {
      toastId: 'pendingNotify',
    });

  const handleApprove = async (id: number) => {
    setIsLoading(true);

    await updateSaleService({ data: { status: 'approved' } }, id);
    window.location.reload();

    toast.success('Venda Aprovada');
    setIsLoading(false);
  };

  const handleDisapprove = async (id: number) => {
    setIsLoading(true);

    await updateSaleService({ data: { status: 'disapproved' } }, id);
    window.location.reload();

    toast.success('Venda Reprovada');
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
    <Container>
      <div className="list-filter">
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
      </div>
      <div className="list-itens">
        {data.data.map((sale) => (
          <div className="list-item" key={sale.id}>
            {sale.attributes.products?.map((product, index) => (
              <div className="list-item-product" key={product.id}>
                <h2>Produto {index + 1}</h2>
                <h3>Nome:{product.name}</h3>
                <small>SKU:{product.sku}</small>
                <div className="list-item-product-row">
                  <div>
                    <label>Preço unitario:</label>
                    <span>R$ {product.unitPrice}</span>
                  </div>
                  <div style={{ flex: '1' }}>
                    <label>Quantidade:</label>
                    <span>{product.amount}</span>
                  </div>
                  <div>
                    <label>Preço total:</label>
                    <span>R$ {product.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="item-sale-details">
              <div className="list-item-product-row">
                {' '}
                <div>
                  <label>Tipo de entrega:</label>
                  <span>{sale.attributes.deadlineType}</span>
                </div>
                <div>
                  <label>Forma de Pagamento:</label>
                  <span>{sale.attributes.paymentMethod}</span>
                </div>
                <div></div>
              </div>
              <div className="list-item-product-row">
                {' '}
                <div>
                  <label>Valor Frete:</label>
                  <span>R$ {sale.attributes.freightValue.toFixed(2)}</span>
                </div>
                <div>
                  <label>Valor Desconto:</label>
                  <span>R$ {(sale.attributes.discount ?? 0).toFixed(2)}</span>
                </div>
                <div>
                  <label>Valor Total:</label>
                  <span>R$ {sale.attributes.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
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
                  style={{ backgroundColor: '#a52d2d' }}
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
          </div>
        ))}
      </div>
    </Container>
  );
}
