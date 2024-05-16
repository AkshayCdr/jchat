export const isValidId = (id) =>
  typeof id === "string" && id.trim().length > 0 && !isNaN(id);

export const isValidMessage = (message) => !message || message.trim() === "";
