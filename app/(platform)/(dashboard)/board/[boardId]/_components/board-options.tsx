"use client";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "@/components/form/form-picker";
import { updateBoard } from "@/actions/update-board";
import { ElementRef, useRef } from "react";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const changeImageFormRef = useRef<ElementRef<"form">>(null);
  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteBoard,
    {
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeUpdate, isLoading: isLoadingUpdate } = useAction(
    updateBoard,
    {
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onDelete = () => {
    executeDelete({ id });
  };

  const onChangeImage = (fromData: FormData) => {
    const image = fromData.get("image") as string;
    executeUpdate({ id, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="px-0 p-2 pt-3 pb-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 ">
          <h4>Board actions </h4>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
        </div>

        <Separator className="my-4" />

        <form ref={changeImageFormRef} action={onChangeImage}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <FormPicker
              id="image"
              submitOnChange={() => changeImageFormRef.current?.requestSubmit()}
            />
          </div>
        </form>

        <Separator className="my-4" />

        <Button
          disabled={isLoadingDelete}
          variant="ghost"
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
