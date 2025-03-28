"use client";

import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command";
import { Popover } from "@radix-ui/themes";

/*
 * TODO
 * 1. Create a create label button,
 * 2. Delete the "frameworks" and query the labels from the server
 * */

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function LabelCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  // if typing something, open the dialog
  useEffect(() => {
    if (search.length > 0) {
      setOpen(true);
    }
  }, [search]);

  return (
    <Command>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <CommandInput
            placeholder="Search label..."
            value={search}
            onValueChange={setSearch}
          />
        </Popover.Trigger>
        <Popover.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          side="bottom"
          align="start"
        >
          <CommandList>
            <CommandEmpty>
              No label found. Create new label: {search}?
            </CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:bg-gray-2 transition-all ease-in-out text-gray-10"
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Popover.Content>
      </Popover.Root>
    </Command>
  );
}
