"use client";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "@/components/form/form-picker";
import { updateBoard } from "@/actions/update-board";
import { ElementRef, useCallback, useRef } from "react";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const changeImageFormRef = useRef<ElementRef<"form">>(null);
  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteBoard,
    {
      onError: error => {
        toast.error(error);
      },
    }
  );

  const { execute: executeUpdate, isLoading: isLoadingUpdate } = useAction(
    updateBoard,
    {
      onError: error => {
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

  const submitOnChange = useCallback(() => {
    changeImageFormRef.current?.requestSubmit();
  }, [changeImageFormRef]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-sm font-medium text-center text-neutral-600">
          <SheetTitle>Board actions </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        <form ref={changeImageFormRef} action={onChangeImage}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <FormPicker id="image" submitOnChange={submitOnChange} />
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
      </SheetContent>
    </Sheet>
  );
};
