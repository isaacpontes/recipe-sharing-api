import { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/categories-service";
import { z } from "zod";

const CreateCategoryRequestBodySchema = z.object({
  name: z.string()
});

const UpdateCategoryRequestBodySchema = z.object({
  name: z.string().optional()
});

export const CategoriesController = {
  // GET /categories
  index: async (req: Request, res: Response) => {
    const categories = await getAllCategories();
    res.json(categories);
  },

  // POST /categories
  create: async (req: Request, res: Response) => {
    const body = CreateCategoryRequestBodySchema.parse(req.body);
    const category = await createCategory(body.name);
    res.status(201).json(category);
  },

  // GET /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await getCategoryById(+id);
    if (!category) return res.status(404).json({ message: "category not found" });
    res.json(category);
  },

  // PUT /categories/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = UpdateCategoryRequestBodySchema.parse(req.body);
    const updatedCategory = await updateCategory(+id, body);
    res.json(updatedCategory);
  },

  // DELETE /categories/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteCategory(+id);
    res.json({ message: "category deleted successfully" });
  }
}