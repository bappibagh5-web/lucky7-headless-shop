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
    ? products.filter((product: any) => {
        const categories = product.taxonomy_terms?.product_cat;
        return (
          Array.isArray(categories) &&
          categories.some((category: any) => category.slug === slug)
        );
      })
    : [];

  return (
    <main>
      <h1>Category: {JSON.stringify(params)}</h1>

      {productsInCategory.length === 0 && (
        <p>No products found in this category.</p>
      )}

      <ul>
        {productsInCategory.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
