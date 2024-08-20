import { prisma } from "../database"

interface FavoriteParams {
  userId: number
  recipeId: number
}

export async function getUserFavoriteRecipes(userId: number) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          author: {
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
  return favorites;
}

export async function addFavorite(params: FavoriteParams) {
  const favorite = await prisma.favorite.create({ data: params });
  return favorite;
}

export async function removeFavorite({ recipeId, userId }: FavoriteParams) {
  await prisma.favorite.delete({
    where: {
      userId_recipeId: {
        recipeId,
        userId
      }
    }
  });
}