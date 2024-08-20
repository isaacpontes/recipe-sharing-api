import { Request, Response } from "express";
import { addFavorite, getUserFavoriteRecipes, removeFavorite } from "../services/favorites-service";
import { z } from "zod";

const CreateFavoriteRequestSchema = z.object({
  recipeId: z.number()
});

export const FavoritesController = {
  // GET /favorites
  index: async (req: Request, res: Response) => {
    const favorites = await getUserFavoriteRecipes(req.authenticatedUser!.id);
    res.json(favorites);
  },

  // POST /favorites
  create: async (req: Request, res: Response) => {
    const userId = req.authenticatedUser!.id;
    const { recipeId } = CreateFavoriteRequestSchema.parse(req.body);
    const favorite = await addFavorite({ recipeId, userId });
    res.status(201).json(favorite);
  },

  // DELETE /favorites
  delete: async (req: Request, res: Response) => {
    const userId = req.authenticatedUser!.id;
    const { recipeId } = CreateFavoriteRequestSchema.parse(req.body);
    await removeFavorite({ recipeId, userId });
    res.json({ message: "favorite deleted successfully" });
  }
}