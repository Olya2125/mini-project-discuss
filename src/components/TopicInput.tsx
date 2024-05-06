'use client';

import React from 'react';
import { Input, InputProps } from '@nextui-org/react';

type TopicInputProps = InputProps & {
  value: string;
  onChange: (value: string) => void;
};

const TopicInput: React.FC<TopicInputProps> = ({ label, placeholder, value, onChange, ...rest }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      {...rest}
      type="text"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      variant="bordered"
    />
  );
};

export default TopicInput;

