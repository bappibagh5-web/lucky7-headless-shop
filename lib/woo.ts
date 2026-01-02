const ensureServerContext = (): void => {
  if (typeof window !== "undefined") {
    throw new Error("WooCommerce Store API helpers must run on the server.");
  }
};

const getBaseUrl = (): string => {
  const baseUrl = process.env.WOOCOMMERCE_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing WOOCOMMERCE_BASE_URL environment variable.");
  }

  return baseUrl;
};

const fetchJson = async <T>(path: string): Promise<T> => {
  ensureServerContext();

  const url = new URL(path, getBaseUrl());
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    const suffix = message ? ` - ${message}` : "";
    throw new Error(
      `WooCommerce request failed: ${response.status} ${response.statusText}${suffix}`,
    );
  }

  return response.json() as Promise<T>;
};

export const getCategories = async () =>
  fetchJson("/wp-json/wc/store/v1/products/categories");

export const getProducts = async () =>
  fetchJson("/wp-json/wc/store/v1/products");

export const getProductBySlug = async (slug: string) => {
  if (!slug) {
    throw new Error("Product slug is required.");
  }

  const searchParams = new URLSearchParams({ slug });
  return fetchJson(`/wp-json/wc/store/v1/products?${searchParams.toString()}`);
};