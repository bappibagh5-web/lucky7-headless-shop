import { getProducts } from "@/lib/woo";

type CategoryPageProps = {
  params: { slug: string };
};

export default async function ProductCategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = params;

  const products = await getProducts();
  const productsInCategory = Array.isArray(products)
    ? products.filter(
        (product: any) =>
          Array.isArray(product.categories) &&
          product.categories.some((category: any) => category.slug === slug),
      )
    : [];

  return (
    <main>
      <h1>Category: {slug}</h1>
      <ul>
        {productsInCategory.map((product: any) => (
          <li key={product.id ?? product.slug ?? product.name}>
            {product.name}
          </li>
        ))}
      </ul>
    </main>
  );
}