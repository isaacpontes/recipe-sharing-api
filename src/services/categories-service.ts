import { prisma } from "../database";

export async function createCategory(name: string) {
  const newCategory = await prisma.category.create({
    data: { name }
  });
  return newCategory;
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });
  return categories;
}

export async function getCategoryById(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      recipes: {
        include: {
          author: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }
    }
  });
  return category;
}

export async function updateCategory(id: number, params: { name?: string }) {
  const updatedCategory = await prisma.category.update({
    data: { name: params.name },
    where: { id }
  });
  return updatedCategory;
}

export async function deleteCategory(id: number) {
  await prisma.category.delete({ where: { id } });
}