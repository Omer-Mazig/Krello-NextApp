"use client";

import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";

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
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem key={card.id} index={index} data={card} />
          ))}
        </ol>
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
