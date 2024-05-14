"use client";

import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </ListWrapper>
  );
};
