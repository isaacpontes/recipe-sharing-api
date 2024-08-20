import { Router } from "express";
import { ensureAuth } from "./middlewares/auth-middleware";
import { AuthController } from "./controllers/AuthController";
import { RecipesController } from "./controllers/RecipesController";
import { CategoriesController } from "./controllers/CategoriesController";
import { CommentsController } from "./controllers/CommentsController";
import { FavoritesController } from "./controllers/FavoritesController";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

router.get("/auth", ensureAuth, (req, res) => {
  res.json({ message: `Welcome, ${req.authenticatedUser?.username}!` });
});

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

router.get("/categories", CategoriesController.index);
router.post("/categories", CategoriesController.create);
router.get("/categories/:id", CategoriesController.show);
router.put("/categories/:id", CategoriesController.update);
router.delete("/categories/:id", CategoriesController.delete);

router.get("/recipes", RecipesController.index);
router.post("/recipes", ensureAuth, RecipesController.create);
router.get("/recipes/:id", RecipesController.show);
router.put("/recipes/:id", ensureAuth, RecipesController.update);
router.delete("/recipes/:id", ensureAuth, RecipesController.delete);

router.post("/recipes/:id/categories", ensureAuth, RecipesController.addCategories);
router.delete("/recipes/:id/categories", ensureAuth, RecipesController.removeCategories);

router.post("/recipes/:id/comments", ensureAuth, CommentsController.create);
router.put("/recipes/:recipeId/comments/:id", ensureAuth, CommentsController.update);
router.delete("/recipes/:recipeId/comments/:id", ensureAuth, CommentsController.delete);

router.get("/favorites", ensureAuth, FavoritesController.index);
router.post("/favorites", ensureAuth, FavoritesController.create);
router.delete("/favorites", ensureAuth, FavoritesController.delete);

export { router };