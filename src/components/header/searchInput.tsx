"use client";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { search } from "@/app/actions/search"; 
import styles from "@/components/styles.module.css";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input 
        defaultValue={searchParams.get('term') || ''}
        name="term"
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal text-default-500 bg-default-500/40 dark:bg-default-800/20",
        }}
        placeholder="Type to search..."
        size="sm"
        type="search"
      />
    </form>
  );
}