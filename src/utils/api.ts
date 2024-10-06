/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Products
export const fetchProducts = () => {
  return apiClient.get("/products").then((res) => res.data);
};

export const fetchProduct = (id: number) => {
  return apiClient.get(`/products/${id}`).then((res) => res.data);
};

//Categories
export const fetchCategories = () => {
  return apiClient.get("/categories").then((res) => res.data);
};

export const createCategory = async (data: { name: string; subCategoryId: number[] }) => {
  try {
    const response = await apiClient.post(`${API_URL}/categories`, data);
    return response.data;
  } catch (e) {
    throw new Error("Failed to create subcategory");
  }
};

//Subcategories
export const fetchSubcategories = () => {
  return apiClient.get("/subcategories").then((res) => res.data);
};

export const createSubcategory = async (data: { name: string; img: string }) => {
  try {
    const response = await apiClient.post(`${API_URL}/subcategories`, data);
    return response.data;
  } catch (e) {
    throw new Error("Failed to create subcategory");
  }
};
