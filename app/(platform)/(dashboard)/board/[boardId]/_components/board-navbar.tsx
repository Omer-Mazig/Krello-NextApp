import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="relative z-[40] w-full h-14 px-6 flex items-center gap-x-4 bg-black/30 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
};
