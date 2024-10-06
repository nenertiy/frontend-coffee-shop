import axios from "axios";

const API_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Products
export const fetchProducts = async () => {
  // return apiClient.get("/products").then((res) => res.data);
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch {
    throw new Error("Failed to find products");
  }
};

export const fetchProduct = async (id: number) => {
  // return apiClient.get(`/products/${id}`).then((res) => res.data);
  try {
    const response = await apiClient.get(`/products?${id}`);
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

//Categories
export const fetchCategories = async () => {
  // return axios.get("/categories").then((res) => res.data);
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch {
    throw new Error("Failed to find categories");
  }
};

export const createCategory = async (data: { name: string; subCategoryId: number[] }) => {
  try {
    const response = await apiClient.post(`/categories`, data);
    return response.data;
  } catch {
    throw new Error("Failed to create subcategory");
  }
};

//Subcategories
export const fetchSubcategories = async () => {
  // return apiClient.get("/subcategories").then((res) => res.data);
  try {
    const response = await apiClient.get("/subcategories");
    return response.data;
  } catch {
    throw new Error("Failed to find subcategories");
  }
};

export const createSubcategory = async (data: { name: string; img: string }) => {
  try {
    const response = await apiClient.post(`/subcategories`, data);
    return response.data;
  } catch {
    throw new Error("Failed to create subcategory");
  }
};
