import { z } from "zod";

export const UpdateBoard = z.object({
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
    })
    .optional(), // Make title optional for partial updates
  image: z.string().url({
    message: "Invalid URL format for image",
  }).optional(),
  id: z.string(), // ID is still required to identify the board
});










// import { z } from "zod";
// export const UpdateBoard = z.object({
//   title: z
//     .string({
//       required_error: "Title is required",
//       invalid_type_error: "Title must be a string",
//     })
//     .min(3, {
//       message: "Title is too short",
//     })
//     .max(30, {
//       message: "Title is too long",
//     }),

//   id: z.string(),
// });
