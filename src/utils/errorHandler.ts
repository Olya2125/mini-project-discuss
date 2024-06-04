import { z } from 'zod';

export const handleError = (error: unknown) => {
  console.error('Error:', error);
  if (error instanceof z.ZodError) {
    return { message: error.errors[0].message };
  } else if (error instanceof Error) {
    return { message: error.message };
  } else {
    return { message: 'Something went wrong' };
  }
};
