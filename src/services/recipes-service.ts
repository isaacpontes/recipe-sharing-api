import { prisma } from "../database";

interface CreateRecipeParams {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  preparationTimeInSecs: number;
  authorId: number;
  categories?: Array<{ id: number }>
}

interface UpdateRecipeParams {
  title?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  preparationTimeInSecs?: number;
}

export async function createRecipe(params: CreateRecipeParams) {
  const recipe = await prisma.recipe.create({
    data: {
      ...params,
      categories: {
        connect: params.categories
      }
    }
  });
  return recipe;
}

export async function getAllRecipes(params: { page: number, pageSize: number }) {
  const take = params.pageSize
  const skip = (params.page - 1) * params.pageSize;
  const recipes = await prisma.recipe.findMany({
    take,
    skip,
    orderBy: { createdAt: "desc" },
    include: { categories: true }
  });
  const totalRecipes = await prisma.recipe.count();
  const totalPages = Math.ceil(totalRecipes / params.pageSize);
  return {
    recipes,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      totalRecipes,
      totalPages
    }
  };
}

export async function getRecipeById(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true
        }
      },
      categories: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        }
      }
    }
  });
  return recipe;
}

export async function checkRecipeAuthorship(authorId: number, recipeId: number) {
  const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
  if (!recipe) return null;
  return authorId === recipe.authorId;
}

export async function updateRecipe(id: number, params: UpdateRecipeParams) {
  const updatedRecipe = await prisma.recipe.update({
    data: params,
    where: { id }
  });
  return updatedRecipe;
}

export async function deleteRecipe(id: number) {
  await prisma.recipe.delete({ where: { id } });
}

export async function addCategoriesToRecipe(recipeId: number, categories: { id: number }[]) {
  const updatedRecipe = await prisma.recipe.update({
    data: {
      categories: {
        connect: categories
      }
    },
    where: {
      id: recipeId
    },
    include: {
      categories: true
    }
  });
  return updatedRecipe;
}

export async function removeCategoriesFromRecipe(recipeId: number, categories: { id: number }[]) {
  const updatedRecipe = await prisma.recipe.update({
    data: {
      categories: {
        disconnect: categories,
      },
    },
    where: {
      id: recipeId,
    },
    include: {
      categories: true
    }
  });
  return updatedRecipe;
}
