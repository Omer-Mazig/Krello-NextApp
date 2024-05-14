"use client";

import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const textereaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textereaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <CardForm
          listId={data.id}
          ref={textereaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </ListWrapper>
  );
};
