export const apiError = (data) => {
  return { done: false, data };
};
export const apiDone = (data) => {
  return { done: true, data: data };
};
