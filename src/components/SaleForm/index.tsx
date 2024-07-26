'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Container, FormCard } from './styled';
import ProductsNames from '../Products';
import { SKUs } from '../../../public/assets/produtosCaseSB';
import { calcularPrecoPrazo, consultarCep } from 'correios-brasil/dist';
import { getFreightValue } from '@/data/services/get-freight-value';
import { registerSaleService } from '@/data/services/sale-register-service';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

const productSchema = z.array(
  z.object({
    sku: z.string(),
    name: z.string(),
    amount: z.coerce.number(),
    unitPrice: z.coerce.number(),
    totalPrice: z.coerce.number(),
  }),
);

export type ProductProps = {
  sku: string;
  name: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}[];

const saleSchema = z.object({
  deadlineType: z.string(),
  postCode: z.string(),
  freightValue: z.coerce.number(),
  discount: z.coerce.number(),
  paymentMethod: z.string(),
  totalPrice: z.coerce.number(),
  status: z.string(),
  products: productSchema,
});

export type SaleProps = {
  deadlineType: string;
  postCode: string;
  freightValue: number;
  discount: number;
  paymentMethod: string;
  totalPrice: number;
  status: string;
  products: ProductProps;
};

const productsArray = [...SKUs];

const initialProducts = [
  {
    name: '',
    amount: 0,
    unitPrice: 0,
  },
];

const initialSale = {
  deadlineType: 'padrao' as 'base' | 'turbo' | 'superTurbo' | 'padrao',
  postCode: '',
  freightValue: 0,
  discount: 'R$ 0',
  paymentMethod: '',
};

export type FormFields = z.infer<typeof saleSchema>;

