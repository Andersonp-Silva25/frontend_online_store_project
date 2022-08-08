export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const data = await fetch(url);
  const object = await data.json();
  return object;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const data = await fetch(url);
  const object = await data.json();
  return object;
}

export async function getProductsFromName(name) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
  const data = await fetch(url);
  const object = await data.json();
  return object;
}

export async function getProductsFromCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const data = await fetch(url);
  const object = await data.json();
  return object;
}
