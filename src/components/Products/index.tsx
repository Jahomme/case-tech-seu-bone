import { SKUs } from '../../../public/assets/produtosCaseSB';

export default function ProductsNames() {
  const products = [...SKUs];
  return products.map((product) => (
    <option key={product.SKU} value={product.produto}>
      {product.produto}
    </option>
  ));
}
