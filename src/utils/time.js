const pad = num => num < 10 ? `0${num}` : num;

export const format = ([hours, minutes]) => `${pad(hours)}:${pad(minutes)}`;
