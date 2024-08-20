import { Request, Response } from "express";
import { z } from "zod";
import { checkCommentAuthorship, createComment, deleteComment, updateComment } from "../services/comments-service";

const CreateCommentRequestSchema = z.object({
  content: z.string()
});

export const CommentsController = {
  // POST /recipes/:id/comments
  create: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const body = CreateCommentRequestSchema.parse(req.body);
    const category = await createComment({
      content: body.content,
      recipeId: +req.params.id,
      userId: req.authenticatedUser.id
    });
    res.status(201).json(category);
  },

  // PUT /recipes/:recipeId/comments/:id
  update: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const commentId = +req.params.id;
    const isAuthor = await checkCommentAuthorship(commentId, req.authenticatedUser.id);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this comment" });
    const body = CreateCommentRequestSchema.parse(req.body);
    const updatedComment = await updateComment(commentId, { content: body.content });
    res.json(updatedComment);
  },

  // DELETE /recipes/:recipeId/comments/:id
  delete: async (req: Request, res: Response) => {
    if (!req.authenticatedUser) return res.status(401).end();
    const commentId = +req.params.id;
    const isAuthor = await checkCommentAuthorship(commentId, req.authenticatedUser.id);
    if (!isAuthor) return res.status(403).json({ message: "you don't have permission to manage this comment" });
    await deleteComment(commentId);
    res.json({ message: "comment deleted successfully" });
  }
}
