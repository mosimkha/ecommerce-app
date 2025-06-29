const API_BASE = 'https://fakestoreapi.com';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('somethinng went wrong', error)
  }

}
export const getProductDetails = async (ID: number) => {
  try {
    const response = await fetch(`${API_BASE}/products/${ID}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log("somthing went wrong", error)

  }

}

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE}/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching products by category', error);
    return [];
  }
};
export const getProductsSorted = async (sortOrder: 'asc' | 'desc') => {
  try {
    const response = await fetch(`${API_BASE}/products?sort=${sortOrder}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching sorted products', error);
    return [];
  }
};