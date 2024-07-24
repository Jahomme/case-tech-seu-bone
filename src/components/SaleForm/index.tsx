'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { FormCard } from './styled';
import ProductsNames from '../Products';
import { SKUs } from '../../../public/assets/produtosCaseSB';
import { calcularPrecoPrazo, consultarCep } from 'correios-brasil/dist';

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
  freightValue: '',
  discount: '',
  paymentMethod: '',
};

export type FormFields = z.infer<typeof saleSchema>;

export default function SaleForm() {
  const [products, setProducts] = useState(initialProducts);
  const [sale, setSale] = useState(initialSale);
  const discountValues = {
    base: 1.0,
    padrao: 1.0,
    turbo: 1.1,
    superTurbo: 1.2,
  };
  const totalPrice =
    products.reduce((acc, value) => acc + value.unitPrice * value.amount, 0) *
      discountValues[sale.deadlineType] +
    Number(sale.freightValue);

  const freight = () => {
    consultarCep('59020620').then((response) => console.log(response));
    // calcularPrecoPrazo({
    //   sCepOrigem: '81200100',
    //   sCepDestino: '21770200',
    //   nVlPeso: '1',
    //   nCdFormato: '1',
    //   nVlComprimento: '20',
    //   nVlAltura: '20',
    //   nVlLargura: '20',
    //   nCdServico: ['04014', '04510'],
    //   nVlDiametro: '0',
    // }).then((response) => {
    //   console.log('Frete:', response);
    // });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    freight();
    const finalObject = {
      ...sale,
      totalPrice,
      status: 'approved',
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
      <h2>Produtos</h2>
      {products.map((product, index) => (
        <div key={index}>
          <FormCard>
            {' '}
            <label>SKU:</label>
            <span>
              {productsArray.find(
                (originalProduct) => originalProduct.produto == product.name,
              )?.SKU ?? ''}
            </span>
          </FormCard>
          <FormCard>
            {' '}
            <label>Nome:</label>
            <select
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
          <FormCard>
            {' '}
            <label>Amount:</label>
            <input
              type="number"
              value={product.amount}
              onChange={(e) => {
                setProducts((prevState) => {
                  const newArray = [...prevState];
                  newArray[index].amount = Number(e.target.value) ?? 0;

                  return newArray;
                });
              }}
            ></input>
          </FormCard>
          <FormCard>
            {' '}
            <label>Preço Unitário:</label>
            <span>{product.unitPrice}</span>
          </FormCard>
          <FormCard>
            {' '}
            <label>Preço Total:</label>
            <span>{product.unitPrice * product.amount}</span>
          </FormCard>
          <button type="button" onClick={() => handleRemoveProduct(index)}>
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>
        Adicionar produto
      </button>
      <h2>Detalhes da Venda</h2>
      <div>
        {' '}
        <FormCard>
          {' '}
          <label>Prazo:</label>
          <select
            value={sale.deadlineType}
            onChange={(e) => {
              setSale((prev) => ({
                ...prev,
                deadlineType: e.target.value as keyof typeof discountValues,
              }));
            }}
          >
            <option value="base">Selecione um prazo...</option>
            <option value="padrao">PADRÃO</option>
            <option value="turbo">TURBO</option>
            <option value="superTurbo">SUPER TURBO</option>
          </select>
        </FormCard>
        <FormCard>
          {' '}
          <label>CEP:</label>
          <input
            type="text"
            value={sale.postCode}
            onChange={(e) => {
              setSale((prev) => ({ ...prev, postCode: e.target.value }));
            }}
          ></input>
          {/* {errors?.postCode && (
            <div className="form-error">{errors.postCode.message}</div>
          )} */}
        </FormCard>
        <FormCard>
          {' '}
          <label>Valor do Frete:</label>
          <span>{sale.freightValue}</span>
          {/* {errors?.freightValue && (
            <div className="form-error">{errors.freightValue.message}</div>
          )} */}
        </FormCard>
        <FormCard>
          {' '}
          <label>Desconto:</label>
          <input
            type="number"
            value={sale.discount}
            onChange={(e) => {
              setSale((prev) => ({ ...prev, discount: e.target.value }));
            }}
          ></input>
          {/* {errors?.discount && (
            <div className="form-error">{errors.discount.message}</div>
          )} */}
        </FormCard>
        <FormCard>
          {' '}
          <label>Forma de pagamento:</label>
          <select
            value={sale.paymentMethod}
            onChange={(e) => {
              setSale((prev) => ({ ...prev, paymentMethod: e.target.value }));
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
        </FormCard>
        <FormCard>
          {' '}
          <label>Preço Total:</label>
          <span>{totalPrice}</span>
          {/* {errors?.totalPrice && (
            <div className="form-error">{errors.totalPrice.message}</div>
          )} */}
        </FormCard>
      </div>
      <button type="submit">Cadastrar nova venda</button>
    </form>
  );
}
