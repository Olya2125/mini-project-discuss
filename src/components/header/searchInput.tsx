"use client";
import { useSearchParams } from "next/navigation";
import { search } from "@/app/actions/search"; 
import styles from "@/components/styles.module.css";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <input
        defaultValue={searchParams.get('term') || ''}
        name="term"
        className={styles.input}
        placeholder="Type to search..."
        type="search"
      />
    </form>
  );
}