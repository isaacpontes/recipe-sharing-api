import { prisma } from "../database";

export async function createComment(params: { userId: number, recipeId: number, content: string }) {
  const comment = await prisma.comment.create({
    data: {
      content: params.content,
      recipeId: params.recipeId,
      userId: params.userId
    }
  });
  return comment;
}

export async function updateComment(id: number, params: { content: string }) {
  const updatedComment = await prisma.comment.update({
    data: { content: params.content },
    where: { id }
  });
  return updatedComment;
}

export async function deleteComment(id: number) {
  await prisma.comment.delete({ where: { id } });
}

export async function checkCommentAuthorship(commentId: number, userId: number) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) return null;
  return comment.userId === userId;
}