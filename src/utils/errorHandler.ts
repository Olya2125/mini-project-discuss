import { z } from 'zod';

export const handleError = (error: unknown) => {
  console.error('Error:', error);
  if (error instanceof z.ZodError) {
    return {
      message: 'Validation failed',
      errors: error.errors.reduce((acc, curr) => {
        if (curr.path.length > 0) {
          const key = curr.path[0] as string;
          acc[key] = curr.message;
        }
        return acc;
      }, {} as Record<string, string>),
    };
  } else if (error instanceof Error) {
    return { message: error.message };
  } else {
    return { message: 'Something went wrong' };
  }
};
