'use client';

import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import styles from "@/components/styles.module.css";

interface OurInputProps extends InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export default function OurInput({ label, placeholder, value, onChange, errorMessage, ...rest }: OurInputProps) {
  return (
    <div>
      <Input
        {...rest}
        type="text"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="bordered"
      />
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
}
