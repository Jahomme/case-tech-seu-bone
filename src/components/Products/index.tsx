import { SKUs } from '../../../public/assets/produtosCaseSB';

export default function ProductsNames() {
  const products = [...SKUs];
  return products.map((product, index) => (
    <option key={index} value={product.produto}>
      {product.produto}
    </option>
  ));
}
