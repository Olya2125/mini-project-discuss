'use client';

import React from 'react';
import { Input, InputProps } from '@nextui-org/react';

interface OurInputProps extends InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OurInput({ label, placeholder, value, onChange, ...rest }: OurInputProps) {
  return (
    <Input
      {...rest}
      type="text"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="bordered"
    />
  );
}