export default function SaleForm() {
  const [products, setProducts] = useState(initialProducts);
  const [sale, setSale] = useState(initialSale);
  const deadlineFee = {
    base: 1.0,
    padrao: 1.0,
    turbo: 1.1,
    superTurbo: 1.2,
  };
  const deadlineFeeToMaxDiscount = {
    base: 0.0,
    padrao: 0.05,
    turbo: 0.1,
    superTurbo: 0.2,
  };

  const maxDiscount = Math.max(
    Number(sale.freightValue),
    products.reduce((acc, value) => acc + value.unitPrice * value.amount, 0) *
      deadlineFeeToMaxDiscount[sale.deadlineType],
  );

  const totalPrice = (
    products.reduce((acc, value) => acc + value.unitPrice * value.amount, 0) *
      deadlineFee[sale.deadlineType] +
    Number(sale.freightValue) -
    parseFloat(sale.discount.replace(/^R\$\s?/, '') || '0')
  ).toFixed(2);

  const handleCheckShipping = async () => {
    const totalWeight = Number(
      products.reduce((acc, value) => acc + value.amount * 0.05, 0),
    );

    const data = {
      from: {
        postal_code: '59066080',
      },
      to: {
        postal_code: sale.postCode,
      },
      package: {
        height: 30,
        width: 30,
        length: 30,
        weight: totalWeight,
      },
    };

    try {
      const freightValue = await getFreightValue(data);
      setSale({ ...sale, freightValue: Number(freightValue[2].price) });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatCurrency = (inputValue: string): string => {
    // Remove non-numeric characters except for the decimal point
    let cleanedValue = inputValue.replace(/[^\d.]/g, '');

    // Ensure only two decimal places
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      cleanedValue = parts[0] + '.' + parts[1].slice(0, 2);
    } else if (parts.length === 2) {
      cleanedValue = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // Format as currency with 'R$'
    const formattedValue = cleanedValue ? `R$ ${cleanedValue}` : '';

    return formattedValue;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalObject = {
      ...sale,
      discount: parseFloat(sale.discount.replace(/^R\$\s?/, '') || '0'),
      totalPrice,
      status:
        parseFloat(sale.discount.replace(/^R\$\s?/, '') || '0') > maxDiscount
          ? 'pending'
          : 'approved',
      products: products.map((product) => ({
        ...product,
        sku:
          productsArray.find(
            (originalProduct) => originalProduct.produto == product.name,
          )?.SKU ?? '',
        totalPrice: product.unitPrice * product.amount,
      })),
    };

    console.log(finalObject);
    await registerSaleService({ data: { ...finalObject } });
    setSale(initialSale);
    setProducts([
      {
        name: '',
        amount: 0,
        unitPrice: 0,
      },
    ]);
    toast.success('Venda cadastrada com sucesso');
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);

    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        name: '',
        amount: 0,
        unitPrice: 0,
      },
    ]);
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', gap: '2rem', paddingBottom: '2rem' }}>
        {' '}
        <h2>Produtos</h2>
        <button type="button" onClick={handleAddProduct}>
          Adicionar produto
        </button>
      </div>

      <Container>
        {' '}
        {products.map((product, index) => (
          <div className="form-box" key={index}>
            <div className="form-card-row">
              {' '}
              <div className="form-card-field">
                <FormCard>
                  {' '}
                  <label>Produto:</label>
                  <select
                    className="form-card-product-select"
                    value={product.name}
                    onChange={(e) => {
                      const selectedProduct = productsArray.find(
                        (product) => product.produto == e.target.value,
                      );
                      setProducts((prevState) => {
                        const newArray = [...prevState];
                        newArray[index].name = selectedProduct?.produto ?? '';
                        newArray[index].unitPrice =
                          sale.paymentMethod !== 'credito'
                            ? (selectedProduct?.preco_descontado ?? 0)
                            : (selectedProduct?.preco_cheio ?? 0);

                        return newArray;
                      });
                    }}
                  >
                    <option value="">Selecione um produto...</option>
                    <ProductsNames />
                  </select>
                </FormCard>
                <small>
                  SKU:{' '}
                  {productsArray.find(
                    (originalProduct) =>
                      originalProduct.produto == product.name,
                  )?.SKU ?? ''}
                </small>
              </div>{' '}
              <FormCard className="form-card-field">
                <label>Amount:</label>
                <input
                  type="text"
                  value={product.amount}
                  onChange={(e) => {
                    setProducts((prevState) => {
                      const newArray = [...prevState];
                      newArray[index].amount = Number(e.target.value) ?? 0;

                      return newArray;
                    });
                  }}
                ></input>
                <span />
              </FormCard>
            </div>
            <div className="form-card-row">
              {' '}
              <FormCard className="form-card-field">
                {' '}
                <label>Preço Unitário:</label>
                <span>R$ {product.unitPrice.toFixed(2)}</span>
              </FormCard>
              <FormCard className="form-card-field">
                {' '}
                <label>Preço Total:</label>
                <span>{`R$ ${(product.unitPrice * product.amount).toFixed(2)}`}</span>
              </FormCard>
              <button
                className="remove"
                type="button"
                onClick={() => handleRemoveProduct(index)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </Container>
      <div style={{ display: 'flex', gap: '2rem', paddingBottom: '2rem' }}>
        <h2>Detalhes da Venda</h2>
      </div>
      <Container>
        <div className="form-box">
          <div className="form-card-row">
            <div className="form-card-field">
              {' '}
              <label>Prazo:</label>
              <select
                value={sale.deadlineType}
                onChange={(e) => {
                  setSale((prev) => ({
                    ...prev,
                    deadlineType: e.target.value as keyof typeof deadlineFee,
                  }));
                }}
              >
                <option value="base">Selecione um prazo...</option>
                <option value="padrao">PADRÃO</option>
                <option value="turbo">TURBO</option>
                <option value="superTurbo">SUPER TURBO</option>
              </select>
            </div>
            <div className="form-card-row">
              <div className="form-card-field">
                {' '}
                <label>CEP:</label>
                <input
                  type="text"
                  value={sale.postCode}
                  onChange={(e) => {
                    setSale((prev) => ({
                      ...prev,
                      postCode: e.target.value,
                    }));
                  }}
                ></input>
              </div>
              <button onClick={handleCheckShipping} type="button">
                Calcular
              </button>
              {/* {errors?.postCode && (
            <div className="form-error">{errors.postCode.message}</div>
          )} */}
            </div>
            <div className="form-card-field">
              {' '}
              <label>Valor do Frete:</label>
              <span>R$ {sale.freightValue.toFixed(2)}</span>
              {/* {errors?.freightValue && (
            <div className="form-error">{errors.freightValue.message}</div>
          )} */}
            </div>
          </div>
          <div className="form-card-row">
            <div className="form-card-field">
              {' '}
              <label>Forma de pagamento:</label>
              <select
                value={sale.paymentMethod}
                onChange={(e) => {
                  setSale((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }));
                  const novaListaProdutos = products.map((produto) => {
                    const produtoRaiz = productsArray.find(
                      (productRaiz) => productRaiz.produto == produto.name,
                    );
                    if (produtoRaiz) {
                      return {
                        ...produto,
                        unitPrice:
                          e.target.value == 'credito'
                            ? produtoRaiz.preco_cheio
                            : produtoRaiz.preco_descontado,
                      };
                    }
                    return produto;
                  });
                  setProducts(novaListaProdutos);
                }}
              >
                <option value="">Selecione uma forma de pagamento...</option>
                <option value="credito">Crédito</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>
              {/* {errors?.paymentMethod && (
            <div className="form-error">{errors.paymentMethod.message}</div>
          )} */}
            </div>

            <div className="form-card-field">
              {' '}
              <label>Desconto:</label>
              <input
                type="text"
                placeholder="R$"
                value={sale.discount}
                onChange={(e) => {
                  setSale((prev) => ({
                    ...prev,
                    discount: formatCurrency(e.target.value),
                  }));
                }}
              ></input>
              {/* {errors?.discount && (
            <div className="form-error">{errors.discount.message}</div>
          )} */}
            </div>
            <div className="form-card-field">
              {' '}
              <label>Preço Total:</label>
              <span>{`R$ ${totalPrice}`}</span>
              {/* {errors?.totalPrice && (
            <div className="form-error">{errors.totalPrice.message}</div>
          )} */}
            </div>
          </div>
        </div>
      </Container>
      <button type="submit">Cadastrar nova venda</button>
    </form>
  );
}
