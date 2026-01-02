import { getCategories, getProducts } from "../../lib/woo";

const format = (value: unknown) => JSON.stringify(value, null, 2);

export default async function TestPage() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <main>
      <pre>{format(categories)}</pre>
      <pre>{format(products)}</pre>
    </main>
  );
}