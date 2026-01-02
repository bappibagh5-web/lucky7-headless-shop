import { getCategories } from "../../lib/woo";

export default async function ShopPage() {
  const categories = await getCategories();

  return (
    <main>
      <h1>Categories</h1>
      <ul>
        {Array.isArray(categories) &&
          categories.map((category: any) => (
            <li key={category.id ?? category.slug}>
              <div>Name: {category.name}</div>
              <div>Slug: {category.slug}</div>
              <div>Count: {category.count}</div>
            </li>
          ))}
      </ul>
    </main>
  );
}