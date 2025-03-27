"use client";

import { Dialog, Text } from "@radix-ui/themes";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const logCreationFormSchema = z.object({
  title: z.string().min(1).max(64),
  labels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1),
      })
    )
    .default([]),
  description: z.string().max(1024).optional(),
});

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
        className={cn(
          labelProps.className,
          "col-span-1",
          cellSharedClass,
          "border-r-[1px]"
        )}
      >
        {label}
      </div>
      <div
        {...inputProps}
        className={cn(inputProps.className, "col-span-2", cellSharedClass)}
      >
        {children}
      </div>
    </>
  );
}

export function LogCreateDialog() {
  const [open, setOpen] = useState(false);
  const { register, getValues } = useForm({
    resolver: zodResolver(logCreationFormSchema),
  });
  const fallbackTriggerText = "What did you do today?";
  const [triggerText, setTriggerText] = useState(fallbackTriggerText);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTriggerText(getValues().title || fallbackTriggerText);
        }
        setOpen(open);
      }}
    >
      <Dialog.Trigger>
        <div className="w-full py-2 px-2 rounded-2 bg-gray-1 hover:bg-gray-2 transition-all ease-in-out cursor-pointer">
          <Text size="2" className="text-gray-9">
            {triggerText}
          </Text>
        </div>
      </Dialog.Trigger>
      <Dialog.Content className="px-0">
        <Dialog.Title className="text-gray-11 font-medium px-6">
          Create a log
        </Dialog.Title>
        <div className="grid grid-cols-3 text-gray-9 border-t-[1px] border-gray-3">
          <LabelInputFields label={"Title"}>
            <input
              type="text"
              {...register("title")}
              className="w-full bg-transparent focus:ring-0 focus:border-0 focus:outline-none text-gray-11"
              placeholder="I did sth! (64 chars max)"
            />
          </LabelInputFields>
          <LabelInputFields label={"Labels"} />
          <textarea
            className="col-span-3 py-2 px-4 w-full bg-transparent focus:ring-0 focus:border-0 focus:outline-none resize-none text-gray-11"
            placeholder="detailed descriptions?"
            {...register("description")}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
