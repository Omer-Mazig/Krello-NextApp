import { z } from "zod";
export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title is too short",
    })
    .max(30, {
      message: "Title is too long",
    }),

  boardId: z.string(),
  listId: z.string(),
});
