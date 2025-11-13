export const handleError = (error: any) => {
  if (error instanceof Error) {
    console.error('Error: ', error.message);
  }

  throw error;
};
