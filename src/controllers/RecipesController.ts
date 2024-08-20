import { Request, Response } from "express";
import { addCategoriesToRecipe, checkRecipeAuthorship, createRecipe, deleteRecipe, getAllRecipes, getRecipeById, removeCategoriesFromRecipe, updateRecipe } from "../services/recipes-service";
import { z } from "zod";

const CreateRecipeRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  preparationTimeInSecs: z.number(),
  categories: z.object({ id: z.number() }).array().optional()
});

const UpdateRecipeRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.string().optional(),
  instructions: z.string().optional(),
  preparationTimeInSecs: z.number().optional()
});

const AddCategoriesRequestSchema = z.object({
  categories: z.object({ id: z.number() }).array()
});

export const RecipesController = {
  // GET /recipes
  index: async (req: Request, res: Response) => {
    const page = req.params.page ? +req.params.page : 1;
    const pageSize = req.params.pageSize ? +req.params.pageSize : 10;
    const recipes = await getAllRecipes({ page, pageSize });
    res.json(recipes);
  },

  // POST /recipes
  create: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const body = CreateRecipeRequestSchema.parse(req.body);
    const newRecipe = await createRecipe({
      ...body,
      authorId: req.authenticatedUser.id
    });
    res.status(201).json(newRecipe);
  },

  // GET /recipes/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    const recipe = await getRecipeById(+id);
    if (!recipe) return res.status(404).json({ message: "recipe not found" });
    res.json(recipe);
  },

  // PUT /recipes/:id
  update: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const recipeId = +req.params.id;
    const authorId = req.authenticatedUser.id;
    const isAuthor = await checkRecipeAuthorship(authorId, recipeId);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this recipe" });
    const body = UpdateRecipeRequestSchema.parse(req.body);
    const updatedRecipe = await updateRecipe(recipeId, body);
    res.json(updatedRecipe);
  },

  // DELETE /recipes/:id
  delete: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const recipeId = +req.params.id;
    const authorId = req.authenticatedUser.id;
    const isAuthor = await checkRecipeAuthorship(authorId, recipeId);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this recipe" });
    await deleteRecipe(recipeId);
    res.json({ message: "recipe deleted successfully" });
  },

  // POST /recipes/:id/categories
  addCategories: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const recipeId = +req.params.id;
    const authorId = req.authenticatedUser.id;
    const isAuthor = await checkRecipeAuthorship(authorId, recipeId);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this recipe" });
    const body = AddCategoriesRequestSchema.parse(req.body);
    const updatedRecipe = await addCategoriesToRecipe(recipeId, body.categories);
    res.json(updatedRecipe);
  },

  // DELETE /recipes/:id/categories
  removeCategories: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const recipeId = +req.params.id;
    const authorId = req.authenticatedUser.id;
    const isAuthor = await checkRecipeAuthorship(authorId, recipeId);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this recipe" });
    const body = AddCategoriesRequestSchema.parse(req.body);
    const updatedRecipe = await removeCategoriesFromRecipe(recipeId, body.categories);
    res.json(updatedRecipe);
  }
}
