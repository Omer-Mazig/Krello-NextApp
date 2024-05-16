"use client";

import { Draggable } from "@hello-pangea/dnd";

import { Card } from "@prisma/client";
import Link from "next/link";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <Link
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          href={`/card/${data.id}`}
          role="button"
          className="truncate border-2 border-transparent hover:border-sky-500 py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </Link>
      )}
    </Draggable>
  );
};
