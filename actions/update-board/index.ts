"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { image, id, ...rest } = data;

  const currentBoard = await db.board.findFirst({
    where: {
      id,
      orgId,
    },
  });

  if (!currentBoard) {
    return { error: "Board not found" };
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image?.split("|") || [];

  imageId ? imageId : currentBoard.imageId,
    imageThumbUrl ? imageThumbUrl : currentBoard.imageThumbUrl,
    imageFullUrl ? imageFullUrl : currentBoard.imageFullUrl,
    imageLinkHTML ? imageLinkHTML : currentBoard.imageLinkHTML,
    imageUserName ? imageUserName : currentBoard.imageUserName;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        ...currentBoard,
        ...rest,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });
  } catch (error) {
    return { error: "Failed to update" };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
