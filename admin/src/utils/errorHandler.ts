export const handleError = (error: any) => {
  console.error('Error Handler: Full error details: ', error);

  throw error;
};
