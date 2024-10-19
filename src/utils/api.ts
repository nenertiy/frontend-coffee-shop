import axios from "axios";

const API_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//User
export const registration = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post(`/auth/register`, data);
    return response.data;
  } catch {
    throw new Error("Failed");
  }
};

export const auth = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  } catch {
    throw new Error("Failed");
  }
};

//Products
export const fetchProducts = async (search: string) => {
  try {
    const response = await apiClient.get(`/products?search=${search}`);
    return response.data;
  } catch {
    throw new Error("Failed to find products");
  }
};

export const fetchProduct = async (id: string | undefined) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to find products");
  }
};

export const fetchProductsByCategory = async (id: string | undefined) => {
  try {
    const response = await apiClient.get(`products/category/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to find products");
  }
};

export const createProduct = async (data: {
  name: string;
  description: string;
  img: string;
  price: number;
  productCategoryId: number;
}) => {
  try {
    const response = await apiClient.post(`/products`, data);
    return response.data;
  } catch {
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async (
  id: number,
  data: {
    name: string;
    description: string;
    img: string;
    price: number;
    productCategoryId: number;
  }
) => {
  try {
    const response = await apiClient.patch(`/products/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: number | undefined) => {
  if (!id) {
    throw new Error("Product ID is required");
  }
  try {
    const response = await apiClient.delete(`products/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to delete product`);
  }
};

//Categories
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch {
    throw new Error("Failed to find categories");
  }
};

export const createCategory = async (data: {
  name: string;
  subCategoryId: number[];
}) => {
  try {
    const response = await apiClient.post(`/categories`, data);
    return response.data;
  } catch {
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (
  data: { name: string; subCategoryId: number[] },
  id: number
) => {
  try {
    const response = await apiClient.patch(`/categories/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Failed to update category");
  }
};

export const deleteCategory = async (id: number | undefined) => {
  if (!id) {
    throw new Error("Category ID is required");
  }
  try {
    const response = await apiClient.delete(`categories/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to delete category`);
  }
};

//Subcategories
export const fetchSubcategories = async () => {
  try {
    const response = await apiClient.get("/subcategories");
    return response.data;
  } catch {
    throw new Error("Failed to find subcategories");
  }
};

export const fetchSubcategory = async (id: string | undefined) => {
  try {
    const response = await apiClient.get(`/subcategories/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to find subcategory");
  }
};

export const createSubcategory = async (data: {
  name: string;
  img: string;
}) => {
  try {
    const response = await apiClient.post(`/subcategories`, data);
    return response.data;
  } catch {
    throw new Error("Failed to create subcategory");
  }
};

export const updateSubcategory = async (
  data: { name: string; img: string },
  id: number
) => {
  try {
    const response = await apiClient.patch(`/subcategories/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Failed to update subcategory");
  }
};

export const deleteSubcategory = async (id: string | undefined) => {
  if (!id) {
    throw new Error("Subcategory ID is required");
  }
  try {
    const response = await apiClient.delete(`subcategories/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to delete subcategory`);
  }
};

//Cart
export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number = 1
) => {
  try {
    const response = await apiClient.post(`cart/add`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch {
    console.log();
  }
};

export const fetchCart = async (userId: string | null) => {
  if (typeof userId === "string") {
    const response = await apiClient.get(`/cart/${userId}`);
    return response.data;
  } else {
    const response = await apiClient.get(`/cart/0`);
    return response.data;
  }
};

export const removeFromCart = async (userId: string, productId: number) => {
  try {
    const response = await apiClient.delete("cart/remove", {
      data: { userId, productId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const decreaseQuantity = async (
  userId: string,
  productId: number,
  quantity: number
) => {
  try {
    const response = await apiClient.patch("cart/decrease", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};
