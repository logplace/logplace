"use client";

import { Dialog } from "@radix-ui/themes";
import { useState } from "react";
import { cn } from "@/utils/cn";

function LabelInputFields(props: {
  label: string;
  labelProps?: React.HTMLProps<HTMLDivElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  children?: React.ReactNode;
}) {
  const { label, labelProps = {}, inputProps = {}, children } = props;
  const cellSharedClass = "py-2 px-4 border-b-[1px] border-gray-3";
  return (
    <>
      <div
        {...labelProps}
        className={cn(labelProps.className, "col-span-1", cellSharedClass)}
      >
        {label}
      </div>
      <div
        {...inputProps}
        className={cn(inputProps.className, "col-span-2", cellSharedClass)}
      >
        {children || "placeholder"}
      </div>
    </>
  );
}

export function LogCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div>Open</div>
      </Dialog.Trigger>
      <Dialog.Content className="px-0">
        <Dialog.Title className="text-gray-11 font-medium px-6">
          Create a log
        </Dialog.Title>
        <div className="grid grid-cols-3 text-gray-9 border-t-[1px] border-gray-3">
          <LabelInputFields label={"Title"} />
          <LabelInputFields label={"Labels"} />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
