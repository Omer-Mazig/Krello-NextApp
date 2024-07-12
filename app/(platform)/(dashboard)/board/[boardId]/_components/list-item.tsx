"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

interface addCardFromModeInterface {
  active: boolean;
  position: "top" | "bottom";
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const textereaRef = useRef<ElementRef<"textarea">>(null);
  const [addCardFromMode, setAddCardFromMode] =
    useState<addCardFromModeInterface>({
      active: false,
      position: "bottom",
    });

  const enableEditing = (position: "top" | "bottom") => {
    setAddCardFromMode(prev => {
      return {
        position,
        active: true,
      };
    });
    setTimeout(() => {
      textereaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setAddCardFromMode(prev => {
      return {
        ...prev,
        active: false,
      };
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2 flex flex-col max-h-[calc(100vh-250px)]"
          >
            <ListHeader data={data} onAddCard={() => enableEditing("top")} />
            <Droppable droppableId={data.id} type="card">
              {provided => (
                <div className="overflow-y-auto overflow-x-hidden">
                  {addCardFromMode.active &&
                  addCardFromMode.position === "top" ? (
                    <CardForm
                      listId={data.id}
                      ref={textereaRef}
                      disableEditing={disableEditing}
                      position="top"
                    />
                  ) : null}
                  <ol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "mx-1 px-1 py-0.5 flex flex-col gap-2",
                      data.cards.length > 0 ? "mt-2" : "mt-0"
                    )}
                  >
                    {data.cards.map((card, index) => (
                      <CardItem key={card.id} index={index} data={card} />
                    ))}
                    {provided.placeholder}
                  </ol>
                  {addCardFromMode.active &&
                  addCardFromMode.position === "bottom" ? (
                    <CardForm
                      listId={data.id}
                      ref={textereaRef}
                      disableEditing={disableEditing}
                      position="bottom"
                    />
                  ) : null}
                </div>
              )}
            </Droppable>
            {addCardFromMode.active ? null : (
              <div className="pt-2 px-2">
                <Button
                  onClick={() => enableEditing("bottom")}
                  size="sm"
                  variant="ghost"
                  className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add a card</span>
                </Button>
              </div>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
};
