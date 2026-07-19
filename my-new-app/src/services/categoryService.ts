/**
 * Category Service
 * Handles all category-related API calls
 *
 * @module services/categoryService
 */

import { apiClient, handleApiError } from "./api";
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
  ApiResponse,
} from "@/types";

/**
 * Get all categories for the current user
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response =
      await apiClient.get<ApiResponse<Category[]>>("/categories");
    // Ensure we always return an array, never null
    return response.data.data || [];
  } catch (error) {
    // Return empty array on error instead of throwing (for offline mode)
    return [];
  }
};

/**
 * Get a single category by ID
 */
export const getCategory = async (id: string): Promise<Category> => {
  try {
    const response = await apiClient.get<ApiResponse<Category>>(
      `/categories/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Create a new category
 */
export const createCategory = async (
  data: CreateCategoryData
): Promise<Category> => {
  try {
    const response = await apiClient.post<ApiResponse<Category>>(
      "/categories",
      data
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update an existing category
 */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryData
): Promise<Category> => {
  try {
    const response = await apiClient.put<ApiResponse<Category>>(
      `/categories/${id}`,
      data
    );
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete a category
 */
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/categories/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};
