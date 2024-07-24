'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { FormCard } from './styled';
import ProductsNames from '../Products';

const productSchema = z.array(
  z.object({
    sku: z.string(),
    name: z.string(),
    amount: z.coerce.number(),
    unitPrice: z.coerce.number(),
    totalPrice: z.coerce.number(),
  }),
);

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

const initialProducts = [
  {
    sku: '',
    name: '',
    amount: 0,
    unitPrice: 0,
    totalPrice: 0,
  },
];

export type FormFields = z.infer<typeof saleSchema>;

const onSubmit: SubmitHandler<FormFields> = (data) => {
  console.log(data);
};

export default function SaleForm() {
  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(saleSchema),
  });

  const [products, setProducts] = useState(initialProducts);

  const enteredData = watch('products');

  const handleRemoveProduct = (index: number) => {
    const newProducts = enteredData.filter((_, i) => i !== index);

    setProducts(newProducts);

    setValue('products', newProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        sku: '',
        name: '',
        amount: 0,
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Produtos</h2>
      {products.map((product, index) => (
        <div key={index}>
          <FormCard>
            {' '}
            <label>SKU:</label>
            <input type="text" {...register(`products.${index}.sku`)}></input>
          </FormCard>
          <FormCard>
            {' '}
            <label>Nome:</label>
            <select {...register(`products.${index}.name`)}>
              <option value="">Selecione um produto</option>
              <ProductsNames />
            </select>
          </FormCard>
          <FormCard>
            {' '}
            <label>Amount:</label>
            <input
              type="number"
              {...register(`products.${index}.amount`)}
            ></input>
          </FormCard>
          <FormCard>
            {' '}
            <label>Preço Unitário:</label>
            <input
              type="text"
              {...register(`products.${index}.unitPrice`)}
            ></input>
          </FormCard>
          <FormCard>
            {' '}
            <label>Preço Total:</label>
            <input
              type="text"
              {...register(`products.${index}.totalPrice`)}
            ></input>
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
          <input type="text" {...register('deadlineType')}></input>
          {errors?.deadlineType && (
            <div className="form-error">{errors.deadlineType.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>CEP:</label>
          <input type="text" {...register('postCode')}></input>
          {errors?.postCode && (
            <div className="form-error">{errors.postCode.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>Valor do Frete:</label>
          <input type="number" {...register('freightValue')}></input>
          {errors?.freightValue && (
            <div className="form-error">{errors.freightValue.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>Desconto:</label>
          <input type="number" {...register('discount')}></input>
          {errors?.discount && (
            <div className="form-error">{errors.discount.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>Forma de pagamento:</label>
          <input type="text" {...register('paymentMethod')}></input>
          {errors?.paymentMethod && (
            <div className="form-error">{errors.paymentMethod.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>Preço Total:</label>
          <input type="number" {...register('totalPrice')}></input>
          {errors?.totalPrice && (
            <div className="form-error">{errors.totalPrice.message}</div>
          )}
        </FormCard>
        <FormCard>
          {' '}
          <label>Status da Venda:</label>
          <input type="text" {...register('status')}></input>
          {errors?.status && (
            <div className="form-error">{errors.status.message}</div>
          )}
        </FormCard>
      </div>
      <button type="submit"> Cadastrar nova venda</button>
    </form>
  );
}
